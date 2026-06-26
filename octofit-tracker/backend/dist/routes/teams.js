"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await team_1.default.find({}).lean();
    res.json({
        message: 'Teams route',
        teams,
    });
});
exports.default = router;
