import { adminOrderSchema } from '@/types/order'
import { z } from 'zod'
import getApiUrl from '../getApiUrl'

const getOrderResponseSchema = z.object({
  data: adminOrderSchema.array(),
  hasNext: z.boolean()
})

export async function fetchOrders(offset: number, pageSize: number) {
  const url = getApiUrl('orders/all-orders')
  const response = await fetch(`${url}?offset=${offset}&pageSize=${pageSize}`)
  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = '/login/'
      return {
        data: [],
        hasNext: false
      }
    }
    throw new Error('Failed to fetch orders')
  }
  const data = await response.json()
  return getOrderResponseSchema.parse(data)
}
