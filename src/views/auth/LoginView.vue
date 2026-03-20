<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const login = (role: 'USER' | 'ADMIN') => {
  if (role === 'ADMIN') authStore.loginAsAdmin()
  else authStore.loginAsUser()

  const redirect = (route.query.redirect as string) || '/'
  router.push(redirect)
}
</script>

<template>
  <div class="max-w-md mx-auto py-20 text-center space-y-8 animate-pop">
    <div
      class="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center text-4xl text-white shadow-2xl animate-bounce"
    >
      🔒
    </div>
    <div class="space-y-2">
      <h1 class="text-4xl font-black tracking-tight">Área Restrita</h1>
      <p class="text-zinc-500 dark:text-zinc-400 font-medium">
        Você precisa estar autenticado para continuar sua jornada no VueShop.
      </p>
    </div>

    <div
      class="grid grid-cols-1 gap-4 bg-white dark:bg-zinc-900 border border-white/5 p-8 rounded-[32px] shadow-2xl shadow-emerald-500/10"
    >
      <Button
        label="Entrar como Cliente"
        icon="pi pi-user"
        severity="success"
        size="large"
        class="!py-5 !rounded-2xl !font-bold !transition-all hover:!scale-[1.02]"
        @click="login('USER')"
      />
      <div class="flex items-center gap-4 py-4 opacity-30">
        <div class="h-px bg-zinc-400 flex-1"></div>
        <span class="text-xs font-black uppercase tracking-widest">OU</span>
        <div class="h-px bg-zinc-400 flex-1"></div>
      </div>
      <Button
        label="Acesso Administrativo"
        icon="pi pi-shield"
        severity="help"
        size="large"
        class="!py-5 !rounded-2xl !font-bold !transition-all hover:!scale-[1.02]"
        @click="login('ADMIN')"
      />
    </div>

    <p class="text-xs text-zinc-500 uppercase tracking-widest font-black">
      Autenticação segura via Vue Router Guards
    </p>
  </div>
</template>

<style scoped>
.animate-pop {
  animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes pop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
