import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, FileText, CreditCard, BarChart, Plus } from "lucide-react";
import FinancialDashboard from "./FinancialDashboard";
import InvoiceGenerator from "./InvoiceGenerator";
import PaymentTracker from "./PaymentTracker";
import ExpenseManager from "./ExpenseManager";
import ReportGenerator from "./ReportGenerator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function FinancialModule() {
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [view, setView] = useState("dashboard");

  return (
    <div className="p-6 space-y-6 bg-background w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Financial Management
        </h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsInvoiceDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" /> New Invoice
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsExpenseDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,580</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,245</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$16,335</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">$3,450</div>
            <p className="text-xs text-muted-foreground">Unpaid invoices</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={view} onValueChange={setView} className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Invoices
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-4">
          <FinancialDashboard />
        </TabsContent>
        <TabsContent value="invoices" className="mt-4">
          <InvoiceGenerator />
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <PaymentTracker />
        </TabsContent>
        <TabsContent value="expenses" className="mt-4">
          <ExpenseManager />
        </TabsContent>
        <TabsContent value="reports" className="mt-4">
          <ReportGenerator />
        </TabsContent>
      </Tabs>

      <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceGenerator
            isDialog
            onSubmit={() => setIsInvoiceDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
          </DialogHeader>
          <ExpenseManager
            isDialog
            onSubmit={() => setIsExpenseDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FinancialModule;
