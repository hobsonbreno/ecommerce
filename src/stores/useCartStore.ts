import { defineStore } from 'pinia'
import { Cart } from '@/models/Cart'
import type { Product } from '@/models/Product'
import type { CartItem } from '@/models/CartItem'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: new Cart(),
    items: [] as CartItem[],
  }),
  actions: {
    addItem(product: Product) {
      this.cart.addItem(product)
      this.syncItems()
    },
    removeUnit(productId: number | string) {
      this.cart.removeUnit(productId)
      this.syncItems()
    },
    removeItem(productId: number | string) {
      this.cart.removeItem(productId)
      this.syncItems()
    },
    clear() {
      this.cart.clear()
      this.syncItems()
    },
    syncItems() {
      this.items = [...this.cart.getItems()]
    },
  },
  getters: {
    totalItems: (state) => state.cart.getTotalItems(),
    finalPrice: (state) => state.cart.getFinalPrice(),
  },
})
