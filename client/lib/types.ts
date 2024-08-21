export type User = {
    _id: string;
    name: string;
    email: string;
};

export type Question = {
    _id: string;
    question: string;
    options: string[];
    correctOption: string;
    marks: number;
};

export type Test = {
    _id: string;
    title: string;
    description: string;
    questions: Question[];
};

export type Selection = {
    questionId: string;
    option: string;
    savedAt: Date;
};

export type Error = {
    error: string;
};
