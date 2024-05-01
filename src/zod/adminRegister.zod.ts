import { z } from "zod" 

export const adminRegisterSchema = z.object({
    name: z.string(),
    email: z.string(),
    adminKey: z.string(),
    password: z.string(),
}).strict()

export type AdminRegisterSchemaType = z.infer<typeof adminRegisterSchema>