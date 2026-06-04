require("dotenv").config(); 

const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);



const mongoose = require("mongoose");
const express = require("express");  
const connectDB = require("./db");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT:", process.env.JWT_SECRET);
connectDB();

const authRoutes = require('./routes/authRoutes')
const preferenceRoutes = require('./routes/preferenceRoutes')
const newsRoutes = require('./routes/newsRoutes')

app.use('/users',authRoutes);
app.use('/users/preferences',preferenceRoutes);
app.use('/news',newsRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'News Aggregator API is running' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;