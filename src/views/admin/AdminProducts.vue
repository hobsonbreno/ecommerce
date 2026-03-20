<script setup lang="ts">
import { useProductStore } from '@/stores/useProductStore'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const productStore = useProductStore()
const filters = ref({
  global: { value: null, matchMode: 'contains' },
})
</script>

<template>
  <div class="space-y-10 animate-fade-in p-1">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="space-y-3">
        <h1 class="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">
          Gestão de Inventário
        </h1>
        <div class="h-1.5 w-32 bg-emerald-500 rounded-full"></div>
      </div>
      <Button
        label="Adicionar Produto"
        icon="pi pi-plus-circle"
        severity="success"
        class="!rounded-[20px] !px-10 !py-4 !font-black !shadow-xl !shadow-emerald-500/20 active:scale-95 transition-all"
      />
    </div>

    <div
      class="bg-white dark:bg-zinc-950 rounded-[40px] border border-zinc-200 dark:border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden p-6 md:p-10"
    >
      <div
        class="mb-8 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-100 dark:border-white/5"
      >
        <div class="relative">
          <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"></i>
          <InputText
            v-model="filters.global.value"
            placeholder="Localizar produto..."
            class="!bg-white dark:!bg-zinc-950 !rounded-xl !pl-12 !py-3 !border-zinc-200 dark:!border-white/10 !w-80"
          />
        </div>
        <p class="text-[10px] font-black uppercase text-zinc-400 tracking-[3px]">
          Sincronizado com API de nuvem
        </p>
      </div>

      <DataTable
        :value="productStore.products"
        stripedRows
        class="!border-none"
        paginator
        :rows="5"
        :globalFilterFields="['name', 'category.title']"
        v-model:filters="filters"
        removableSort
      >
        <Column header="Previsualização" class="!w-24">
          <template #body="slotProps">
            <div
              class="w-16 h-16 rounded-xl overflow-hidden border border-zinc-100 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center"
            >
              <img
                v-if="slotProps.data.image"
                :src="slotProps.data.image"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-2xl grayscale opacity-20">📦</span>
            </div>
          </template>
        </Column>
        <Column field="name" header="Especificação Técnica" sortable class="!font-bold text-lg" />
        <Column header="Investimento" sortable field="price">
          <template #body="slotProps">
            <span class="font-black text-xl text-emerald-500 tracking-tight">{{
              slotProps.data.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            }}</span>
          </template>
        </Column>
        <Column header="Segmento" field="category.title" sortable>
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.category.title"
              severity="info"
              class="!uppercase !tracking-[1px] !text-[10px] !font-black !px-2 !py-1 !rounded-md"
            />
          </template>
        </Column>
        <Column header="Nível Executivo">
          <template #body>
            <div class="flex gap-4">
              <Button
                icon="pi pi-pencil"
                text
                rounded
                severity="secondary"
                class="!bg-zinc-100 dark:!bg-white/5"
              />
              <Button icon="pi pi-trash" text rounded severity="danger" class="!bg-red-500/10" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
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
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.19, 1, 0.22, 1);
}

:deep(.p-datatable-header) {
  @apply !bg-transparent !p-0 !border-none;
}
:deep(.p-datatable-thead > tr > th) {
  @apply !bg-zinc-50 dark:!bg-white/5 !text-[10px] !text-zinc-500 !font-black !uppercase !tracking-widest !py-5 !border-none;
}
:deep(.p-datatable-tbody > tr) {
  @apply !bg-transparent dark:!bg-transparent !border-b border-zinc-100 dark:border-white/5 hover:!bg-zinc-50 dark:hover:!bg-white/5 transition-all;
}
:deep(.p-datatable-tbody > tr > td) {
  @apply !py-6 !border-none;
}
:deep(.p-paginator) {
  @apply !bg-transparent !border-none !pt-8;
}
</style>
