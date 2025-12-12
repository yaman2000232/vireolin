<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <!-- Loader قبل تحميل الصفحة -->
    <v-overlay v-if="pageLoading" absolute>
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>

   <v-card
  max-width="500"
  class="mx-3 px-6 py-8 elevation-12 rounded-xl"
>
  <!-- العنوان -->
  <v-card-title
    class="text-h4 text-center font-weight-bold mb-6"
  >
    Forgot Password
  </v-card-title>

  <v-card-text>
    <v-form @submit.prevent="handleForgotPassword">
      <!-- حقل الايميل -->
      <v-text-field
        v-model="email"
        label="Email Address"
        type="email"
        outlined
        density="comfortable"
        rounded="lg"
        required
      />

      <!-- زر الإرسال -->
      <v-btn
        type="submit"
        color="primary"
        block
        class="mt-6"
        size="large"
        rounded="lg"
        :loading="auth.loading"
      >
        Send Reset Link
      </v-btn>
    </v-form>
  </v-card-text>
</v-card>


    <!-- Snackbar للرسائل -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="4000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/store/auth";

export default {
  data() {
    return {
      email: "",
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      pageLoading: true,
      auth: useAuthStore(),
    };
  },
  mounted() {
    // Loader قبل تحميل الصفحة
    setTimeout(() => {
      this.pageLoading = false;
    }, 1000);
  },
  methods: {
    async handleForgotPassword() {
      await this.auth.forgotPassword(this.email);

      if (this.auth.message) {
        this.snackbarMessage = this.auth.message;
        this.snackbarColor = "success";
      } else if (this.auth.error) {
        this.snackbarMessage = this.auth.error;
        this.snackbarColor = "error";
      }

      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
