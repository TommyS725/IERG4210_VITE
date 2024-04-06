import { z } from 'zod'

const unitAmountSchema = z.object({
  currency_code: z.literal('USD'),
  value: z.string().min(1)
})

const amountSchema = unitAmountSchema.extend({
  breakdown: z.object({
    item_total: unitAmountSchema
  })
})

const itemSchema = z.object({
  name: z.string().min(1),
  unit_amount: unitAmountSchema,
  quantity: z.string().min(1)
})

const purchaseUnitSchema = z.object({
  amount: amountSchema,
  items: itemSchema.array(),
  custom_id: z.string().min(1),
  invoice_id: z.string().min(1)
})

export const orderDetailSchema = z.object({
  purchase_units: purchaseUnitSchema.array().length(1)
})

export type OrderDetail = z.infer<typeof orderDetailSchema>

export const adminOrderSchema = z.object({
  UUID: z.string(),
  username: z.string(),
  salt: z.string(),
  digest: z.string(),
  createdAt: z.coerce.date(), // timestamp
  orderDetails: z.string().nullable(),
  orderDetailsObj: orderDetailSchema.nullable()
})

export type AdminOrder = z.infer<typeof adminOrderSchema>
