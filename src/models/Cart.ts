import type { Product } from './Product'
import type { CartItem } from './CartItem'

export class Cart {
  private items: CartItem[] = []

  addItem(product: Product): void {
    const existing = this.items.find((i) => i.product.id === product.id)

    if (existing) {
      existing.quantity += 1
    } else {
      this.items.push({ product, quantity: 1 })
    }
  }

  removeUnit(productId: number | string): void {
    const index = this.items.findIndex((i) => i.product.id === productId)
    if (index === -1) return

    const item = this.items[index]
    if (!item) return

    if (item.quantity > 1) {
      item.quantity -= 1
    } else {
      this.items.splice(index, 1)
    }
  }

  removeItem(productId: number | string): void {
    const index = this.items.findIndex((i) => i.product.id === productId)
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  getTotalItems(): number {
    return this.items.reduce((acc, i) => acc + i.quantity, 0)
  }

  getFinalPrice(): number {
    return this.items.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  }

  getItems(): CartItem[] {
    return this.items
  }

  clear(): void {
    this.items = []
  }
}