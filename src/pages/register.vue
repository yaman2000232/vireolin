<template>
  <v-container class="fill-height register-container" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="10" class="pa-4">
          <v-card-title class="text-h5 text-center">Create Account</v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="isValid" @submit.prevent="handleRegister">

              <v-text-field
                v-model="name"
                label="Organization Name"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
                required
              />

              <v-text-field
                v-model="email"
                label="Email"
                prepend-inner-icon="mdi-email"
                type="email"
                :rules="[rules.required, rules.email]"
                required
              />

              <v-text-field
                v-model="phone_number"
                label="Phone Number"
                prepend-inner-icon="mdi-phone"
                type="tel"
                :rules="[rules.required]"
                required
              />

              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                type="password"
                :rules="[rules.required, rules.minPass]"
                required
              />

              <v-text-field
                v-model="password_confirmation"
                label="Confirm Password"
                prepend-inner-icon="mdi-lock-check"
                type="password"
                :rules="[rules.required, matchPassword]"
                required
              />

              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-4"
                :disabled="loading"
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
                  Already have an account? Login
                </v-btn>
              </div>

            </v-form>

            <v-snackbar v-model="snackbar.show" :color="snackbar.color" top right timeout="4000">
              {{ snackbar.text }}
              <template #actions>
                <v-btn text @click="snackbar.show = false">Close</v-btn>
              </template>
            </v-snackbar>
          </v-card-text>
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

        this.snackbar = { show: true, text: "Account Created Successfully!", color: "success" };
        this.loading = false;

        this.$router.push("/login");
      } catch (error) {
        this.snackbar = { show: true, text: error.message || "Registration failed", color: "error" };
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
</style>
