import { cookies } from "next/headers";
import cookie from "cookie";
import nodemailer from "nodemailer";
import { Question, Selection, Submission } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_EMAIL = process.env.NEXT_PUBLIC_AUTH_EMAIL;
const AUTH_PASSWORD = process.env.NEXT_PUBLIC_AUTH_PASSWORD;

if (!API_URL || !AUTH_EMAIL || !AUTH_PASSWORD) {
    throw new Error("Environment variables are not properly set");
}

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const accessToken = cookies().get("accessToken");
    if (!accessToken) {
        throw new Error("Access token is not provided");
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken.value}`,
        },
        credentials: "include",
    });

    if (response.status === 204) {
        return;
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
    }

    return data.data;
};

export async function authenticate() {
    const response = await fetch(`${API_URL}/auth/login`, {
        mode: "cors",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: AUTH_EMAIL, password: AUTH_PASSWORD }),
        credentials: "include",
    });

    const authData = await response.json();
    if (!response.ok) {
        throw new Error(authData.error || "Failed to authenticate");
    }

    const setCookie = response.headers.get("set-cookie");
    if (!setCookie) {
        throw new Error("Failed to authenticate");
    }

    const parsedCookie = cookie.parse(setCookie);
    const accessToken = parsedCookie.accessToken;
    const cookieStore = cookies();
    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });

    return authData.data;
}

export async function getSubmissions() {
    return fetchWithAuth(`${API_URL}/submissions`);
}

export const getQuestionById = async (questionId: string) => {
    return fetchWithAuth(`${API_URL}/questions/${questionId}`);
};

export const calMarksAndPercentage = async (selections: Selection[]) => {
    let marksObtained = 0;
    let totalMarks = 0;

    for (const selection of selections) {
        const question: Question = await getQuestionById(selection.questionId);
        if (question) {
            totalMarks += question.marks;
            if (selection.option === question.correctOption) {
                marksObtained += question.marks;
            }
        }
    }

    const percentage = totalMarks ? (marksObtained / totalMarks) * 100 : 0;
    return { marksObtained, totalMarks, percentage };
};

export const sendEmail = async (email: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_AUTH_EMAIL,
            pass: process.env.NEXT_PUBLIC_MAILER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error: any) {
        throw error.message || error || new Error("Failed to send email");
    }
}

export const markSubmissionAsMailSent = async (submissionId: string) => {
    return fetchWithAuth(`${API_URL}/submissions/${submissionId}/mail-sent`, {
        method: "PATCH",
    });
}

export const sendQuizResults = async () => {
    console.log("Running cron job to send quiz results...");
    try {
        console.log("Authenticating...");
        await authenticate();

        console.log("Getting submissions...");
        const submissionsData: Submission[] = await getSubmissions();
        const filteredSubmissions = submissionsData.filter(submission => !submission.isMailSent);

        for (const submission of filteredSubmissions) {
            const { marksObtained, totalMarks, percentage } = await calMarksAndPercentage(submission.selections);

            const user = submission.userId;
            const subject = "Your Quiz Results";
            const text = `Dear ${user.name},\n\nYou have obtained ${marksObtained} out of ${totalMarks} marks (${percentage.toFixed(2)}%) in your recent quiz.\n\nBest regards,\nYour Quiz App`;

            console.log(`Sending email to ${user.email}...`);
            await sendEmail(user.email, subject, text);

            console.log("Marking submission as mail sent...");
            await markSubmissionAsMailSent(submission._id);
        }
    } catch (error: any) {
        console.error("Error sending quiz results:", error);
        throw error.message || error || "Internal Server Error";
    }
};
