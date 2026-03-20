<script lang="ts">
import { defineComponent } from 'vue'
import type { CartItem } from '../models/CartItem'
import Card from 'primevue/card'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import InputNumber from 'primevue/inputnumber'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'

export default defineComponent({
  name: 'CartSummary',

  components: {
    PCard: Card,
    PButton: Button,
    DataView,
    InputNumber,
    ConfirmDialog,
  },

  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    cartItems: {
      type: Array as () => CartItem[],
      required: true,
    },
  },

  emits: ['remove-unit', 'remove-item', 'add-unit', 'clear-cart', 'checkout'],

  setup() {
    const confirm = useConfirm()
    return { confirm }
  },

  methods: {
    handleRemoveUnit(productId: number | string): void {
      this.$emit('remove-unit', productId)
    },
    handleRemoveItem(productId: number | string): void {
      this.$emit('remove-item', productId)
    },
    handleUpdateQuantity(item: CartItem, newValue: number): void {
      const diff = newValue - item.quantity
      if (diff > 0) {
        for (let i = 0; i < diff; i++) this.$emit('add-unit', item.product)
      } else if (diff < 0) {
        for (let i = 0; i < Math.abs(diff); i++) this.$emit('remove-unit', item.product.id)
      }
    },
    confirmClearCart() {
      this.confirm.require({
        message: 'Tem certeza que deseja esvaziar seu carrinho?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Não',
        acceptLabel: 'Sim, esvaziar',
        acceptClass: 'p-button-danger border-none',
        accept: () => {
          this.$emit('clear-cart')
        },
      })
    },
    formatPrice(value: number): string {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
  },
})
</script>

<template>
  <aside class="flex flex-col gap-6 xl:sticky xl:top-24">
    <ConfirmDialog />

    <div class="flex items-center justify-between">
      <h2 class="text-xl font-black flex items-center gap-2">
        <span class="text-primary text-2xl">🛒</span> Meu Carrinho
      </h2>
      <span
        class="bg-primary text-white font-black rounded-full px-4 py-1.5 text-xs shadow-xl shadow-emerald-500/30"
      >
        {{ totalItems }} itens
      </span>
    </div>

    <PCard
      v-if="cartItems.length > 0"
      class="border border-white/5 bg-zinc-900/10 dark:bg-zinc-900/50 backdrop-blur-md overflow-hidden"
    >
      <template #content>
        <DataView :value="cartItems" class="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          <template #list="slotProps">
            <div class="flex flex-col gap-4">
              <div
                v-for="item in slotProps.items"
                :key="item.product.id"
                class="flex items-center gap-4 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-white/5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div
                  class="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xl grayscale opacity-40"
                >
                  📦
                </div>

                <div class="flex-1 min-w-0">
                  <h4
                    class="text-xs font-black text-zinc-800 dark:text-zinc-100 line-clamp-2 leading-tight"
                  >
                    {{ item.product.name }}
                  </h4>
                  <p class="text-xs font-medium text-primary">
                    {{ formatPrice(item.product.price * item.quantity) }}
                  </p>
                </div>

                <div class="flex flex-col items-end gap-2">
                  <InputNumber
                    :modelValue="item.quantity"
                    @update:modelValue="(val) => handleUpdateQuantity(item, val as number)"
                    showButtons
                    buttonLayout="horizontal"
                    :min="1"
                    :max="99"
                    class="h-9 border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden bg-white dark:bg-zinc-900"
                    inputClass="w-9 p-0 text-center font-black text-sm bg-transparent border-none text-zinc-900 dark:text-white shadow-none ring-0 focus:ring-0"
                    incrementButtonClass="p-0 w-8 bg-zinc-200 dark:bg-zinc-600 border-none text-zinc-700 dark:text-white hover:bg-emerald-500 hover:text-white transition-colors"
                    decrementButtonClass="p-0 w-8 bg-zinc-200 dark:bg-zinc-600 border-none text-zinc-700 dark:text-white hover:bg-emerald-500 hover:text-white transition-colors"
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                  />
                  <PButton
                    icon="pi pi-trash"
                    severity="danger"
                    text
                    rounded
                    size="small"
                    @click="handleRemoveItem(item.product.id)"
                    class="h-6 w-6"
                  />
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </template>

      <template #footer>
        <div class="pt-4 mt-2 border-t border-zinc-200 dark:border-white/5 flex flex-col gap-4">
          <div class="flex justify-between items-center text-zinc-500 dark:text-zinc-400 text-sm">
            <span>Subtotal</span>
            <span>{{ formatPrice(finalPrice) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-zinc-900 dark:text-white">Total</span>
            <span class="text-2xl font-black text-primary">{{ formatPrice(finalPrice) }}</span>
          </div>

          <div class="flex gap-2">
            <PButton
              label="Limpar"
              severity="secondary"
              text
              class="flex-1 font-bold"
              @click="confirmClearCart"
            />
            <PButton
              label="Finalizar"
              class="flex-[2] font-black p-button-lg"
              @click="$emit('checkout')"
            />
          </div>
        </div>
      </template>
    </PCard>

    <PCard
      v-else
      class="border border-white/5 bg-zinc-900/10 dark:bg-zinc-900/50 backdrop-blur-md text-center py-8"
    >
      <template #content>
        <div class="flex flex-col items-center gap-4">
          <span class="text-6xl grayscale opacity-20">🛍️</span>
          <div>
            <h3 class="text-lg font-bold text-zinc-800 dark:text-white">Carrinho Vazio</h3>
            <p class="text-sm text-zinc-500">Parece que você ainda não escolheu nada.</p>
          </div>
          <PButton label="Ver Catálogo" text severity="info" class="mt-4 font-bold" />
        </div>
      </template>
    </PCard>
  </aside>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-zinc-300 dark:bg-zinc-800 rounded-full;
}

:deep(.p-card-body) {
  padding: 1.5rem;
}

:deep(.p-inputnumber-increment-button),
:deep(.p-inputnumber-decrement-button) {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 1.1rem !important;
  color: inherit !important;
}

:deep(.p-inputnumber-increment-button:hover),
:deep(.p-inputnumber-decrement-button:hover) {
  background: #10b981 !important;
  color: white !important;
}

:deep(.p-inputnumber-input) {
  flex: none;
}
</style>
