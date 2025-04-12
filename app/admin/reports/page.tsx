"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RedemptionsChart } from "@/components/admin/redemptions-chart"
import { TierDistributionChart } from "@/components/admin/tier-distribution-chart"
import { MonthlyPointsChart } from "@/components/admin/monthly-points-chart"
import { ServiceCategoryChart } from "@/components/admin/service-category-chart"

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold tracking-tight">Reports</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Reward Redemptions</CardTitle>
                <CardDescription>Monthly reward redemptions over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <RedemptionsChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Membership Tier Distribution</CardTitle>
                <CardDescription>Distribution of users across membership tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <TierDistributionChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Points Earned</CardTitle>
              <CardDescription>Points earned by users over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <MonthlyPointsChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Redeemed Rewards</CardTitle>
              <CardDescription>Most popular rewards by redemption count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Detailed reward analytics coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Categories</CardTitle>
              <CardDescription>Distribution of services by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceCategoryChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
