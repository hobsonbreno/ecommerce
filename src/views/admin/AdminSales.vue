<template>
  <div class="space-y-10 animate-fade-in p-1">
    <div class="space-y-3">
      <h1 class="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">
        Relatórios de Vendas
      </h1>
      <div class="h-1.5 w-32 bg-purple-500 rounded-full"></div>
    </div>

    <div
      class="bg-white dark:bg-zinc-950 p-12 rounded-[40px] border border-zinc-200 dark:border-white/5 shadow-2xl flex flex-col items-center justify-center text-center space-y-6"
    >
      <div
        class="w-32 h-32 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400"
      >
        <i class="pi pi-receipt text-6xl"></i>
      </div>
      <div class="space-y-2">
        <p class="text-3xl font-black">Módulo de Business Intelligence</p>
        <p class="text-zinc-500 font-medium">
          Os dados de vendas estão sendo processados pelo motor de IA corporativa.
        </p>
      </div>
      <p class="text-xs font-black uppercase tracking-[5px] text-zinc-400 opacity-50">
        Disponível em breve para assinantes ENTERPRISE
      </p>
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
</style>
