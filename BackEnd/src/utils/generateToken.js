// BackEnd/utils/generateToken.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // .env faylındakı JWT_SECRET-i yükləyir

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Tokenin etibarlılıq müddəti: 30 gün
    });
};

export default generateToken;