<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { useToast } from 'primevue/usetoast'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const loginData = reactive({
  email: '',
  password: ''
})

const loginRules = {
  email: { required, email },
  password: { required }
}

const vLogin$ = useVuelidate(loginRules, loginData)

const registerData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const registerRules = {
  name: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: { 
    required, 
    sameAsPassword: sameAs(computed(() => registerData.password)) 
  }
}

const vRegister$ = useVuelidate(registerRules, registerData)

const onLogin = async () => {
  const isFormValid = await vLogin$.value.$validate()
  if (!isFormValid) return

  try {
    await authStore.login(loginData)
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Login realizado!', life: 3000 })
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: error.message || 'Credenciais inválidas', life: 3000 })
  }
}

const onRegister = async () => {
  const isFormValid = await vRegister$.value.$validate()
  if (!isFormValid) return

  try {
    await authStore.register(registerData)
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Conta criada com sucesso!', life: 3000 })
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (error: any) {
    toast.add({ severity: 'error', summary: 'Erro', detail: error.message || 'Erro ao registrar', life: 3000 })
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
    <Card class="w-full max-w-md !rounded-3xl !border-zinc-800 !bg-zinc-900 shadow-2xl overflow-hidden">
      <template #content>
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 shadow-lg shadow-emerald-500/20">
            🛍️
          </div>
          <h1 class="text-2xl font-bold text-white">Bem-vindo ao VueShop</h1>
          <p class="text-zinc-400">Acesse sua conta para continuar</p>
        </div>

        <Tabs value="0">
          <TabList class="!bg-transparent !border-zinc-800">
            <Tab value="0" class="flex-1 !text-zinc-400 data-[active]:!text-emerald-500">Login</Tab>
            <Tab value="1" class="flex-1 !text-zinc-400 data-[active]:!text-emerald-500">Registro</Tab>
          </TabList>
          
          <TabPanels class="!bg-transparent !pt-6">
            <TabPanel value="0">
              <form @submit.prevent="onLogin" class="space-y-5">
                <div class="flex flex-col gap-2">
                  <label for="login-email" class="text-sm font-medium text-zinc-300">E-mail</label>
                  <InputText 
                    id="login-email" 
                    v-model="loginData.email" 
                    placeholder="seu@email.com"
                    :class="{'p-invalid': vLogin$.email.$error, '!border-red-500': vLogin$.email.$error}"
                    class="!bg-zinc-800 !border-zinc-700 !text-white !rounded-xl"
                  />
                  <small v-if="vLogin$.email.$error" class="text-red-500 font-medium">
                    {{ vLogin$.email.required.$invalid ? 'E-mail é obrigatório' : 'E-mail inválido' }}
                  </small>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="login-password" class="text-sm font-medium text-zinc-300">Senha</label>
                  <Password 
                    id="login-password" 
                    v-model="loginData.password" 
                    :feedback="false" 
                    toggleMask
                    :class="{'p-invalid': vLogin$.password.$error, '!border-red-500': vLogin$.password.$error}"
                    class="w-full"
                    inputClass="!w-full !bg-zinc-800 !border-zinc-700 !text-white !rounded-xl"
                  />
                  <small v-if="vLogin$.password.$error" class="text-red-500 font-medium">
                    Senha é obrigatória
                  </small>
                </div>

                <Button 
                  type="submit" 
                  label="Entrar" 
                  icon="pi pi-sign-in" 
                  class="w-full !py-3 !rounded-xl !font-bold !bg-emerald-600 !border-none hover:!bg-emerald-500"
                  :loading="authStore.loading"
                  :disabled="vLogin$.$invalid && vLogin$.$dirty"
                />
              </form>
            </TabPanel>

            <TabPanel value="1">
              <form @submit.prevent="onRegister" class="space-y-4">
                <div class="flex flex-col gap-2">
                  <label for="reg-name" class="text-sm font-medium text-zinc-300">Nome</label>
                  <InputText 
                    id="reg-name" 
                    v-model="registerData.name" 
                    placeholder="Seu nome"
                    :class="{'p-invalid': vRegister$.name.$error, '!border-red-500': vRegister$.name.$error}"
                    class="!bg-zinc-800 !border-zinc-700 !text-white !rounded-xl"
                  />
                  <small v-if="vRegister$.name.$error" class="text-red-500 font-medium">
                    Nome é obrigatório
                  </small>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="reg-email" class="text-sm font-medium text-zinc-300">E-mail</label>
                  <InputText 
                    id="reg-email" 
                    v-model="registerData.email" 
                    placeholder="seu@email.com"
                    :class="{'p-invalid': vRegister$.email.$error, '!border-red-500': vRegister$.email.$error}"
                    class="!bg-zinc-800 !border-zinc-700 !text-white !rounded-xl"
                  />
                  <small v-if="vRegister$.email.$error" class="text-red-500 font-medium">
                    {{ vRegister$.email.required.$invalid ? 'E-mail é obrigatório' : 'E-mail inválido' }}
                  </small>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="reg-password" class="text-sm font-medium text-zinc-300">Senha</label>
                  <Password 
                    id="reg-password" 
                    v-model="registerData.password" 
                    toggleMask
                    :class="{'p-invalid': vRegister$.password.$error, '!border-red-500': vRegister$.password.$error}"
                    class="w-full"
                    inputClass="!w-full !bg-zinc-800 !border-zinc-700 !text-white !rounded-xl"
                    promptLabel="Escolha uma senha"
                    weakLabel="Fraca"
                    mediumLabel="Média"
                    strongLabel="Forte"
                  />
                  <small v-if="vRegister$.password.$error" class="text-red-500 font-medium">
                    {{ vRegister$.password.required.$invalid ? 'Senha é obrigatória' : 'Mínimo de 6 caracteres' }}
                  </small>
                </div>

                <div class="flex flex-col gap-2">
                  <label for="reg-confirm" class="text-sm font-medium text-zinc-300">Confirmar Senha</label>
                  <Password 
                    id="reg-confirm" 
                    v-model="registerData.confirmPassword" 
                    :feedback="false" 
                    toggleMask
                    :class="{'p-invalid': vRegister$.confirmPassword.$error, '!border-red-500': vRegister$.confirmPassword.$error}"
                    class="w-full"
                    inputClass="!w-full !bg-zinc-800 !border-zinc-700 !text-white !rounded-xl"
                  />
                  <small v-if="vRegister$.confirmPassword.$error" class="text-red-500 font-medium">
                    {{ vRegister$.confirmPassword.required.$invalid ? 'Confirmação é obrigatória' : 'As senhas não coincidem' }}
                  </small>
                </div>

                <Button 
                  type="submit" 
                  label="Criar Conta" 
                  icon="pi pi-user-plus" 
                  class="w-full !py-3 !rounded-xl !font-bold !bg-emerald-600 !border-none hover:!bg-emerald-500 mt-4"
                  :loading="authStore.loading"
                  :disabled="vRegister$.$invalid && vRegister$.$dirty"
                />
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>

<style scoped>
:deep(.p-password-input) {
  width: 100%;
}

:deep(.p-tablist-tab-list) {
  border-bottom: 1px solid #3f3f46; 
}

:deep(.p-tablist-active-bar) {
  background: #10b981; 
}
</style>
