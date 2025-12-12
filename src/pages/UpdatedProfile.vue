<template>
  <v-container class="update-profile" fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="10" class="pa-6">
          <v-card-title class="text-h6 text-center">
            Update Profile
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="openConfirmDialog">
              <!-- Name -->
              <v-text-field
                v-model="name"
                label="Full Name"
                outlined
                required
              />

              <!-- Email -->
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                required
              />

              <!-- Phone Number -->
              <v-text-field
                v-model="phone_number"
                label="Phone Number"
                outlined
              />

              <!-- Password -->
              <v-text-field
                v-model="password"
                label="New Password"
                type="password"
                outlined
              />

              <!-- Confirm Password -->
              <v-text-field
                v-model="password_confirmation"
                label="Confirm Password"
                type="password"
                outlined
              />

              <!-- Save button -->
              <v-btn
                type="submit"
                color="primary"
                block
                class="mt-4"
              >
                Save Changes
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog للتأكيد -->
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Update</v-card-title>
        <v-card-text>
          Are you sure you want to update your profile information?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="grey" @click="confirmDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            :loading="auth.loading"
            :disabled="auth.loading"
            @click="handleUpdate"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
  name: "UpdateProfile",
  data() {
    return {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
      confirmDialog: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      auth: useAuthStore(),
    };
  },
  mounted() {
    // تحميل بيانات المستخدم الحالية من الـ store
    if (this.auth.user) {
      this.name = this.auth.user.name || "";
      this.email = this.auth.user.email || "";
      this.phone_number = this.auth.user.phone_number || "";
    }
  },
  methods: {
    openConfirmDialog() {
      this.confirmDialog = true;
    },
    async handleUpdate() {
      await this.auth.updateProfile({
        name: this.name,
        email: this.email,
        phone_number: this.phone_number,
        password: this.password,
        password_confirmation: this.password_confirmation,
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
.update-profile {
  margin-top: 50px;
}
</style>
