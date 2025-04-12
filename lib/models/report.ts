import mongoose from "mongoose"
const TierDistributionSchema = new mongoose.Schema({
  name: String,
  value: Number
}, { _id: false })

const MonthlyStatSchema = new mongoose.Schema({
  month: String,
  value: Number,
  monthIndex: Number
}, { _id: false })

const ReportSchema = new mongoose.Schema({
  generatedAt: {
    type: Date,
    default: Date.now
  },
  userStats: {
    total: Number,
    growth: Number,
    tierDistribution: [TierDistributionSchema],
    monthlyPoints: [MonthlyStatSchema]
  },
  rewardStats: {
    total: Number,
    newThisMonth: Number,
    redemptions: [MonthlyStatSchema],
    topRedeemed: [TierDistributionSchema]
  },
  serviceStats: {
    total: Number,
    newThisMonth: Number,
    categoryDistribution: [TierDistributionSchema],
    popularServices: [TierDistributionSchema],
    monthlyBookings: [MonthlyStatSchema]
  },
  revenueStats: {
    total: Number,
    growth: Number
  }
})

export default mongoose.models.Report || mongoose.model("Report", ReportSchema)
