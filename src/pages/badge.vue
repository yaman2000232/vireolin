<template>
  <v-row>
    <!-- البطاقة الأولى -->
    <v-col cols="12" sm="4">
      <v-card class="pa-4">
        <div class="d-flex justify-space-between align-center">
          <h3 class="text-h6">خدمة رقم 1</h3>
          <v-chip
            :color="getColor(status1)"
            text-color="white"
            class="cursor-pointer"
            @click="dialog1 = true"
          >
            {{ status1 }}
          </v-chip>
        </div>
        <p class="text-body-2 mt-2">هذه خدمة بحالة {{ status1 }}.</p>
      </v-card>

      <v-dialog v-model="dialog1" max-width="500">
        <v-card>
          <v-card-title>تفاصيل الحجز</v-card-title>
          <v-card-text>
            <p><strong>ID:</strong> 1</p>
            <p><strong>Service ID:</strong> 1</p>
            <p><strong>User ID:</strong> 1</p>
            <p><strong>Message:</strong> رسالة تجريبية</p>
            <p><strong>Status:</strong> {{ status1 }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="changeStatus('status1')">
              غيّر الحالة
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog1 = false">إغلاق</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>

    <!-- البطاقة الثانية -->
    <v-col cols="12" sm="4">
      <v-card class="pa-4">
        <div class="d-flex justify-space-between align-center">
          <h3 class="text-h6">خدمة رقم 2</h3>
          <v-chip
            :color="getColor(status2)"
            text-color="white"
            class="cursor-pointer"
            @click="dialog2 = true"
          >
            {{ status2 }}
          </v-chip>
        </div>
        <p class="text-body-2 mt-2">هذه خدمة بحالة {{ status2 }}.</p>
      </v-card>

      <v-dialog v-model="dialog2" max-width="500">
        <v-card>
          <v-card-title>تفاصيل الحجز</v-card-title>
          <v-card-text>
            <p><strong>ID:</strong> 2</p>
            <p><strong>Service ID:</strong> 2</p>
            <p><strong>User ID:</strong> 1</p>
            <p><strong>Message:</strong> رسالة تجريبية</p>
            <p><strong>Status:</strong> {{ status2 }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="changeStatus('status2')">
              غيّر الحالة
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog2 = false">إغلاق</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>

    <!-- البطاقة الثالثة -->
    <v-col cols="12" sm="4">
      <v-card class="pa-4">
        <div class="d-flex justify-space-between align-center">
          <h3 class="text-h6">خدمة رقم 3</h3>
          <v-chip
            :color="getColor(status3)"
            text-color="white"
            class="cursor-pointer"
            @click="dialog3 = true"
          >
            {{ status3 }}
          </v-chip>
        </div>
        <p class="text-body-2 mt-2">هذه خدمة بحالة {{ status3 }}.</p>
      </v-card>

      <v-dialog v-model="dialog3" max-width="500">
        <v-card>
          <v-card-title>تفاصيل الحجز</v-card-title>
          <v-card-text>
            <p><strong>ID:</strong> 3</p>
            <p><strong>Service ID:</strong> 3</p>
            <p><strong>User ID:</strong> 1</p>
            <p><strong>Message:</strong> رسالة تجريبية</p>
            <p><strong>Status:</strong> {{ status3 }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="changeStatus('status3')">
              غيّر الحالة
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="dialog3 = false">إغلاق</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      status1: "Pending",
      status2: "Confirmed",
      status3: "Cancelled"
    }
  },
  methods: {
    // دالة لتغيير الحالة بشكل دائري
    changeStatus(key) {
      if (this[key] === "Pending") {
        this[key] = "Confirmed"
      } else if (this[key] === "Confirmed") {
        this[key] = "Cancelled"
      } else {
        this[key] = "Pending"
      }
    },
    // دالة لتحديد اللون حسب الحالة
    getColor(status) {
      if (status === "Confirmed") return "green"
      if (status === "Pending") return "orange"
      if (status === "Cancelled") return "red"
      return "grey"
    }
  }
}
</script>
