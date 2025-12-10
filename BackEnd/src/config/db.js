// BackEnd/config/db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Mongoose 6+ versiyalarında bu parametrlər defaultdur.
            // useNewUrlParser: true, 
            // useUnifiedTopology: true, 
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Xəta baş verərsə prosesi dayandır
    }
};

export default connectDB;