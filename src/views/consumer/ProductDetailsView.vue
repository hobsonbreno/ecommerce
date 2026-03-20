<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/useProductStore'
import { useCartStore } from '@/stores/useCartStore'
import { onMounted, computed } from 'vue'
import Button from 'primevue/button'
import Badge from 'primevue/badge'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const productId = computed(() => route.params.id as string)
const product = computed(() => productStore.getProductById(productId.value))

onMounted(() => {
  if (!product.value) {
    router.push('/')
  }
})
</script>

<template>
  <div v-if="product" class="space-y-8 animate-fade-in p-1">
    <Button
      icon="pi pi-arrow-left"
      label="Voltar ao Catálogo"
      text
      severity="secondary"
      size="small"
      @click="router.back()"
      class="!font-bold !py-2 !px-4 hover:!bg-zinc-100 dark:hover:!bg-white/5 !rounded-xl transition-all"
    />

    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-zinc-900/40 p-6 md:p-12 lg:p-16 rounded-[40px] border border-zinc-100 dark:border-white/5 shadow-2xl backdrop-blur-3xl overflow-hidden"
    >
      <div
        class="rounded-3xl overflow-hidden shadow-2xl aspect-square border border-zinc-100 dark:border-white/10 group bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center p-8"
      >
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 rounded-2xl"
        />
        <span v-else class="text-9xl grayscale opacity-10 select-none">📦</span>
      </div>

      <div class="flex flex-col justify-center gap-10">
        <div class="space-y-4">
          <Badge
            :value="product.category.title"
            severity="info"
            class="!uppercase !tracking-[3px] !text-[10px] !font-black !px-3 !py-1 !rounded-md"
          />
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white leading-[1.1]"
          >
            {{ product.name }}
          </h1>
          <p class="text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            Experimente o ápice da inovação e do estilo com o novo {{ product.name }}. Projetado
            para os entusiastas mais exigentes.
          </p>
        </div>

        <div class="space-y-6">
          <div class="flex flex-col gap-2">
            <span class="text-sm font-black uppercase tracking-[4px] text-zinc-400"
              >Investimento</span
            >
            <div class="text-5xl md:text-6xl font-black text-emerald-500 tracking-tighter">
              {{ product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
            </div>
          </div>

          <Button
            label="Garantir Agora"
            icon="pi pi-cart-plus"
            severity="primary"
            class="!w-full !rounded-[24px] !py-6 !text-2xl !font-black !shadow-2xl !shadow-emerald-500/30 transition-all hover:scale-[1.02] hover:!shadow-emerald-500/50 active:scale-95"
            @click="cartStore.addItem(product)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.p-badge) {
  background: var(--p-primary-color);
  color: white;
}
</style>
