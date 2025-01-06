import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { IAccount } from '@/interfaces'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Array<IAccount>>([])
  const state = useStorage('state', accounts)
  const createAccount = () => {
    const account = {
      id: self.crypto.randomUUID(),
      marks: '',
      recordType: '',
      login: '',
      password: '',
      showPassword: false,
      valid: false,
    }
    accounts.value.push(account)
  }
  const deleteAccount = (id: `${string}-${string}-${string}-${string}-${string}`) => {
    if (accounts.value) {
      accounts.value = accounts.value.filter((account) => account.id !== id)
    }
  }

  return { accounts, createAccount, deleteAccount }
})
