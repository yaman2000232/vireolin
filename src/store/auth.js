import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('accessToken') || null,
    role: localStorage.getItem('role') || null,
      loading: false,
    error: null,
    message: null,
     user: null,  
  }),

  actions: {
    async login(email, password) {
  console.log('Attempting login with credentials:', email, password)

  const res = await fetch('https://api.vireolin.de/api/login', {
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ email, password })
  })

  const data = await res.json()
  console.log('API response received:', data)

  if (data.status === 'success' && data.data.token) {
    this.token = data.data.token.trim()
    this.role = data.data.roles?.[0] || null   // ← الدور من المصفوفة

    localStorage.setItem('accessToken', this.token)
    if (this.role) {
      localStorage.setItem('role', this.role)
    }

    console.log('Login successful. Role:', this.role)
  } else {
    throw new Error(data.message || 'Login failed')
  }
},


    async register(name, email, password, password_confirmation, phone_number) {
      console.log('Attempting register with data:', name, email, password, phone_number)

      const res = await fetch('https://api.vireolin.de/api/register', {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          name,
          email,
          password,
          password_confirmation,
          phone_number
        })
      })

      const data = await res.json()
      console.log('Register API response received:', data)

      if (data.status === 'success' && data.data.token) {
        this.token = data.data.token
        localStorage.setItem('accessToken', this.token)
        console.log('Registration successful. Token:', this.token)
        return true
      } else {
        throw new Error(data.message || 'Register failed')
      }
    },

     async resetPassword({ token, email, password, password_confirmation }) {
      this.loading = true;
      this.error = null;
      this.message = null;

      try {
        const res = await fetch("https://api.vireolin.de/api/reset-password", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            email,
            password,
            password_confirmation,
          }),
        });

        const data = await res.json();

        if (data.status === "success") {
          this.message = data.message || "Password Reset Successfully";
        } else {
          this.error = data.message || "Something went wrong";
        }
      } catch (err) {
        this.error = "Server error, please try again later";
      } finally {
        this.loading = false;
      }
    },



      async forgotPassword(email) {
      this.loading = true;
      this.error = null;
      this.message = null;

      try {
        const res = await fetch("https://api.vireolin.de/api/forgot-password", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // 🔑 إرسال البريد كـ JSON
        });

        const data = await res.json();

        if (data.status === "success") {
          this.message = data.message || "Reset link sent successfully";
        } else {
          this.error = data.message || "Something went wrong";
        }
      } catch (err) {
        this.error = "Server error, please try again later";
      } finally {
        this.loading = false;
      }
    },

 async updateProfile({ name, email, phone_number, password, password_confirmation }) {
  this.loading = true;
  this.error = null;
  this.message = null;

  try {
    const payload = { name, email };

    // إذا المستخدم غيّر رقم الهاتف
    if (phone_number) {
      payload.phone_number = phone_number;
    }

    // إذا المستخدم غيّر كلمة المرور
    if (password) {
      payload.password = password;
      payload.password_confirmation = password_confirmation;
    }

    const res = await fetch("https://api.vireolin.de/api/update-profile", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.status === "success") {
      this.message = data.message || "Profile updated successfully";

      // تحديث بيانات المستخدم في الـ store
      const updatedUser = data?.data?.[0]?.[0];
      if (updatedUser) {
        this.user = updatedUser;
      }
    } else {
      this.error = data.message || "Update failed";
    }
  } catch (err) {
    this.error = "Server error, please try again later";
  } finally {
    this.loading = false;
  }
},


async changePassword({ old_password, new_password, new_password_confirmation }) {
  this.loading = true;
  this.error = null;
  this.message = null;

  try {
    const payload = {
      old_password,
      new_password,
      new_password_confirmation,
    };

    const res = await fetch("https://api.vireolin.de/api/change-password", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`, // التوكن الحالي للمستخدم
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.status === "success") {
      this.message = data.message || "Password updated successfully";

      // تحديث بيانات المستخدم في الـ store إذا رجعت من السيرفر
      const updatedUser = data?.data?.[0];
      if (updatedUser) {
        this.user = updatedUser;
      }
    } else {
      this.error = data.message || "Password update failed";
    }
  } catch (err) {
    this.error = "Server error, please try again later";
  } finally {
    this.loading = false;
  }
},


   // -------------------------------
// 1️⃣ Verify Email
// -------------------------------
async verifyEmail(userId, token, expires, signature) {
  try {
   const response = await fetch(`https://api.vireolin.de/api/email/verify/${userId}/${token}?expires=${expires}&signature=${signature}`, {
  method: 'GET',
});

    // نحاول تحويل الرد إلى JSON
    let data;
    try {
      data = await response.json();
    } catch {
      // إذا لم يكن JSON، نضعه في message
      const text = await response.text();
      data = { message: text };
    }

    return data; // { message: "Email verified successfully." } أو رسالة خطأ
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
},

// -------------------------------
// 2️⃣ Resend Verification Email
// -------------------------------
async resendVerificationEmail() {
  try {
    const response = await fetch('https://api.vireolin.de/api/email/verification-notification', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`, // token من state
      },
    });

    // التعامل مع احتمال أن السيرفر يرجع نص بدل JSON
    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      data = { message: text };
    }

    return data; // رسالة النجاح أو الفشل
  } catch (error) {
    console.error('Error resending verification email:', error);
    throw error;
  }
},


    logout() {
      console.log('Logging out...')
      this.token = null
      this.role = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('role')
    },
  },
})
