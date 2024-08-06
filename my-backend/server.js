const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// إعدادات CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'https://material-tailwind-dashboard-react-main-e63l3vl0f.vercel.app'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
};
app.use(cors(corsOptions));

// استخدام middleware للمعالجة JSON
app.use(express.json());

// الاتصال بقاعدة بيانات MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// تعريف المسارات
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// معالجة الأخطاء للمسارات غير الموجودة
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// معالجة الأخطاء العامة
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
