// BackEnd/models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    // İstifadəçinin unikal istifadəçi adı
    username: {
        type: String,
        required: true,
        unique: true
    },
    // İstifadəçinin unikal email ünvanı
    email: {
        type: String,
        required: true,
        unique: true
    },
    // İstifadəçinin parolu (heşlənmiş formada saxlanacaq)
    password: {
        type: String,
        required: true
    },
    // Rol təyinatı (Admin paneli üçün vacibdir)
    isAdmin: { 
        type: Boolean,
        required: true,
        default: false
    },
}, {
    // Yaradılma və yenilənmə vaxtlarını avtomatik qeyd edir
    timestamps: true 
});

// ***************** PRE-SAVE HOOK (Parolun Heşlənməsi) *****************
// Bu funksiya istifadəçi (User) obyekti verilənlər bazasına 'save' olunmazdan əvvəl işə düşür.
userSchema.pre('save', async function (next) {
    // Əgər parol dəyişməyibsə (məsələn, yalnız email yenilənirsə), heşləməyi ötür.
    if (!this.isModified('password')) {
        next();
    }
    
    // 1. Təsadüfi "salt" (duz) yaradır
    const salt = await bcrypt.genSalt(10);
    
    // 2. Parolu həmin "salt" ilə heşləyir (şifrələyir)
    this.password = await bcrypt.hash(this.password, salt);
});

// ***************** METODLAR (Parolun Müqayisəsi) *****************
// Giriş zamanı istifadəçi tərəfindən daxil edilən parolu DB-dəki heşlənmiş parolla müqayisə etmək üçün metod.
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;