<script setup lang="ts">
import { ref } from 'vue'

// export default {
//   data() {
//     return {
//       show1: false,
//       show2: true,
//       password: 'Password',
//       rules: {
//         required: (value) => !!value || 'Required.',
//         min: (v) => v.length >= 8 || 'Min 8 characters',
//         emailMatch: () => `The email and password you entered don't match`,
//       },
//     }
//   },
// }

const show1 = ref(false)
const show2 = ref(true)
const password = ref('Password')
const marks = ref('YYY')
const login = ref('Obama')
const passwordRules = {
  required: (value) => !!value || 'Required.',
  max: (v) => v.length <= 100 || 'Max 100 characters',
  emailMatch: () => `The email and password you entered don't match`,
}
const markRules = {
  max: (v) => v.length <= 50 || 'Max 50 characters',
}
const loginRules = {
  required: (value) => !!value || 'Required.',
  max: (v) => v.length <= 100 || 'Max 100 characters',
}
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
            <v-select clearable label="Тип записи" :items="['LDAP', 'Локальная']"></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="login"
              :counter="100"
              :rules="[loginRules.max, loginRules.required]"
              label="Логин"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              v-model="password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordRules.required, passwordRules.max]"
              :type="show1 ? 'text' : 'password'"
              hint="At least 8 characters"
              label="Пароль"
              name="input-10-1"
              counter
              @click:append-inner="show1 = !show1"
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
