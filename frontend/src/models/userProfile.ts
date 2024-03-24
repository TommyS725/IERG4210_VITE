import { z } from "zod";


export const userProfileSchema = z.object({
    userid: z.string(),
    username: z.string(),
    email: z.string().email(),
    admin: z.boolean().optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;