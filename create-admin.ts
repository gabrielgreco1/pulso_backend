
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

dotenv.config();

const UserSchema = new Schema({
    email: String,
    passwordHash: String,
    name: String,
    plan: String,
    stripeCustomerId: String,
    isActive: Boolean,
    isAdmin: Boolean,
}, { timestamps: true });

async function run() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('MONGODB_URI not found in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const User = mongoose.model('User', UserSchema);

        const email = 'admin@pulso.com';
        const password = 'admin123';
        const passwordHash = await bcrypt.hash(password, 10);

        const update = {
            email,
            passwordHash,
            name: 'PULSO Admin',
            plan: 'strategic',
            isActive: true,
            isAdmin: true
        };

        const user = await User.findOneAndUpdate(
            { email },
            update,
            { upsert: true, new: true }
        );

        console.log('--- ADMIN USER CREATED/UPDATED ---');
        console.log(`Email: ${user.email}`);
        console.log(`Password: ${password}`);
        console.log(`ID: ${user._id}`);
        console.log(`Is Admin: ${user.isAdmin}`);
        console.log('----------------------------------');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

run();
