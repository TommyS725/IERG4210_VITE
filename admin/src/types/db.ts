import { z } from 'zod'

export const Tables = ['category', 'product'] as const

export const tableSchema = z.enum(Tables)

export type Table = z.infer<typeof tableSchema>

export const categorySchema = z.object({
  name: z.string(),
  cid: z.string()
})

export type Category = z.infer<typeof categorySchema>
