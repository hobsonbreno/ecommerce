<script setup lang="ts">
import { useCartStore } from '@/stores/useCartStore'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

import { useToast } from 'primevue/usetoast'

const cartStore = useCartStore()
const router = useRouter()
const toast = useToast()

const finishOrder = () => {
  cartStore.clear()
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Pedido Finalizado com Sucesso!', life: 3000 })
  router.push('/')
}
</script>

<template>
  <div class="space-y-10 animate-fade-in p-1">
    <div class="space-y-4">
      <h1
        class="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white flex items-center gap-4"
      >
        <i class="pi pi-credit-card text-emerald-500"></i>
        Finalizar Compra
      </h1>
      <p class="text-zinc-500 dark:text-zinc-400 font-medium text-lg">
        Revise seus itens e confirme o seu pedido para garantirmos a entrega rápida.
      </p>
    </div>

    <div
      class="bg-white dark:bg-zinc-900/50 p-6 md:p-10 rounded-[32px] border border-zinc-200 dark:border-white/5 shadow-2xl space-y-8"
    >
      <div v-if="cartStore.items.length > 0" class="space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="flex items-center justify-between py-4 border-b border-zinc-100 dark:border-white/5 transition-all hover:bg-zinc-50 dark:hover:bg-white/5 px-4 rounded-2xl"
        >
          <div class="flex items-center gap-4">
            <img :src="item.product.image" class="w-16 h-16 rounded-xl object-cover shadow-lg" />
            <div>
              <p class="font-black text-lg">{{ item.product.name }}</p>
              <p class="text-sm font-bold text-zinc-500">{{ item.quantity }} unidade(s)</p>
            </div>
          </div>
          <p class="text-xl font-black text-emerald-500">
            {{
              (item.product.price * item.quantity).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }}
          </p>
        </div>
      </div>
      <div v-else class="text-center py-20 text-zinc-400">
        <i class="pi pi-shopping-cart text-6xl mb-4"></i>
        <p class="text-2xl font-black">Nenhum item no carrinho para finalizar.</p>
        <Button
          label="Voltar às Compras"
          text
          severity="info"
          class="mt-4"
          @click="router.push('/')"
        />
      </div>

      <Divider />

      <div v-if="cartStore.items.length > 0" class="space-y-6">
        <div class="space-y-2">
          <div class="flex justify-between items-center text-zinc-500 font-bold">
            <span>Subtotal</span>
            <span>{{
              cartStore.finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }}</span>
          </div>
          <div class="flex justify-between items-center text-zinc-500 font-bold">
            <span>Frete Especial Express</span>
            <span class="text-emerald-500">GRÁTIS</span>
          </div>
        </div>

        <div
          class="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-white/10"
        >
          <span class="text-3xl font-black">Investimento Total</span>
          <div class="text-right">
            <span class="text-4xl font-black text-emerald-500 tracking-tighter">
              {{
                cartStore.finalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }}
            </span>
            <p class="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">
              no cartão em até 12x
            </p>
          </div>
        </div>

        <Button
          label="Confirmar e Gerar Pagamento"
          icon="pi pi-check-circle"
          severity="success"
          size="large"
          class="!w-full !rounded-[24px] !py-8 !text-2xl !font-black !shadow-2xl !shadow-emerald-500/30 transition-all hover:scale-[1.01] hover:!shadow-emerald-500/50"
          @click="finishOrder"
        />
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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
