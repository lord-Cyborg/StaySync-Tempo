import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function FinancialDashboard() {
  const [timeRange, setTimeRange] = useState("month");
  const [propertyFilter, setPropertyFilter] = useState("all");

  // Financial data would typically come from an API or state management
  const financialData = {
    revenue: {
      bookings: 22450,
      additionalServices: 2130,
      total: 24580,
    },
    expenses: {
      maintenance: 2850,
      cleaning: 1950,
      utilities: 1245,
      supplies: 950,
      management: 1250,
      total: 8245,
    },
    profitMargin: 66.5,
    occupancyRate: 78,
    avgBookingValue: 1640,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <h2 className="text-xl font-semibold">Financial Overview</h2>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="1">Ocean View Villa</SelectItem>
              <SelectItem value="2">Mountain Retreat</SelectItem>
              <SelectItem value="3">Downtown Loft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Bookings</span>
                <span className="font-medium">
                  ${financialData.revenue.bookings.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Additional Services</span>
                <span className="font-medium">
                  ${financialData.revenue.additionalServices.toLocaleString()}
                </span>
              </div>
              <div className="h-[1px] bg-border my-2" />
              <div className="flex justify-between font-bold">
                <span>Total Revenue</span>
                <span>${financialData.revenue.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Maintenance</span>
                <span className="font-medium">
                  ${financialData.expenses.maintenance.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning</span>
                <span className="font-medium">
                  ${financialData.expenses.cleaning.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Utilities</span>
                <span className="font-medium">
                  ${financialData.expenses.utilities.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Supplies</span>
                <span className="font-medium">
                  ${financialData.expenses.supplies.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Management</span>
                <span className="font-medium">
                  ${financialData.expenses.management.toLocaleString()}
                </span>
              </div>
              <div className="h-[1px] bg-border my-2" />
              <div className="flex justify-between font-bold">
                <span>Total Expenses</span>
                <span>${financialData.expenses.total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Profit Margin</span>
                <span className="font-medium text-green-600">
                  {financialData.profitMargin}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Occupancy Rate</span>
                <span className="font-medium">
                  {financialData.occupancyRate}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>Avg. Booking Value</span>
                <span className="font-medium">
                  ${financialData.avgBookingValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Net Profit</span>
                <span className="font-medium text-green-600">
                  $
                  {(
                    financialData.revenue.total - financialData.expenses.total
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-8 text-muted-foreground">
            [Chart visualization would go here - showing revenue, expenses, and
            profit over time]
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FinancialDashboard;
