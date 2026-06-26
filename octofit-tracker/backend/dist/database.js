"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
exports.database = mongoose_1.default.connection;
const connectToDatabase = async () => {
    if (exports.database.readyState >= 1) {
        return exports.database;
    }
    await mongoose_1.default.connect(MONGO_URI);
    return exports.database;
};
exports.connectToDatabase = connectToDatabase;
exports.default = exports.connectToDatabase;
