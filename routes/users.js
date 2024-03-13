const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/newsletter-subscriptions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a schema for email subscriptions
const subscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

// Create a model based on the schema
module.exports = mongoose.model('Subscription', subscriptionSchema);
