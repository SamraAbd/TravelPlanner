// BackEnd/models/TravelPlan.js

import mongoose from 'mongoose';

const travelPlanSchema = mongoose.Schema({
    // Bu planın hansı istifadəçiyə aid olduğunu göstərən istinad (reference)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // User modelinə istinad edir
    },
    // Səyahətin adı (məsələn, "Paris Səfəri 2025")
    title: {
        type: String,
        required: true,
    },
    // Səyahətin təsviri
    description: {
        type: String,
    },
    // Səyahətin başlanğıc və son tarixləri
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    // Bu planda ziyarət ediləcək yerlərin siyahısı
    places: [
        {
            name: { type: String, required: true },
            city: { type: String, required: true },
            notes: { type: String },
            // Ziyarət tarixi (opsional)
            visitDate: { type: Date }, 
        },
    ],
    // Planın büdcəsi (opsional)
    budget: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true // Yaradılma və yenilənmə vaxtlarını avtomatik qeyd edir
});

const TravelPlan = mongoose.model('TravelPlan', travelPlanSchema);

export default TravelPlan;