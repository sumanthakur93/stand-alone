import { z } from "zod" 

export const adminLoginSchema = z.object({
    email: z.string(),
    adminKey: z.string(),
    password: z.string(),
}).strict()

export type AdminLoginSchemaType = z.infer<typeof adminLoginSchema>