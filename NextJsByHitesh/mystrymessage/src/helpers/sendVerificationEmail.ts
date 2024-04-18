//Resend Email docs 
//Lecture Setup Resend email with NextJs

import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerifiactionEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try{
        await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Mystry message |verification code',
        react: VerificationEmail({username, otp: verifyCode}),
      });
        return {success: true, message: "verification email send successfully"}
    }catch(emailError){
        console.error("Error sending verification email", emailError);
        return {success: false, message: "Failed to send verification email"}
    }
}