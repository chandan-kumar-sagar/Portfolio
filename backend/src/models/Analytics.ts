import { Schema, model, Document } from 'mongoose';

export interface IAnalytics extends Document {
  metricName: string;
  count: number;
  lastUpdated: Date;
}

const analyticsSchema = new Schema<IAnalytics>({
  metricName: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
});

export const Analytics = model<IAnalytics>('Analytics', analyticsSchema);
