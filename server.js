const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

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
