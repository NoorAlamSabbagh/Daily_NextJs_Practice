import {z} from "zod";

export const MessageSchema = z.object({
content: z.
string().
min(10, {message: 'Content must be at least of 10 characters'})
.max(300, "Content must be npt less than at least of 300 characters")
})