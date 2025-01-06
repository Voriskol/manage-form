import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAccountsStore = defineStore('accounts', () => {
  interface IAccount {
    id: `${string}-${string}-${string}-${string}-${string}`
    marks: string
    recordType: string
    login: string
    password: string
    showPassword: boolean
  }
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
    }
    accounts.value.push(account)
    state.value = accounts.value
  }
  const deleteAccount = (id: `${string}-${string}-${string}-${string}-${string}`) => {
    if (accounts.value) {
      accounts.value = accounts.value.filter((account) => account.id !== id)
    }
  }

  return { accounts, createAccount, deleteAccount }
})
