import { sendQuizResults } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        await sendQuizResults();
        console.log("Quiz results sent successfully");
        return NextResponse.json({ message: "Quiz results sent successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || error || "Failed to send quiz results" }, { status: 500 });
    }
}
