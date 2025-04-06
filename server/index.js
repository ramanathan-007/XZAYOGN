// // auth_backend/index.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bcrypt = require('bcrypt');
// const User = require('./models/User');

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect('mongodb+srv://ramanathan789:gokulesh123%40@clusterjob.caygrmj.mongodb.net/?retryWrites=true&w=majority&appName=ClusterJob', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Sign up route
// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const existingUser = await User.findOne({ email });
//   if (existingUser) return res.status(400).json({ error: 'User already exists' });

//   const user = new User({ email, password: hashedPassword });
//   await user.save();
//   res.status(201).json({ message: 'User created successfully' });
// });

// // Sign in route
// app.post('/signin', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ error: 'Invalid email or password' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

//   res.status(200).json({ message: 'Signed in successfully' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://ramanathan789:gokulesh123%40@clusterjob.caygrmj.mongodb.net/?retryWrites=true&w=majority&appName=ClusterJob')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ Mongo error', err));

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('982628677943-m9cl6ldi8hfsfrkn59p5a2ohe39a0it5.apps.googleusercontent.com');

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '982628677943-m9cl6ldi8hfsfrkn59p5a2ohe39a0it5.apps.googleusercontent.com',
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, password: 'google' }); // placeholder password
      await user.save();
    }

    res.json({ success: true, message: 'Google login successful', user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'Google auth failed' });
  }
});

