// BackEnd/controllers/planController.js

import TravelPlan from '../models/TravelPlan.js';

// @desc    Cari istifadəçinin bütün səyahət planlarını gətir
// @route   GET /api/plans
// @access  Private (Qorunmuş)
export const getMyPlans = async (req, res) => {
    // req.user.id 'protect' middleware-dən gəlir
    const plans = await TravelPlan.find({ user: req.user._id }).sort({ startDate: -1 });

    res.json(plans);
};

// @desc    Yeni səyahət planı yarat
// @route   POST /api/plans
// @access  Private (Qorunmuş)
export const createPlan = async (req, res) => {
    const { title, description, startDate, endDate, places, budget } = req.body;

    try {
        const newPlan = await TravelPlan.create({
            user: req.user._id, // Planı token sahibi istifadəçiyə bağlayırıq
            title,
            description,
            startDate,
            endDate,
            places,
            budget,
        });

        res.status(201).json(newPlan); // 201 Created
    } catch (error) {
        res.status(400).json({ message: "Plan yaratmaq mümkün olmadı.", error: error.message });
    }
};

// @desc    Bir planı ID ilə gətir
// @route   GET /api/plans/:id
// @access  Private (Qorunmuş)
export const getPlanById = async (req, res) => {
    // 1. Planı tap və istifadəçini doldur (populate)
    const plan = await TravelPlan.findById(req.params.id);

    // 2. Plan tapılmayıbsa
    if (!plan) {
        res.status(404).json({ message: 'Səyahət planı tapılmadı.' });
        return;
    }

    // 3. Planın istifadəçiyə aid olduğunu yoxla (TƏHLÜKƏSİZLİK QAYDASI)
    // ID-ləri string-ə çevirmək lazımdır, çünki biri ObjectId, digəri string ola bilər
    if (plan.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Bu planı görməyə icazəniz yoxdur.' });
        return;
    }

    res.json(plan);
};

// @desc    Planı yenilə
// @route   PUT /api/plans/:id
// @access  Private (Qorunmuş)
export const updatePlan = async (req, res) => {
    const { title, description, startDate, endDate, places, budget } = req.body;
    const plan = await TravelPlan.findById(req.params.id);

    // 1. Planı və icazəni yoxla
    if (plan && plan.user.toString() === req.user._id.toString()) {
        
        // 2. Məlumatları yenilə
        plan.title = title || plan.title;
        plan.description = description || plan.description;
        plan.startDate = startDate || plan.startDate;
        plan.endDate = endDate || plan.endDate;
        plan.places = places || plan.places;
        plan.budget = budget || plan.budget;

        const updatedPlan = await plan.save();
        res.json(updatedPlan);

    } else {
        res.status(404).json({ message: 'Plan tapılmadı və ya sizə aid deyil.' });
    }
};

// @desc    Planı sil
// @route   DELETE /api/plans/:id
// @access  Private (Qorunmuş)
export const deletePlan = async (req, res) => {
    const plan = await TravelPlan.findById(req.params.id);

    // 1. Planı və icazəni yoxla
    if (plan && plan.user.toString() === req.user._id.toString()) {
        
        await TravelPlan.deleteOne({ _id: plan._id });
        res.json({ message: 'Plan uğurla silindi.' });

    } else {
        res.status(404).json({ message: 'Plan tapılmadı və ya sizə aid deyil.' });
    }
};