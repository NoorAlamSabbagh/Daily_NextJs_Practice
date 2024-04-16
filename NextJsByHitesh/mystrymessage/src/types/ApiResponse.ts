//Setup RESEND email with NEXTJS

import { Message } from "@/model/User";
export interface ApiResponse{
    success: boolean;
    message: String;
    isAcceptingMessages?: boolean
}