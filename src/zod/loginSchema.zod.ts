import { z } from "zod"

export const loginSchema = z.object({
    rollNumber: z.string(),
    password: z.string()
}).strict()

export type LoginSchemaType = z.infer<typeof loginSchema>