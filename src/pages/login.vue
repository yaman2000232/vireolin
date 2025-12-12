<template>
  <v-container fluid class="login-wrapper d-flex align-center justify-center">
    <v-row class="w-100" justify="center">
      <v-col cols="12" sm="10" md="6" lg="4">

        <v-card elevation="12" class="pa-6 pa-sm-8  rounded-xl login-card">

          <!-- Title -->
          <v-card-title class="text-h5 text-center font-weight-bold text-primary">
            <v-icon start color="primary" class="me-2">mdi-login</v-icon>
            Sign In
          </v-card-title>

          <v-divider class="my-4"></v-divider>

          <!-- Form -->
          <v-card-text>
            <v-form @submit.prevent="handleLogin" ref="loginForm">
              
              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                required
                variant="outlined"
                class="mb-4"
              />

              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                required
                variant="outlined"
              />

              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-6"
                :loading="loading"
                :disabled="loading"
                size="large"
              >
                Login
              </v-btn>

              <!-- Change Password -->
              <div class="text-center mt-3">
                <v-btn variant="text" color="secondary" to="/change-password">
                  <v-icon start size="18">mdi-key-change</v-icon>
                  Change Password
                </v-btn>
              </div>

              <!-- Forgot Password -->
              <div class="text-center mt-2">
                <v-btn variant="text" color="secondary" to="/forgot-password">
                  <v-icon start size="18">mdi-lock-reset</v-icon>
                  Forgot Password?
                </v-btn>
              </div>

              <!-- Register -->
              <div class="text-center mt-4">
                <v-btn variant="text" to="/register">
                  Not registered?
                  <b class="text-primary ms-1">Register</b>
                </v-btn>
              </div>

            </v-form>
          </v-card-text>

        </v-card>

        <!-- Snackbar -->
        <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          timeout="4000"
          location="top"
        >
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
const showPassword = ref(false)

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
/* .login-card {
  max-width: 420px;
  margin: auto;
  
} */
 .login-wrapper {
  min-height: 100vh;
  
}

.login-card {
  
  border-radius: 16px !important;
}

@media (max-width: 600px) {
  .login-card {
    padding: 20px !important;
  }

  .v-card-title {
    font-size: 20px !important;
  }
}

</style>
