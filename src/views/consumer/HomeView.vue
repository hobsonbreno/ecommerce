<script setup lang="ts">
import { useProductStore } from '@/stores/useProductStore'
import { useCartStore } from '@/stores/useCartStore'
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/models/Product'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

const goToDetails = (id: number | string) => {
  router.push(`/product/${id}`)
}
</script>

<template>
  <div class="space-y-8 p-1">
    <div class="space-y-2">
      <h1 class="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
        Explorar Catálogo
      </h1>
      <p class="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
        {{ productStore.products.length }} produtos premium disponíveis hoje.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
        @add-to-cart="(p: Product) => cartStore.addItem(p)"
        @click="goToDetails(product.id)"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>

<style scoped>
.animate-pop {
  animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
