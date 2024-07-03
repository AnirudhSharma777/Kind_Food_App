const express = require('express');
const dbconnect = require('./config/database');
const authRoutes = require('./routes/authRouts');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// database
dbconnect;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)



// Routes
app.use('/api/v1/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});