const mongoose = require('mongoose');
const User = require('./models/User'); // تأكد من أن المسار صحيح

// استبدل هذه القيم بالقيم المناسبة لك
const DB_URI = 'mongodb+srv://lidodidopc3:po95vzfTYDCU5xpK@cluster0.7rpbiib.mongodb.net/dashboard';
const ADMIN_NAME = 'admin';
const ADMIN_EMAIL = 'lidodido101@gmail.com';
const ADMIN_PASSWORD = 'Titowalid1';
const ADMIN_PHONE = '01007374555';

const addAdmin = async () => {
  try {
    // الاتصال بقاعدة البيانات
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // تحقق مما إذا كان المدير موجودًا بالفعل
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit();
    }

    // إنشاء مستخدم جديد وتحديد دوره كمدير
    const admin = new User({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      phone: ADMIN_PHONE,
      role: 'admin', // تعيين الدور كمدير
    });

    await admin.save();
    console.log('Admin created successfully.');
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

addAdmin();
