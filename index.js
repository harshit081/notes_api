const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const session = require('express-session');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

require('dotenv').config();
require('./config/passport');
const cors = require('cors');
const app = express();

// Middleware
app.use(limiter);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors())
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protected');
const notesRoutes = require('./routes/notesRoutes');

app.get('/test',(req,res) =>{
    res.json({message:"test ok"})
})

app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/notes', notesRoutes);


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
