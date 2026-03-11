const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGODB_URI;
console.log('Connecting to:', uri.split('@')[1] || uri); // Don't log full URI with credentials

mongoose.connect(uri)
    .then(() => {
        console.log('✅ Connected to MongoDB successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// Timeout after 15 seconds
setTimeout(() => {
    console.error('❌ MongoDB connection timeout');
    process.exit(1);
}, 15000);
