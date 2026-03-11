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
        console.log('✓ Connected to MongoDB');

        const User = mongoose.model('User', UserSchema);

        // Delete existing admin if present
        const existing = await User.findOneAndDelete({ email: 'teste@pulso.com' });
        if (existing) {
            console.log('Deleted existing user');
        }

        const email = 'teste@pulso.com';
        const password = 'teste123';
        
        console.log('Creating user with:');
        console.log('  Email:', email);
        console.log('  Password:', password);
        
        const passwordHash = await bcrypt.hash(password, 10);
        console.log('  Password Hash:', passwordHash);

        const update = {
            email,
            passwordHash,
            name: 'PULSO Teste',
            plan: 'strategic',
            isActive: true,
            isAdmin: true
        };

        const user = await User.findOneAndUpdate(
            { email },
            update,
            { upsert: true, new: true }
        );

        console.log('\n✓ USER CREATED/UPDATED:');
        console.log('  Email:', user.email);
        console.log('  Password:', password);
        console.log('  Password Hash:', user.passwordHash);
        console.log('  ID:', user._id);
        console.log('  Is Admin:', user.isAdmin);
        console.log('  Is Active:', user.isActive);

        // Verify the hash
        if (user.passwordHash) {
            const isValid = await bcrypt.compare(password, user.passwordHash);
            console.log('  Hash Valid:', isValid);

            console.log('\nVerifying user can be found and authenticated:');
            const foundUser = await User.findOne({ email });
            if (foundUser && foundUser.passwordHash) {
                const hashValid = await bcrypt.compare(password, foundUser.passwordHash);
                console.log('  ✓ User found');
                console.log('  ✓ Hash is valid:', hashValid);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('✗ Error:', error);
        process.exit(1);
    }
}

run();
