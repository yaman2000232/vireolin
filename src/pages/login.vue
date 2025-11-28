<template>
  <v-container class="fill-height login-container" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="10" class="pa-4">
          <v-card-title class="text-h5 text-center">Sign In</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="loginForm">

              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                required
              />

              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                type="password"
                required
              />

              <v-btn type="submit" color="primary" block class="mt-4" :loading="loading" :disabled="loading">
                Login
              </v-btn>

            </v-form>
          </v-card-text>
        </v-card>

        <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="4000" top>
          {{ snackbar.message }}
          <template #action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
          </template>
        </v-snackbar>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const email = ref('')
const password = ref('')
const loading = ref(false)

const snackbar = ref({
  show: false,
  message: '',
  color: 'error'
})

const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  try {
    await auth.login(email.value, password.value)

    snackbar.value = {
      show: true,
      message: 'Login successful!',
      color: 'success'
    }

    if (auth.role === 'customer') {
      router.push('/')
    } else {
      router.push('/')
    }

  } catch (err) {
    snackbar.value = {
      show: true,
      message: err.message || 'Login failed. Please try again.',
      color: 'error'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style>
.fill-height {
  min-height: 100vh;
}
</style>
