<template>
    <v-container class="py-10">
  <v-row justify="center">
    <v-col cols="12" md="8" class="text-center">
      <h2 class="text-h2 text-orange font-weight-bold mb-4">
        Contact Us
      </h2>

      <p class="text-body-1 text-grey-darken mb-6">
        We are here to assist you with any inquiries, support requests, or service information. 
        Reach out to us and our team will respond promptly to ensure your needs are met.
      </p>

      <div
        style="
          height: 4px;
          width: 80px;
          border-radius: 2px;
          background: linear-gradient(to right, #FFCC80, #EF7444);
          margin: 0 auto;
        "
      ></div>
    </v-col>
  </v-row>


  
</v-container>



<v-container class="py-10">
  <v-row>
    <!-- Left side: Contact Form -->
    <v-col cols="12" md="6">
      <v-form v-model="valid" class="bg-grey-lighten-5 border-lg pa-8 border-warning rounded-xl">
    <!-- Service Select -->
    <p class="text-center mb-8 text-h3 text-grey-darken-2">Send Your Message ...</p>
    <v-select
      v-model="service"
      label="Select Service"
      :items="services"
      outlined
      dense
      class="mb-4"
      :rules="[rules.required]"
    ></v-select>

    <!-- Name -->
    <v-text-field
      v-model="name"
      label="Your Name"
      outlined
      dense
      class="mb-4"
      :rules="[rules.required, rules.minName]"
    ></v-text-field>

    <!-- Phone Number -->
    <v-text-field
      v-model="phone"
      label="Phone Number"
      outlined
      dense
      class="mb-4"
      type="tel"
      :rules="[rules.required, rules.phone]"
    ></v-text-field>

    <!-- Email -->
    <v-text-field
      v-model="email"
      label="Email Address"
      outlined
      dense
      class="mb-4"
      type="email"
      :rules="[rules.required, rules.email]"
    ></v-text-field>

    <!-- Message -->
    <v-textarea
      v-model="message"
      label="Your Message"
      outlined
      rows="5"
      class="mb-4"
      :rules="[rules.required, rules.minMessage]"
    ></v-textarea>

    <!-- Send Button -->
    <v-btn
      color="orange-darken-2"
      class="text-white font-weight-bold"
      block
      :disabled="!valid"
      @click="submitForm"
    >
      Send
    </v-btn>
  </v-form>

    </v-col>

    <!-- Right side: Location & Map -->
   <v-col cols="12" md="6" >
  <v-row>
    <!-- Germany Hamburg -->
    <v-col cols="12">
      <v-card class="pa-4 mb-4 rounded-lg hover-scale" color="grey-lighten-4">
        <div class="d-flex align-center">
          <v-icon color="orange-darken-2" class="mr-3">mdi-map-marker</v-icon>
          <div>
            <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-1">
              Germany - Hamburg
            </h3>
            <p class="text-body-2 text-grey-darken">
              Our office is located in Hamburg, Germany.
            </p>
          </div>
        </div>
      </v-card>
    </v-col>

    <!-- Syria Coming Soon -->
    <v-col cols="12">
      <v-card class="pa-4 mb-4 rounded-lg hover-scale" color="grey-lighten-4">
        <div class="d-flex align-center">
          <v-icon color="orange-darken-2" class="mr-3">mdi-map-marker-outline</v-icon>
          <div>
            <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-1">
              Syria - Coming Soon
            </h3>
            <p class="text-body-2 text-grey-darken">
              We will be opening in Syria very soon.
            </p>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>

   <v-card class="pa-4 rounded-lg" color="grey-lighten-4">
    <h3 class="text-subtitle-1 font-weight-bold text-orange-darken-2 mb-4">
      Our Location
    </h3>

    <v-responsive aspect-ratio="16/9">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9711.123456789!2d9.993682!3d53.551086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f123456789%3A0xabcdef123456789!2sHamburg%2C%20Germany!5e0!3m2!1sen!2sde!4v1700000000000!5m2!1sen!2sde"
        width="100%"
        height="100%"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </v-responsive>
  </v-card>
</v-col>




  </v-row>
</v-container>


</template>
<script>
export default {
  data() {
    return {
      valid: false,
      service: null,
      name: '',
      phone: '',
      email: '',
      message: '',
      services: [
        'Medical Facility Maintenance',
        'Printing & Gas Equipment Service',
        'Fuel Station & Energy Systems',
        'Crude Oil Infrastructure',
        'Elevator & Lift Systems',
        'Alarm & Protection Systems',
        'Training & Qualification'
      ],
      rules: {
        required: v => !!v || 'This field is required',
        minName: v => (v && v.length >= 4) || 'Name must be at least 4 characters',
        phone: v => (/^[0-9]+$/.test(v) && v.length >= 8) || 'Phone must be at least 8 digits',
        email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        minMessage: v => (v && v.length >= 10) || 'Message must be at least 10 characters'
      }
    }
  },
  methods: {
    submitForm() {
      if (this.valid) {
        alert('Your message has been sent successfully!')
      }
    }
  }
}
</script>