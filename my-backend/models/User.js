const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// تعريف مخطط المستخدم
const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function(v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: { 
    type: String, 
    required: true 
  },
  phoneNumber: { 
    type: String, 
    required: true, // اجعل رقم الهاتف مطلوبًا
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v); // تحقق من تنسيق رقم الهاتف (10 أرقام)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  profilePicture: { 
    type: String, // URL or path to the profile picture
    default: '/img/default-avatar.jpg' // قيمة افتراضية في حال عدم وجود صورة
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
}, {
  timestamps: true // إضافة الطوابع الزمنية لإنشاء وتحديث السجلات
});

// دالة لتشفير كلمة المرور قبل حفظها
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// دالة لمقارنة كلمة المرور
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// تصدير النموذج
const User = mongoose.model('User', userSchema);

module.exports = User;
