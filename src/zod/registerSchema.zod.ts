import { z } from "zod" 

export const registerSchema = z.object({
    name: z.string(),
    email: z.string(),
    rollNumber: z.string(),
    password: z.string(),
}).strict()

export type RegisterSchemaType = z.infer<typeof registerSchema>