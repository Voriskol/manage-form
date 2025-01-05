<script setup lang="ts">
import { ref } from 'vue'

const showPassword = ref(false)
const password = ref()
const marks = ref('')
const login = ref('')
const typeRecords = ['LDAP', 'Локальная']
const selectedTypeRecord = ref('Локальная')
const valid = ref<boolean>()
const passwordRules = {
  required: (value: string) => !!value || 'Required.',
  max: (v: string) => v.length <= 100 || 'Max 100 characters',
}
const markRules = {
  max: (v: string) => v.length <= 50 || 'Max 50 characters',
}
const loginRules = {
  required: (value: string) => !!value || 'Required.',
  max: (v: string) => v.length <= 100 || 'Max 100 characters',
}
interface IAccount {
  id: `${string}-${string}-${string}-${string}-${string}`
  marks: string | null
  recordType: string | null
  login: string | null
  password: string | null
}
const accounts = ref<Array<IAccount>>([])
const createAccount = () => {
  const account = {
    id: self.crypto.randomUUID(),
    marks: null,
    recordType: null,
    login: null,
    password: null,
  }
  accounts.value.push(account)
}
const deleteAccount = (id: `${string}-${string}-${string}-${string}-${string}`) => {
  accounts.value = accounts.value.filter((account) => account.id !== id)
}
</script>

<template>
  {{ accounts }}
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <h1 class="text-2xl font-bold">Учетные записи</h1>
      <v-btn @click="createAccount" rounded="xs" variant="outlined">+</v-btn>
    </div>
    <v-alert
      icon="mdi-information"
      text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
    ></v-alert>
    <v-form v-for="account in accounts" :key="account.id" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="account.marks"
              :counter="50"
              :rules="[markRules.max]"
              label="Метки"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="account.recordType"
              clearable
              label="Тип записи"
              :items="typeRecords"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            :md="[account.recordType == 'LDAP' || account.recordType == null ? '5' : '3']"
          >
            <v-text-field
              v-model="account.login"
              :counter="100"
              :rules="[loginRules.max, loginRules.required]"
              label="Логин"
              required
            ></v-text-field>
          </v-col>

          <v-col v-if="account.recordType == 'Локальная'" cols="12" md="2">
            <v-text-field
              v-model="account.password"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.max]"
              :type="showPassword ? 'text' : 'password'"
              label="Пароль"
              name="input-10-1"
              :counter="100"
              @click:append-inner="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn
              @click="deleteAccount(account.id)"
              icon="mdi-bucket-outline"
              variant="text"
            ></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
