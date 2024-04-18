//Setup RESEND email with NEXTJS
//Lecture Setup Resend email with NextJs

import { Message } from "@/model/User";
export interface ApiResponse{
    success: boolean;
    message: String;
    isAcceptingMessages?: boolean
    messages?: Array<Message>
}