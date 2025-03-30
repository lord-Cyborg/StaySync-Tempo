import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  BarChart,
  PieChart,
  LineChart,
  FileText,
} from "lucide-react";

interface ReportGeneratorProps {
  isDialog?: boolean;
  onSubmit?: () => void;
}

function ReportGenerator({ isDialog, onSubmit }: ReportGeneratorProps) {
  const [reportType, setReportType] = useState("revenue");
  const [timeRange, setTimeRange] = useState("month");
  const [propertyFilter, setPropertyFilter] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  const reportContent = (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
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
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList className="grid grid-cols-4 w-full md:w-[500px]">
          <TabsTrigger value="revenue" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="occupancy" className="flex items-center">
            <LineChart className="mr-2 h-4 w-4" />
            Occupancy
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Tax
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                [Revenue chart visualization would go here]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Total Revenue
                  </div>
                  <div className="text-2xl font-bold mt-1">$24,580</div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Avg. Booking Value
                  </div>
                  <div className="text-2xl font-bold mt-1">$1,640</div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    YoY Growth
                  </div>
                  <div className="text-2xl font-bold mt-1 text-green-600">
                    +12.5%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                [Expense chart visualization would go here]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Total Expenses
                  </div>
                  <div className="text-2xl font-bold mt-1">$8,245</div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Largest Category
                  </div>
                  <div className="text-2xl font-bold mt-1">Maintenance</div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    YoY Change
                  </div>
                  <div className="text-2xl font-bold mt-1 text-red-600">
                    +5.2%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                [Occupancy chart visualization would go here]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Avg. Occupancy Rate
                  </div>
                  <div className="text-2xl font-bold mt-1">78%</div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Peak Season Rate
                  </div>
                  <div className="text-2xl font-bold mt-1">92%</div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    YoY Change
                  </div>
                  <div className="text-2xl font-bold mt-1 text-green-600">
                    +8.3%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                [Tax summary visualization would go here]
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Total Tax Collected
                  </div>
                  <div className="text-2xl font-bold mt-1">$3,687</div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">Tax Rate</div>
                  <div className="text-2xl font-bold mt-1">15%</div>
                </div>
                <div className="p-4 border rounded-md">
                  <div className="text-sm text-muted-foreground">
                    Next Filing Due
                  </div>
                  <div className="text-2xl font-bold mt-1">Jun 30, 2023</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  // If in dialog mode, show the form
  if (isDialog) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {reportContent}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSubmit}>
            Cancel
          </Button>
          <Button type="submit">Generate Report</Button>
        </div>
      </form>
    );
  }

  // Otherwise, show the regular view
  return reportContent;
}

export default ReportGenerator;
