//ZOD for validation in NextJs
import {z} from "zod";

export const acceptMessageSchema = z.object({
acceptMessages: z.boolean(),
})