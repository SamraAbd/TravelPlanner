// BackEnd/controllers/authController.js

import User from '../models/User.js';
import generateToken from '../utils/generateToken.js'; // QEYD: Bu faylı Addım 5-də yaradacağıq!

// ***************** 1. QEYDIYYAT (REGISTER) *****************
// YOL: POST /api/auth/register
export const registerUser = async (req, res) => {
    // 1. İstifadəçinin daxil etdiyi məlumatları alır
    const { username, email, password } = req.body;

    // 2. Emailin artıq mövcud olub-olmadığını yoxlayır
    const userExists = await User.findOne({ email });

    if (userExists) {
        // 400 Bad Request status kodu
        res.status(400).json({ message: "Bu email artıq qeydiyyatdan keçib." });
        return;
    }

    try {
        // 3. Yeni istifadəçi yaradılır (Parol User.js modelində avtomatik heşlənir)
        const user = await User.create({
            username,
            email,
            password,
        });

        if (user) {
            // 4. Uğurlu cavab (201 Created) göndərir
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id), // İstifadəçiyə JWT token verilir
            });
        }
    } catch (error) {
        res.status(400).json({ message: "Qeydiyyat uğursuz oldu: " + error.message });
    }
};

// ***************** 2. GIRIŞ (LOGIN) *****************
// YOL: POST /api/auth/login
export const authUser = async (req, res) => {
    // 1. Daxil edilən email və parolu alır
    const { email, password } = req.body;

    // 2. İstifadəçini email vasitəsilə DB-də tapır
    const user = await User.findOne({ email });

    // 3. İstifadəçi tapılıb VƏ parol düzgündürsə (matchPassword User modelində təyin olunub)
    if (user && (await user.matchPassword(password))) {
        // 4. Uğurlu cavab (200 OK) göndərir
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // Yenə də token göndərilir
        });
    } else {
        // 401 Unauthorized status kodu
        res.status(401).json({ message: "Düzgün email və ya parol daxil edin." });
    }
};