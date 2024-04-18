//ZOD for validation in NextJs
import {z} from "zod";

export const signInSchema = z.object({
identifier: z.string(),
password: z.string(),
})