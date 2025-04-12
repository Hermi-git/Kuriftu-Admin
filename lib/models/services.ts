import mongoose, { Document, Model, Schema } from "mongoose"

export interface IService extends Document {
  name: string
  category: string
  description: string
  pointValue: number
  createdAt: Date
}

const ServiceSchema: Schema<IService> = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  pointValue: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema)
export default Service
