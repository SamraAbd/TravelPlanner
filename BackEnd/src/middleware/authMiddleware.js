// BackEnd/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// ***************** 1. QORUMA (PROTECT) FUNKSIYASI *****************
export const protect = async (req, res, next) => {
    let token;

    // 1. HTTP Başlıqlarında (Headers) 'Bearer' tokenin olmasını yoxla
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Tokeni 'Bearer' hissəsindən ayırırıq
            token = req.headers.authorization.split(' ')[1];

            // 2. Tokeni Təsdiqlə (Verify)
            // JWT_SECRET açarından istifadə edərək tokeni deşifrə edirik
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. İstifadəçini DB-də Tap
            // Tokenin içindəki ID ilə istifadəçini tapırıq və parolu daxil etmirik (-password)
            req.user = await User.findById(decoded.id).select('-password');
            
            // Hər şey düzgündürsə, növbəti funksiyaya keç (Controller)
            next();

        } catch (error) {
            console.error('Token Xətası:', error);
            // 401 Unauthorized status kodu
            res.status(401).json({ message: 'Token etibarsızdır və ya müddəti bitib.' });
        }
    }

    // Əgər token yoxdursa
    if (!token) {
        res.status(401).json({ message: 'Avtorizasiya uğursuz oldu, token tapılmadı.' });
    }
};

// ***************** 2. ADMIN YOXLANMASI FUNKSIYASI *****************
export const admin = (req, res, next) => {
    // 'protect' funksiyası uğurlu olarsa, req.user artıq mövcud olacaq.
    if (req.user && req.user.isAdmin) {
        next(); // Admindirsə, icazə ver
    } else {
        // 401 Unauthorized status kodu
        res.status(401).json({ message: 'Admin icazəsi tələb olunur.' });
    }
};