import type { Category } from './Category'

export interface Product {
  id: number | string
  name: string
  price: number
  category: Category
  image?: string
}