<template>
  <v-container class="register-wrapper d-flex align-center justify-center" fluid>
    <v-row justify="center" class="w-100">
      <v-col cols="12" sm="10" md="6" lg="4">

        <v-card elevation="12" class="pa-6 pa-sm-8 rounded-xl register-card">

          <!-- Title + Go to Update Profile -->
          <v-card-title class="d-flex justify-space-between align-center">
            <span class="text-h5 font-weight-bold">Create Account</span>

            <v-btn icon @click="$router.push('/update-profile')">
              <v-icon color="primary">mdi-account-edit</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider class="my-4"></v-divider>

          <v-card-text>
            <v-form ref="form" v-model="isValid" @submit.prevent="handleRegister">

              <v-text-field
                v-model="name"
                label="Organization Name"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-3"
                required
              />

              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                :rules="[rules.required, rules.email]"
                variant="outlined"
                class="mb-3"
                required
              />

              <v-text-field
                v-model="phone_number"
                label="Phone Number"
                prepend-inner-icon="mdi-phone"
                type="tel"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-3"
                required
              />

              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword"
                variant="outlined"
                class="mb-3"
                required
              />

              <v-text-field
                v-model="password_confirmation"
                :type="showPassword1 ? 'text' : 'password'"
                label="Confirm Password"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showPassword1 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword1 = !showPassword1"
                variant="outlined"
                class="mb-4"
                required
              />

              <v-btn
                type="submit"
                block
                color="primary"
                class="mt-2"
                :disabled="loading"
                size="large"
              >
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  size="18"
                  color="white"
                  class="mr-2"
                />
                Register
              </v-btn>

              <div class="text-center mt-4">
                <v-btn variant="text" @click="goToLogin">
                  Already have an account? <b class="text-primary ms-1">Login</b>
                </v-btn>
              </div>

            </v-form>
          </v-card-text>

          <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="4000" location="top">
            {{ snackbar.text }}
            <template #actions>
              <v-btn text @click="snackbar.show = false">Close</v-btn>
            </template>
          </v-snackbar>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { useAuthStore } from "@/store/auth";

export default {
  name: "RegisterView",
  data() {
    return {
      showPassword:'',
      showPassword1:'',
      name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",

      loading: false,
      isValid: false,

      snackbar: {
        show: false,
        text: "",
        color: "success",
      },

      rules: {
        required: (v) => !!v || "This field is required",
        email: (v) => /.+@.+\..+/.test(v) || "Email must be valid",
        minPass: (v) => v.length >= 8 || "Password must be at least 8 characters",
      },
    };
  },
  methods: {
    matchPassword(v) {
      return v === this.password || "Passwords do not match";
    },

    async handleRegister() {
      const form = this.$refs.form;
      if (!(await form.validate())) return;

      this.loading = true;
      const authStore = useAuthStore();

      try {
        await authStore.register(
          this.name,
          this.email,
          this.password,
          this.password_confirmation,
          this.phone_number
        );

        // ✅ عرض رسالة تفيد بأنه تم إرسال رابط التحقق
        this.snackbar = { 
          show: true, 
          text: "A verification link has been sent to your email. Please check your inbox.", 
          color: "success" 
        };

        this.loading = false;

        // ❌ لا توجه المستخدم للـ Login بعد التسجيل
        // ✔️ يمكن توجيهه لصفحة CheckEmail
        this.$router.push("/check-email"); // ← صفحة إعلامية

      } catch (error) {
        this.snackbar = { 
          show: true, 
          text: error.message || "Registration failed", 
          color: "error" 
        };
        this.loading = false;
      }
    },

    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.fill-height {
  min-height: 100vh;
}
.register-wrapper {
  min-height: 100vh;
}

.register-card {
  border-radius: 16px !important;
}

@media (max-width: 600px) {
  .register-card {
    padding: 20px !important;
  }

  .v-card-title {
    font-size: 20px !important;
  }
}

</style>
