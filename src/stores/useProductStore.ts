import { defineStore } from 'pinia'
import type { Product } from '@/models/Product'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Notebook Pro Max',
        price: 6499.9,
        category: { id: 1, title: 'Eletrônicos' },
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 2,
        name: 'Smartphone Ultra',
        price: 3299.9,
        category: { id: 1, title: 'Eletrônicos' },
        image:
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 3,
        name: 'Fone Bluetooth NC',
        price: 899.9,
        category: { id: 2, title: 'Acessórios' },
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 4,
        name: 'Tênis Runner X',
        price: 459.9,
        category: { id: 3, title: 'Moda' },
        image:
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 5,
        name: 'Mochila Urbana Pro',
        price: 349.9,
        category: { id: 3, title: 'Moda' },
        image:
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 6,
        name: 'Monitor 4K 27"',
        price: 2799.9,
        category: { id: 1, title: 'Eletrônicos' },
        image:
          'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 7,
        name: 'Teclado Mecânico RGB',
        price: 649.9,
        category: { id: 2, title: 'Acessórios' },
        image:
          'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800',
      },
      {
        id: 8,
        name: 'Câmera Mirrorless',
        price: 5199.9,
        category: { id: 4, title: 'Fotografia' },
        image:
          'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&q=80&w=800',
      },
    ] as Product[],
  }),
  getters: {
    getProductById: (state) => (id: number | string) => {
      const productId = typeof id === 'string' ? parseInt(id, 10) : id
      return state.products.find((p) => p.id === productId)
    },
  },
})
