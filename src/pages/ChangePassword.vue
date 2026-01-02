<template>
  <v-container class="change-password" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="10" class="pa-6">
          <v-card-title class="text-h6 text-center">
            {{ $t('changePassword.title') }}
          </v-card-title>

          <v-card-text>
            <v-form ref="form" @submit.prevent="openConfirmDialog">

              <!-- Current Password -->
              <v-text-field
                v-model="old_password"
                :type="showOld ? 'text' : 'password'"
                :label="$t('changePassword.currentPassword')"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showOld ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showOld = !showOld"
                variant="outlined"
                :rules="oldPassRules"
                required
              />

              <!-- New Password -->
              <v-text-field
                v-model="new_password"
                :type="showNew ? 'text' : 'password'"
                :label="$t('changePassword.newPassword')"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showNew ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showNew = !showNew"
                variant="outlined"
                :rules="newPassRules"
                required
              />

              <!-- Confirm New Password -->
              <v-text-field
                v-model="new_password_confirmation"
                :type="showConfirm ? 'text' : 'password'"
                :label="$t('changePassword.confirmNewPassword')"
                prepend-inner-icon="mdi-lock"
                :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirm = !showConfirm"
                variant="outlined"
                :rules="confirmPassRules"
                required
              />

              <!-- Submit button -->
              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-4"
              >
                {{ $t('changePassword.changeButton') }}
              </v-btn>

              <!-- Login Button -->
              <v-btn
                block
                variant="text"
                color="primary"
                class="mt-2"
                @click="$router.push('/login')"
              >
                {{ $t('changePassword.goToLogin') }}
              </v-btn>

            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">
          {{ $t('changePassword.confirmDialog.title') }}
        </v-card-title>
        <v-card-text>
          {{ $t('changePassword.confirmDialog.text') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="confirmDialog = false">
            {{ $t('changePassword.confirmDialog.cancel') }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="auth.loading"
            :disabled="auth.loading"
            @click="handleChangePassword"
          >
            {{ $t('changePassword.confirmDialog.confirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="4000">
      {{ snackbarMessage }}
      <template #action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">
          {{ $t('changePassword.snackbar.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>


<script>
import { useAuthStore } from "@/store/auth";

export default {
  name: "ChangePassword",

  data() {
    return {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",

      showOld: false,
      showNew: false,
      showConfirm: false,

      confirmDialog: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",

      auth: useAuthStore(),

      // قواعد التحقق لكل حقل
      oldPassRules: [
        v => !!v  || "Current password is required",
      ],

      newPassRules: [
        v => !!v || "New password is required",
        v => v.length >= 6 || "Password must be at least 6 characters",
        v => v !== this.old_password || "New password must be different"
      ],

      confirmPassRules: [
        v => !!v || "Please confirm the new password",
        v => v === this.new_password || "Passwords do not match",
      ],
    };
  },

  methods: {
    async openConfirmDialog() {
      const formValid = await this.$refs.form.validate();
      if (formValid) {
        this.confirmDialog = true;
      }
    },

    async handleChangePassword() {
      await this.auth.changePassword({
        old_password: this.old_password,
        new_password: this.new_password,
        new_password_confirmation: this.new_password_confirmation,
      });

      if (this.auth.message) {
        this.snackbarMessage = this.auth.message;
        this.snackbarColor = "success";
      } else if (this.auth.error) {
        this.snackbarMessage = this.auth.error;
        this.snackbarColor = "error";
      }

      this.snackbar = true;
      this.confirmDialog = false;
    },
  },
};
</script>


<style scoped>
.change-password {
  margin-top: 50px;
}
</style>
