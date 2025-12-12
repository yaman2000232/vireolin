<template>
  <v-container class="check-email" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" class="text-center">
        <v-card elevation="10" class="pa-4">
          <v-card-title class="text-h5">Check Your Email</v-card-title>
          <v-card-text>
            <p>
              ✅ Account created successfully!<br/>
              📩 Please check your email to verify your account.
            </p>

            <v-btn
              color="success"
              class="mt-3"
              :loading="resendLoading"
              :disabled="resendLoading"
              @click="resendEmail"
            >
              {{ resendLoading ? 'Sending...' : 'Resend Verification Link' }}
            </v-btn>
          </v-card-text>
        </v-card>
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
  name: "CheckEmail",
  data() {
    return {
      resendLoading: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  methods: {
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
      } finally {
        this.resendLoading = false;
        this.snackbar = true;
      }
    }
  }
};
</script>

<style scoped>
.check-email {
  margin-top: 50px;
  text-align: center;
}
</style>
