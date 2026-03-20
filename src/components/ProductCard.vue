<script lang="ts">
import { defineComponent } from 'vue'
import type { Product } from '../models/Product'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default defineComponent({
  name: 'ProductCard',

  components: {
    PCard: Card,
    PButton: Button,
  },

  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
  },

  emits: ['add-to-cart'],

  methods: {
    handleAdd(): void {
      this.$emit('add-to-cart', this.product)
    },
  },
})
</script>

<template>
  <PCard
    class="h-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:shadow-primary/20 border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 backdrop-blur-sm"
  >
    <template #header>
      <div
        class="h-48 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden relative"
      >
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <span v-else class="text-6xl grayscale opacity-20 select-none">📦</span>

        <div class="absolute top-3 left-3">
          <span
            class="bg-primary/90 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm"
          >
            {{ product.category.title }}
          </span>
        </div>
      </div>
    </template>

    <template #title>
      <div class="pt-2">
        <h3 class="text-xl font-black text-zinc-900 dark:text-zinc-50 leading-tight line-clamp-2">
          {{ product.name }}
        </h3>
      </div>
    </template>

    <template #content>
      <div class="mt-4 flex flex-col gap-1">
        <p class="text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-widest">
          Preço Sugerido
        </p>
        <p
          class="text-lg sm:text-xl lg:text-base xl:text-lg 2xl:text-2xl font-black text-emerald-600 dark:text-emerald-400"
        >
          {{ product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
        </p>
      </div>
    </template>

    <template #footer>
      <PButton
        label="Adicionar"
        icon="pi pi-cart-plus"
        class="w-full font-bold p-button-sm p-button-raised"
        @click="handleAdd"
      />
    </template>
  </PCard>
</template>

<style scoped>
:deep(.p-card-body) {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
  padding: 1rem !important;
}

:deep(.p-card-content) {
  flex: 1 !important;
  padding: 0 !important;
}

:deep(.p-card-footer) {
  padding: 0 !important;
  margin-top: 1.5rem !important;
}

:deep(.p-card-title) {
  margin-bottom: 0 !important;
}
</style>
