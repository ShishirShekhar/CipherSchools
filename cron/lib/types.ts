export type User = {
    _id: string;
    name: string;
    email: string;
}

export type Question = {
    _id: string;
    question: string;
    options: string[];
    correctOption: string;
    marks: number;
}

export type Selection = {
    _id: string;
    questionId: string;
    option: string;
}

export type Submission = {
    _id: string;
    testId: string;
    userId: User;
    selections: Selection[];
    endedAt: string;
    isDeleted: boolean;
    isMailSent: boolean;
}
