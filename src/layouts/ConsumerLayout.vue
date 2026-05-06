<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'
import { useAuthStore } from '@/stores/useAuthStore'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import CartSummary from '@/components/CartSummary.vue'
import type { Product } from '@/models/Product'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const isDarkMode = ref(true)

const totalItems = computed(() => cartStore.totalItems)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

const menuItems = computed(() => [
  { label: 'Home', icon: 'pi pi-home', command: () => router.push('/') },
  { label: 'Produtos', icon: 'pi pi-shopping-bag', command: () => router.push('/') },
  {
    label: 'Checkout',
    icon: 'pi pi-shopping-cart',
    command: () => router.push('/checkout'),
  },
  ...(authStore.isAdmin
    ? [{ label: 'Admin', icon: 'pi pi-lock', command: () => router.push('/admin') }]
    : []),
])

onMounted(() => {
  document.documentElement.classList.add('dark')
})
</script>

<template>
  <div
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300"
  >
    <header class="sticky top-0 z-50 animate-pop">
      <Menubar
        :model="menuItems"
        class="!bg-white/90 dark:!bg-zinc-950/90 !backdrop-blur-2xl !border-b !border-zinc-200 dark:!border-white/10 !h-20 !px-6 !rounded-none shadow-sm"
      >
        <template #start>
          <div class="flex items-center gap-3 mr-8 cursor-pointer" @click="router.push('/')">
            <div
              class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-emerald-500/30"
            >
              ⚡
            </div>
            <span
              class="text-2xl font-black tracking-tighter bg-gradient-to-r from-emerald-500 to-purple-500 bg-clip-text text-transparent"
            >
              VUESHOP
            </span>
          </div>
        </template>

        <template #item="{ item, props }">
          <a v-bind="props.action" class="flex items-center gap-2">
            <span :class="item.icon" />
            <span class="font-bold">{{ item.label }}</span>
          </a>
        </template>

        <template #end>
          <div class="flex items-center gap-4 lg:gap-6">
            <Button
              :icon="isDarkMode ? 'pi pi-sun' : 'pi pi-moon'"
              severity="secondary"
              text
              rounded
              @click="toggleDarkMode"
              class="!w-10 !h-10"
            />

            <div
              class="relative group cursor-pointer p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full transition-all"
              @click="router.push('/checkout')"
            >
              <i class="pi pi-shopping-cart text-xl"></i>
              <Badge
                v-if="totalItems > 0"
                :value="totalItems"
                severity="success"
                class="!absolute !-top-1 !-right-1 !animate-bounce !shadow-lg !scale-75"
              />
            </div>

            <div v-if="authStore.isAuthenticated" class="flex items-center gap-3">
              <div class="text-right hidden sm:block">
                <p class="text-xs font-bold">{{ authStore.user?.name }}</p>
                <p class="text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                  {{ authStore.user?.role }}
                </p>
              </div>
              <Avatar
                :label="authStore.user?.name ? authStore.user.name.charAt(0) : 'U'"
                class="!bg-emerald-500 !text-white !font-bold"
                shape="circle"
              />
              <Button icon="pi pi-sign-out" text rounded severity="danger" @click="logout" />
            </div>

            <div v-else class="flex gap-2">
              <Button label="Entrar" severity="primary" size="small" @click="router.push('/login')" />
            </div>
          </div>
        </template>
      </Menubar>
    </header>

    <main class="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 min-h-[calc(100vh-160px)]">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div class="lg:col-span-8">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>

        <aside class="lg:col-span-4 lg:sticky lg:top-28 self-start h-fit">
          <CartSummary
            :total-items="cartStore.totalItems"
            :final-price="cartStore.finalPrice"
            :cart-items="cartStore.items"
            @remove-unit="(id: number | string) => cartStore.removeUnit(id)"
            @remove-item="(id: number | string) => cartStore.removeItem(id)"
            @add-unit="(p: Product) => cartStore.addItem(p)"
            @clear-cart="cartStore.clear()"
            @checkout="router.push('/checkout')"
          />
        </aside>
      </div>
    </main>

    <footer
      class="py-10 border-t border-zinc-200 dark:border-white/5 text-center text-zinc-500 text-sm font-medium"
    >
      &copy; 2026 VueShop Premium &bull; Desenvolvido com PrimeVue & Tailwind
    </footer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.p-menubar-root-list .p-menuitem-link .p-menuitem-text) {
  @apply text-zinc-700 dark:text-zinc-200 font-bold;
}

:deep(.p-menubar-root-list .p-menuitem-link .p-menuitem-icon) {
  @apply text-zinc-500 dark:text-zinc-400;
}

:deep(.p-menubar) {
  border: none;
}

:deep(.p-menubar-root-list) {
  gap: 1rem;
}

:deep(.p-menuitem-link) {
  @apply rounded-lg transition-all !px-4 !py-2;
}

:deep(.p-menuitem-link:hover) {
  @apply !bg-zinc-100 dark:!bg-white/5;
}
</style>
