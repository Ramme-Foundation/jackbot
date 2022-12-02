import mongoose, { Schema } from "mongoose";

export interface ILotteryRow extends mongoose.Document {
  team_id: string;
  week: number;
  year: number;
  row: string;
}

const LotteryRowSchema: Schema = new Schema({
  team_id: { type: String, required: true },
  week: { type: Number, required: true },
  year: { type: Number, required: true },
  row: { type: String, required: true },
});

export const LotteryRow = (mongoose.models.LotteryRow ||
  mongoose.model<ILotteryRow>(
    "LotteryRow",
    LotteryRowSchema
  )) as mongoose.Model<ILotteryRow>;

export interface ICustomLotteryRow extends mongoose.Document {
  team_id: string;
  week: number;
  numbers: number[];
  bonus_numbers: number[];
}

const CustomLotteryRowSchema: Schema = new Schema({
  team_id: { type: String, required: true },
  week: { type: Number, required: true },
  year: { type: Number, required: true },
  numbers: { type: [Number], required: true },
  bonus_numbers: { type: [Number], required: true },
});

export const CustomLotteryRow = (mongoose.models.CustomLotteryRow ||
  mongoose.model<ICustomLotteryRow>(
    "CustomLotteryRow",
    CustomLotteryRowSchema
  )) as unknown as mongoose.Model<ICustomLotteryRow>;
