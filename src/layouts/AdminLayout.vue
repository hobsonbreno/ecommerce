<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'
import Menu from 'primevue/menu'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const menuItems = ref([
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Resumo Geral',
        icon: 'pi pi-chart-bar',
        command: () => router.push('/admin'),
      },
    ],
  },
  {
    label: 'Gestão de Conteúdo',
    items: [
      {
        label: 'Produtos',
        icon: 'pi pi-shopping-bag',
        command: () => router.push('/admin/products'),
      },
      {
        label: 'Vendas',
        icon: 'pi pi-receipt',
        command: () => router.push('/admin/sales'),
      },
    ],
  },
  {
    separator: true,
  },
  {
    label: 'Loja',
    items: [
      {
        label: 'Ver Vitrine',
        icon: 'pi pi-external-link',
        command: () => router.push('/'),
      },
      {
        label: 'Sair e Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          authStore.logout()
          router.push('/login')
        },
      },
    ],
  },
])

const breadcrumbHome = { icon: 'pi pi-home', url: '/admin' }
const breadcrumbItems = computed(() => {
  const parts = route.path.split('/').filter((p) => p !== '')
  return parts.map((label, index) => ({
    label: label.charAt(0).toUpperCase() + label.slice(1),
    to: '/' + parts.slice(0, index + 1).join('/'),
  }))
})
</script>

<template>
  <div
    class="min-h-screen flex bg-zinc-100 dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans"
  >
    <aside
      class="w-64 border-r border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 flex flex-col"
    >
      <div class="h-20 flex items-center px-6 border-b border-zinc-200 dark:border-white/5">
        <div
          class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm shadow-lg mr-3"
        >
          <i class="pi pi-lock"></i>
        </div>
        <span class="font-black text-xl tracking-tighter">ADMIN PANEL</span>
      </div>

      <div class="flex-1 p-4 overflow-y-auto">
        <Menu :model="menuItems" class="!border-none !w-full !bg-transparent" />
      </div>

      <div class="p-6 border-t border-zinc-200 dark:border-white/5 flex items-center gap-3">
        <Avatar
          :label="authStore.user?.name ? authStore.user.name.charAt(0) : 'A'"
          class="!bg-purple-600 !text-white"
          shape="circle"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold truncate">{{ authStore.user?.name }}</p>
          <p class="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
            ADMINISTRADOR
          </p>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <header
        class="h-20 border-b border-zinc-200 dark:border-white/5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl flex items-center justify-between px-8"
      >
        <Breadcrumb
          :home="breadcrumbHome"
          :model="breadcrumbItems"
          class="!bg-transparent !p-0 !border-none"
        >
          <template #item="{ item, props }">
            <router-link v-if="item.to" v-bind="props" :to="item.to">
              <span class="text-sm font-semibold hover:text-purple-500 transition-all">{{
                item.label
              }}</span>
            </router-link>
            <span v-else class="text-sm font-bold text-zinc-400 dark:text-zinc-600">{{
              item.label
            }}</span>
          </template>
        </Breadcrumb>

        <div class="flex items-center gap-4">
          <Button icon="pi pi-bell" text severity="secondary" rounded />
          <Button icon="pi pi-search" text severity="secondary" rounded />
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-10 bg-zinc-50 dark:bg-zinc-900/50">
        <div class="max-w-6xl mx-auto">
          <router-view v-slot="{ Component }">
            <transition name="slide-up" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

:deep(.p-menu) {
  @apply !p-0;
}

:deep(.p-menuitem-link) {
  @apply !p-3 !rounded-xl transition-all !mb-1;
}

:deep(.p-menuitem-link:hover) {
  @apply !bg-zinc-100 dark:!bg-white/5;
}

:deep(.p-menuitem-link .p-menuitem-icon) {
  @apply !text-zinc-500 !mr-3;
}

:deep(.p-menuitem-link:hover .p-menuitem-icon) {
  @apply !text-purple-500;
}

:deep(.p-submenu-header) {
  @apply !bg-transparent !text-[10px] !text-zinc-400 !font-black !uppercase !tracking-[2px] !mt-6 !mb-2 !px-3;
}
</style>
