<script lang="ts">
import { defineComponent } from 'vue'
import type { CartItem } from '../models/CartItem'

export default defineComponent({
  name: 'CartSummary',

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

  emits: ['remove-unit', 'remove-item'],

  methods: {
    handleRemoveUnit(productId: number | string): void {
      this.$emit('remove-unit', productId)
    },
    handleRemoveItem(productId: number | string): void {
      this.$emit('remove-item', productId)
    },
    formatPrice(value: number): string {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
  },
})
</script>

<template>
  <aside class="cart-panel">
    <div class="cart-header">
      <h2 class="cart-title"><span class="cart-icon">🛒</span> Carrinho</h2>
      <span class="cart-count" :class="{ 'cart-count--pulse': totalItems > 0 }">
        {{ totalItems }}
      </span>
    </div>

    <div class="cart-items" v-if="cartItems.length > 0">
      <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-name">{{ item.product.name }}</span>
          <span class="cart-item-subtotal">
            {{ formatPrice(item.product.price * item.quantity) }}
          </span>
        </div>
        <div class="cart-item-controls">
          <button
            class="ctrl-btn ctrl-btn--minus"
            :title="`Remover uma unidade de ${item.product.name}`"
            @click="handleRemoveUnit(item.product.id)"
          >
            −
          </button>
          <span class="cart-item-qty">{{ item.quantity }}</span>
          <button
            class="ctrl-btn ctrl-btn--delete"
            :title="`Excluir ${item.product.name} do carrinho`"
            @click="handleRemoveItem(item.product.id)"
          >
            🗑
          </button>
        </div>
      </div>
    </div>

    <div class="cart-empty" v-else>
      <span class="empty-icon">🛍️</span>
      <p>Seu carrinho está vazio</p>
    </div>

    <div class="cart-footer" v-if="cartItems.length > 0">
      <div class="cart-total-row">
        <span>Total de itens</span>
        <strong>{{ totalItems }}</strong>
      </div>
      <div class="cart-total-row cart-total-row--price">
        <span>Preço Final</span>
        <strong class="price-highlight">{{ formatPrice(finalPrice) }}</strong>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.cart-panel {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 2rem;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-icon {
  font-size: 1.2rem;
}

.cart-count {
  background: linear-gradient(135deg, var(--accent), var(--accent-end));
  color: #fff;
  border-radius: 999px;
  min-width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  transition: transform 0.2s ease;
}

.cart-count--pulse {
  animation: pulse-badge 0.4s ease;
}

@keyframes pulse-badge {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 340px;
  overflow-y: auto;
  padding-right: 0.25rem;
}

.cart-items::-webkit-scrollbar {
  width: 4px;
}

.cart-items::-webkit-scrollbar-track {
  background: transparent;
}

.cart-items::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 99px;
}

.cart-item {
  background: var(--item-bg);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: slide-in 0.25s ease;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.cart-item-info {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
}

.cart-item-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
}

.cart-item-subtotal {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ctrl-btn {
  border: none;
  border-radius: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s,
    transform 0.1s;
}

.ctrl-btn:active {
  transform: scale(0.9);
}

.ctrl-btn--minus {
  background: rgba(99, 102, 241, 0.15);
  color: var(--accent-light);
}

.ctrl-btn--minus:hover {
  background: rgba(99, 102, 241, 0.28);
}

.ctrl-btn--delete {
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
  margin-left: auto;
}

.ctrl-btn--delete:hover {
  background: rgba(239, 68, 68, 0.25);
}

.cart-item-qty {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text-primary);
  min-width: 1.5rem;
  text-align: center;
}

.cart-empty {
  text-align: center;
  padding: 2rem 0;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.cart-footer {
  border-top: 1px solid var(--border);
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cart-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.cart-total-row--price {
  font-size: 1rem;
}

.price-highlight {
  font-size: 1.25rem;
  color: var(--accent);
  background: linear-gradient(135deg, var(--accent), var(--accent-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
