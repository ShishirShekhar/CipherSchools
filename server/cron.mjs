// cron.js
import cron from "node-cron";
import nodemailer from "nodemailer";
import Submission from "./models/Submission.mjs";
import Question from "./models/Question.mjs";

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
  }
};

const calMarksAndPercentage = async (selections) => {
  let marksObtained = 0;
  let totalMarks = 0;

  for (const selection of selections) {
    const question = await Question.findById(selection.questionId);
    if (question) {
      totalMarks += question.marks; // Add to total marks
      if (selection.option === question.correctOption) {
        marksObtained += question.marks; // Add to obtained marks if correct
      }
    }
  }

  const percentage = (marksObtained / totalMarks) * 100;
  return { marksObtained, totalMarks, percentage };
};

// Cron job to run every hour
export default cron.schedule("0 * * * *", async () => {
  console.log("Running cron job to send quiz results...");

  try {
    const submissions = await Submission.find({
      isDeleted: false,
      isMailSent: false,
    });

    for (const submission of submissions) {
      const { marksObtained, totalMarks, percentage } =
        await calMarksAndPercentage(submission.selections);

      const user = submission.userId;
      const subject = "Your Quiz Results";
      const text = `Dear ${
        user.name
      },\n\nYou have obtained ${marksObtained} out of ${totalMarks} marks (${percentage.toFixed(
        2
      )}%) in your recent quiz.\n\nBest regards,\nYour Quiz App`;

      await sendEmail(user.email, subject, text);

      submission.isMailSent = true;
      await submission.save();
    }
  } catch (error) {
    console.error("Error fetching submissions or sending emails:", error);
  }
});
