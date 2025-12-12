<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <!-- Loader أثناء تحميل الصفحة -->
    <v-overlay v-if="pageLoading" absolute>
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>

    <v-card max-width="400" class="pa-6">
      <v-card-title class="text-h6 text-center">Reset Password</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleResetPassword">
          <v-text-field
            v-model="password"
            label="New Password"
            type="password"
            required
            outlined
            class="mb-4"
          />

          <v-text-field
            v-model="password_confirmation"
            label="Confirm Password"
            type="password"
            required
            outlined
          />

          <v-btn
            type="submit"
            color="primary"
            block
            class="mt-6"
            :loading="auth.loading"
            :disabled="auth.loading"
          >
            Change Password
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Snackbar للرسائل -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="4000">
      {{ snackbarMessage }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/store/auth";

export default {
  data() {
    return {
      password: "",
      password_confirmation: "",
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      pageLoading: true,
      auth: useAuthStore(),
    };
  },
  mounted() {
    // محاكاة تحميل الصفحة
    setTimeout(() => {
      this.pageLoading = false;
    }, 1000);
  },
  methods: {
    async handleResetPassword() {
      const token = this.$route.query.token;
      const email = this.$route.query.email;

      await this.auth.resetPassword({
        token,
        email,
        password: this.password,
        password_confirmation: this.password_confirmation,
      });

      if (this.auth.message) {
        this.snackbarMessage = this.auth.message;
        this.snackbarColor = "success";
        // إعادة توجيه لصفحة Login بعد النجاح
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
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
