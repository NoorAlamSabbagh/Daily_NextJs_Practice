//Resend Email docs 
//Lecture Setup Resend email with NextJs
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerifiactionEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await request.json()
        const exitingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true })

        if (exitingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 })
        }

        const exitingUserByEmail = await UserModel.findOne({ email })
        const verifyCode = Math.floor(100000 + Math.random() *900000).toString()
        if (exitingUserByEmail) {
            if(exitingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exit eith this email"
                }, {status: 400})
            }else{
                const hashPassworrd = await bcrypt.hash(password, 10);
                exitingUserByEmail.password = hashPassworrd;
                exitingUserByEmail.verifyCode = verifyCode;
                exitingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await exitingUserByEmail.save()
            }
        } else {
            const hashPassworrd = await bcrypt.hash(password, 10);
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                username,
                email,
                password: hashPassworrd, 
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingCode: true,
                messages: []
            })

            await newUser.save()
        }

        //send Verifiaction email
        const emailResponse = await sendVerifiactionEmail(
            email,
            username, 
            verifyCode
        )
        if(!emailResponse.success){
        return Response.json({
            success: false,
            message: emailResponse.message
        }, {status: 500})
        }
        return Response.json({
            success: true,
            message: "user registered successfully, Please verify your email"
        }, {status: 201})
    } catch (error) {
        console.error('Error registering user', error);
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}