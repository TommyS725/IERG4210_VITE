import {z} from 'zod';

export const categorySchema = z.object({
  name: z.string(),
  cid: z.string(),
});

export const categoryArraySchema = z.array(categorySchema);



export type Category = z.infer<typeof categorySchema>;
