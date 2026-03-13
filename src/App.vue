<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from './components/ProductCard.vue'
import CartSummary from './components/CartSummary.vue'
import { Cart } from './models/Cart'
import type { Product } from './models/Product'
import type { CartItem } from './models/CartItem'

export default defineComponent({
  name: 'App',

  components: { ProductCard, CartSummary },

  data() {
    return {
      cart: new Cart(),
      reactiveItems: [] as CartItem[],
      products: [
        {
          id: 1,
          name: 'Notebook Pro Max',
          price: 6499.9,
          category: { id: 1, title: 'Eletrônicos' },
        },
        {
          id: 2,
          name: 'Smartphone Ultra',
          price: 3299.9,
          category: { id: 1, title: 'Eletrônicos' },
        },
        {
          id: 3,
          name: 'Fone Bluetooth NC',
          price: 899.9,
          category: { id: 2, title: 'Acessórios' },
        },
        { id: 4, name: 'Tênis Runner X', price: 459.9, category: { id: 3, title: 'Moda' } },
        { id: 5, name: 'Mochila Urbana Pro', price: 349.9, category: { id: 3, title: 'Moda' } },
        { id: 6, name: 'Monitor 4K 27"', price: 2799.9, category: { id: 1, title: 'Eletrônicos' } },
        {
          id: 7,
          name: 'Teclado Mecânico RGB',
          price: 649.9,
          category: { id: 2, title: 'Acessórios' },
        },
        {
          id: 8,
          name: 'Câmera Mirrorless',
          price: 5199.9,
          category: { id: 4, title: 'Fotografia' },
        },
      ] as Product[],
    }
  },

  computed: {
    totalItems(): number {
      return this.cart.getTotalItems()
    },
    finalPrice(): number {
      return this.cart.getFinalPrice()
    },
  },

  methods: {
    addToCart(product: Product): void {
      this.cart.addItem(product)
      this.syncItems()
    },
    removeUnit(productId: number | string): void {
      this.cart.removeUnit(productId)
      this.syncItems()
    },
    removeItem(productId: number | string): void {
      this.cart.removeItem(productId)
      this.syncItems()
    },
    syncItems(): void {
      this.reactiveItems = [...this.cart.getItems()]
    },
  },
})
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">VueShop</span>
        </div>
        <div class="header-badge">
          <span>🛒</span>
          <span class="badge-count" v-if="totalItems > 0">{{ totalItems }}</span>
        </div>
      </div>
    </header>

    <main class="layout">
      <section class="catalog">
        <div class="section-head">
          <h1 class="section-title">Catálogo de Produtos</h1>
          <p class="section-sub">{{ products.length }} produtos disponíveis</p>
        </div>
        <div class="products-grid">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </section>

      <CartSummary
        :total-items="totalItems"
        :final-price="finalPrice"
        :cart-items="reactiveItems"
        @remove-unit="removeUnit"
        @remove-item="removeItem"
      />
    </main>
  </div>
</template>

<style>
:root {
  --accent: hsl(243, 75%, 60%);
  --accent-end: hsl(280, 70%, 60%);
  --accent-light: hsl(243, 80%, 75%);
  --bg: hsl(225, 20%, 8%);
  --card-bg: hsl(225, 18%, 11%);
  --item-bg: hsl(225, 16%, 14%);
  --border: hsl(225, 15%, 20%);
  --text-primary: hsl(220, 20%, 95%);
  --text-secondary: hsl(220, 12%, 65%);
  --text-muted: hsl(220, 10%, 45%);
  --header-h: 68px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  font-family:
    'Inter',
    system-ui,
    -apple-system,
    sans-serif;
  background: var(--bg);
  color: var(--text-primary);
  min-height: 100vh;
  line-height: 1.6;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-h);
  background: rgba(12, 13, 20, 0.75);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), var(--accent-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-badge {
  position: relative;
  font-size: 1.4rem;
  cursor: default;
}

.badge-count {
  position: absolute;
  top: -6px;
  right: -8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-end));
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 999px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  animation: pop 0.3s ease;
}

@keyframes pop {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.layout {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 2rem;
  align-items: start;
}

.section-head {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
}

.section-sub {
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .layout {
    padding: 1rem;
  }
  .section-title {
    font-size: 1.35rem;
  }
}
</style>
