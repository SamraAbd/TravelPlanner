// BackEnd/setupTests.js
import dotenv from 'dotenv';

// .env faylını Jest test mühitinə yükləyin
dotenv.config({ path: './.env' }); 

// Əgər TEST mühiti üçün fərqli bir DB istifadə etmək istəyirsinizsə:
// process.env.MONGO_URI = process.env.TEST_MONGO_URI;