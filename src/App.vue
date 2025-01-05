<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAccountsStore } from './stores/counter'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { onMounted } from 'vue'

const store = useAccountsStore()
const { accounts } = storeToRefs(store)
const createAccount = computed(() => store.createAccount)
const deleteAccount = computed(() => store.deleteAccount)

const showPassword = ref(false)
const typeRecords = ['LDAP', 'Локальная']
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
const getFromStorage = async () => {
  accounts.value = JSON.parse(localStorage.getItem('state'))
}

watch(
  () => accounts.value,
  (newValue) => {
    if (newValue) {
      localStorage.setItem('state', JSON.stringify(accounts.value))
    }
  },
  { deep: true },
)
onMounted(getFromStorage)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <h1 class="text-2xl font-bold">Учетные записи</h1>
      <v-btn @click="createAccount" rounded="xs" variant="outlined">+</v-btn>
    </div>
    <v-alert
      icon="mdi-information"
      text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
    ></v-alert>
    <div class="flex flex-col">
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
              v-if="account.recordType == 'LDAP' || account.recordType == null"
              cols="12"
              :md="5"
            >
              <v-text-field
                v-model="account.login"
                :counter="100"
                :rules="[loginRules.max, loginRules.required]"
                label="Логин"
                required
              ></v-text-field>
            </v-col>
            <v-col v-else cols="12" :md="3">
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
                :type="account.showPassword ? 'text' : 'password'"
                label="Пароль"
                name="input-10-1"
                :counter="100"
                @click:append-inner="account.showPassword = !account.showPassword"
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
  </div>
</template>
