<template>
  <v-container class="verify-email" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" class="text-center">

        <!-- Loading state -->
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
          size="40"
          class="my-4"
        ></v-progress-circular>
        <div v-if="loading">Verifying your email...</div>

        <!-- Success state -->
        <v-alert
          v-else-if="success"
          type="success"
          elevation="2"
          class="my-4"
        >
          <div class="text-h6 font-weight-medium mb-2">
            🎉 {{ message }}
          </div>
          <div class="text-body-2 mb-3">
            Your account has been successfully verified. You can now log in to continue.
          </div>

          <!-- زر Login يظهر عند النجاح -->
          <v-btn
            color="primary"
            class="mt-2"
            @click="$router.push('/login')"
          >
            Go to Login
          </v-btn>
        </v-alert>

        <!-- Error state -->
        <v-alert
          v-else
          type="error"
          elevation="2"
          class="my-4"
        >
          <div class="text-h6 font-weight-medium mb-2">
            ❌ {{ message }}
          </div>
          <div class="text-body-2 mb-3">
            Please try again or request a new verification link.
          </div>

          <!-- Resend verification button below the message -->
          <v-btn
            v-if="!success"
            color="success"
            class="mt-3"
            :loading="resendLoading"
            :disabled="resendLoading"
            @click="resendEmail"
          >
            {{ resendLoading ? 'Sending...' : 'Resend Verification Link' }}
          </v-btn>
        </v-alert>

      </v-col>
    </v-row>

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
  name: "Verified",
  data() {
    return {
      loading: true,        
      success: false,       
      message: "",          
      resendLoading: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },

  created() {
    this.verifyEmailFromLink();
  },

  methods: {
    async verifyEmailFromLink() {
      const authStore = useAuthStore();

      const userId = this.$route.params.user_id;
      const token = this.$route.params.token;
      const expires = this.$route.query.expires;
      const signature = this.$route.query.signature;

      try {
        const data = await authStore.verifyEmail(userId, token, expires, signature);
        this.success = true;
        this.message = data.message || "Email verified successfully.";

        this.snackbarMessage = this.message;
        this.snackbarColor = "success";
        this.snackbar = true;

      } catch (error) {
        this.success = false;
        this.message = "The verification link is invalid or has expired.";

        this.snackbarMessage = this.message;
        this.snackbarColor = "error";
        this.snackbar = true;

        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async resendEmail() {
      const authStore = useAuthStore();
      try {
        this.resendLoading = true;
        const data = await authStore.resendVerificationEmail();

        this.snackbarMessage = data.message;
        this.snackbarColor = data.message.includes("Verification link sent")
          ? "success"
          : "error";
      } catch (error) {
        this.snackbarMessage = "An error occurred while resending the verification email.";
        this.snackbarColor = "error";
        console.error(error);
      } finally {
        this.resendLoading = false;
        this.snackbar = true;
      }
    }
  }
};
</script>

<style scoped>
.verify-email {
  margin-top: 50px;
}
</style>
