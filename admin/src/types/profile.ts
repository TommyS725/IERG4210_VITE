import { z } from 'zod'

export const profileSchema = z.object({
  userid: z.string(),
  username: z.string(),
  email: z.string().email(),
  admin: z.boolean().optional()
})

export type Profile = z.infer<typeof profileSchema>
