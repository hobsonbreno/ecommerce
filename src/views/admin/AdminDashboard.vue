<script setup lang="ts">
import { ref } from 'vue'

const metrics = ref([
  {
    label: 'Faturamento Mensal',
    value: 'R$ 1.250.000,00',
    color: 'bg-emerald-500',
    icon: 'pi pi-wallet',
    trend: '+15%',
    trendColor: 'text-emerald-500',
  },
  {
    label: 'Novos Clientes',
    value: '1.420',
    color: 'bg-blue-500',
    icon: 'pi pi-users',
    trend: '+42%',
    trendColor: 'text-blue-500',
  },
  {
    label: 'Conversão',
    value: '3.8%',
    color: 'bg-purple-500',
    icon: 'pi pi-bolt',
    trend: '-2%',
    trendColor: 'text-red-500',
  },
])
</script>

<template>
  <div class="space-y-12 animate-fade-in p-1">
    <div class="space-y-3">
      <h1 class="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
        Painel Corporativo
      </h1>
      <div class="h-1 w-20 bg-purple-600 rounded-full"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="(metric, i) in metrics"
        :key="i"
        class="p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-[32px] shadow-xl space-y-6 transition-all hover:scale-105 group relative overflow-hidden"
      >
        <div
          class="absolute -right-4 -top-4 w-24 h-24 bg-zinc-400/5 group-hover:bg-zinc-400/10 rounded-full transition-all duration-700"
        ></div>

        <div class="flex items-center justify-between">
          <div
            :class="`w-14 h-14 ${metric.color} rounded-2xl flex items-center justify-center text-white shadow-lg`"
          >
            <i :class="`${metric.icon} text-2xl`"></i>
          </div>
          <p
            :class="`font-black ${metric.trendColor} flex items-center gap-1 text-sm bg-zinc-50 dark:bg-zinc-900 px-3 py-1 rounded-full border border-zinc-200 dark:border-white/5`"
          >
            <i
              :class="
                metric.trend.startsWith('+') ? 'pi pi-arrow-up-right' : 'pi pi-arrow-down-right'
              "
            ></i>
            {{ metric.trend }}
          </p>
        </div>

        <div class="space-y-1">
          <div class="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white">
            {{ metric.value }}
          </div>
          <p class="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
            {{ metric.label }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div
        class="lg:col-span-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 p-8 rounded-[40px] shadow-2xl space-y-6"
      >
        <h2 class="text-2xl font-black">Performance Diária</h2>
        <div class="h-64 flex items-end gap-3 justify-between pb-4">
          <div
            v-for="n in 12"
            :key="n"
            :style="`height: ${Math.random() * 80 + 20}%`"
            class="w-full bg-gradient-to-t from-purple-600 to-emerald-500 rounded-t-lg opacity-80 hover:opacity-100 transition-all cursor-pointer"
          ></div>
        </div>
        <p class="text-sm font-medium text-zinc-500 text-center">
          Gráfico em tempo real sincronizado com a rede mundial
        </p>
      </div>

      <div
        class="lg:col-span-4 bg-zinc-900 text-white p-8 rounded-[40px] shadow-2xl space-y-8 flex flex-col justify-between"
      >
        <div class="space-y-4">
          <h2 class="text-2xl font-black italic">PRÉVIA VIP</h2>
          <p class="text-zinc-400 font-medium">
            Lançamentos agendados para a próxima semana e previsões de mercado baseadas em IA.
          </p>
        </div>
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-bold">Monitor ultra 8K</span>
          </div>
          <div class="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span class="text-sm font-bold">Câmera VR Pro</span>
          </div>
        </div>
      </div>
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
