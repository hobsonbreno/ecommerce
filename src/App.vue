<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from './components/ProductCard.vue'
import CartSummary from './components/CartSummary.vue'
import { Cart } from './models/Cart'
import type { Product } from './models/Product'
import type { CartItem } from './models/CartItem'
import Button from 'primevue/button'

export default defineComponent({
  name: 'App',

  components: {
    ProductCard,
    CartSummary,
    PButton: Button,
  },

  data() {
    return {
      isDarkMode: true,
      cart: new Cart(),
      reactiveItems: [] as CartItem[],
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
    clearCart(): void {
      this.cart.clear()
      this.syncItems()
    },
    syncItems(): void {
      this.reactiveItems = [...this.cart.getItems()]
    },
    toggleDarkMode(): void {
      this.isDarkMode = !this.isDarkMode
      document.documentElement.classList.toggle('dark', this.isDarkMode)
    },
  },

  mounted() {
    document.documentElement.classList.add('dark')
  },
})
</script>

<template>
  <div
    :class="{ dark: isDarkMode }"
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300"
  >
    <header
      class="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5 h-20 shadow-sm animate-pop"
    >
      <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-primary/30"
          >
            ⚡
          </div>
          <span
            class="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
          >
            VUESHOP
          </span>
        </div>

        <div class="flex items-center gap-6">
          <PButton
            :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
            severity="secondary"
            text
            rounded
            @click="toggleDarkMode"
          />
          <div class="relative group">
            <span class="text-2xl">🛒</span>
            <span
              v-if="totalItems > 0"
              class="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg shadow-primary/40"
            >
              {{ totalItems }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <section class="lg:col-span-8 order-1 lg:order-1 space-y-8">
          <div class="space-y-2">
            <h1
              class="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white text-center md:text-left"
            >
              Explorar Catálogo
            </h1>
            <p
              class="text-zinc-500 dark:text-zinc-400 font-medium text-center md:text-left text-lg"
            >
              {{ products.length }} produtos premium disponíveis hoje.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
              @add-to-cart="addToCart"
            />
          </div>
        </section>

        <section class="lg:col-span-4 order-2 lg:order-2">
          <CartSummary
            :total-items="totalItems"
            :final-price="finalPrice"
            :cart-items="reactiveItems"
            @remove-unit="removeUnit"
            @remove-item="removeItem"
            @add-unit="addToCart"
            @clear-cart="clearCart"
          />
        </section>
      </div>
    </main>

    <footer
      class="mt-20 py-10 border-t border-white/5 text-center text-zinc-500 text-sm font-medium"
    >
      &copy; 2026 VueShop Premium &bull; Desenvolvido com PrimeVue & Tailwind
    </footer>
  </div>
</template>

<style>
:root {
  --primary: #10b981;
}

.text-primary {
  color: var(--p-primary-color) !important;
}
.bg-primary {
  background-color: var(--p-primary-color) !important;
}

body {
  @apply antialiased;
}

@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.animate-pop {
  animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
