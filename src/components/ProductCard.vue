<script lang="ts">
import { defineComponent } from 'vue'
import type { Product } from '../models/Product'

export default defineComponent({
  name: 'ProductCard',

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
  <div class="product-card">
    <div class="product-badge">{{ product.category.title }}</div>
    <div class="product-body">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">
        {{ product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
      </p>
    </div>
    <button class="btn-add" @click="handleAdd"><span class="btn-icon">＋</span> Adicionar</button>
  </div>
</template>

<style scoped>
.product-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  position: relative;
  overflow: hidden;
}

.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.04), transparent);
  pointer-events: none;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.15);
  border-color: var(--accent);
}

.product-badge {
  display: inline-block;
  background: rgba(99, 102, 241, 0.15);
  color: var(--accent-light);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  width: fit-content;
}

.product-body {
  flex: 1;
}

.product-name {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
}

.product-price {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--accent);
}

.btn-add {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, var(--accent), var(--accent-end));
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.65rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.btn-add:hover {
  opacity: 0.88;
  transform: scale(1.02);
}

.btn-add:active {
  transform: scale(0.97);
}

.btn-icon {
  font-size: 1.1rem;
  line-height: 1;
}
</style>
