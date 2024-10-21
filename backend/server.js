const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express(); // Corrected: Added 'const' to declare 'app'
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/foodDeliveryApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define FoodItem Model
const FoodItem = mongoose.model('FoodItem', new mongoose.Schema({
    name: String,
    calories: Number,
    price: Number,
    tags: [String],
}));

// Define User Schema and Model
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

// Sample food items data (optional, if you want to pre-fill the database)
const sampleFoodItems = [
    { name: "Pizza", calories: 250, price: 10, tags: ["Italian", "Fast Food"] },
    { name: "Burger", calories: 300, price: 8, tags: ["American", "Fast Food"] },
    { name: "Pasta", calories: 400, price: 12, tags: ["Italian"] },
];

// API Endpoint to get food items
app.get('/api/food', async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.json(foodItems);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving food items." });
    }
});

// User Registration
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Error registering user." });
    }
});

// User Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ message: "Invalid credentials!" });
        }

        // Generate JWT token for session management
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: "Error logging in." });
    }
});

// Optional: Pre-fill the database with sample food items (run once)
// Uncomment this block if you want to add sample data on server start
/*
FoodItem.insertMany(sampleFoodItems)
    .then(() => console.log("Sample food items added"))
    .catch(err => console.error("Error adding sample food items:", err));
*/

// Start server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});