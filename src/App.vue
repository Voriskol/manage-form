<script setup lang="ts">
import { ref } from 'vue'

const showPassword = ref(false)
const password = ref()
const marks = ref('YYY')
const login = ref('Obama')
const typeRecord = ['LDAP', 'Локальная']
const selectedTypeRecord = ref('Локальная')
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
  marks: Array<string>
  recordType: string
  login: string
  password: string
}
const accounts = ref<IAccount>()
const createAccount = () => {}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <h1 class="text-2xl font-bold">Учетные записи</h1>
      <v-btn rounded="xs" variant="outlined">+</v-btn>
    </div>
    <v-alert
      icon="mdi-information"
      text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
    ></v-alert>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="marks"
              :counter="50"
              :rules="[markRules.max]"
              label="Метки"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-select
              v-model="selectedTypeRecord"
              clearable
              label="Тип записи"
              :items="typeRecord"
            ></v-select>
          </v-col>

          <v-col cols="12" :md="[selectedTypeRecord == 'LDAP' ? '5' : '3']">
            <v-text-field
              v-model="login"
              :counter="100"
              :rules="[loginRules.max, loginRules.required]"
              label="Логин"
              required
            ></v-text-field>
          </v-col>

          <v-col v-if="selectedTypeRecord == 'Локальная'" cols="12" md="2">
            <v-text-field
              v-model="password"
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
            <v-btn icon="mdi-bucket-outline" variant="text"></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
