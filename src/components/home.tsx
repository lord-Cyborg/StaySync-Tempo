import {
  CalendarDays,
  ClipboardList,
  Home as HomeIcon,
  Users,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Home() {
  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 bg-background w-full h-full overflow-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
          StaySync Dashboard
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Welcome back! Here's an overview of your properties.
        </p>
      </div>

      {/* Stats Cards - Horizontal scrollable on mobile */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex overflow-x-auto pb-4 sm:pb-0 sm:grid sm:gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 no-scrollbar">
          <Card className="flex-shrink-0 w-[180px] sm:w-full mr-3 sm:mr-0 overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-3 sm:p-6">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="relative p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold">12</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <p className="text-xs text-green-500 font-medium">+8%</p>
                <p className="text-xs text-muted-foreground ml-2">
                  Active bookings
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-shrink-0 w-[180px] sm:w-full mr-3 sm:mr-0 overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-3 sm:p-6">
              <CardTitle className="text-sm font-medium">Tasks</CardTitle>
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center dark:bg-amber-900">
                <ClipboardList className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent className="relative p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">
                Pending tasks
              </p>
            </CardContent>
          </Card>

          <Card className="flex-shrink-0 w-[180px] sm:w-full mr-3 sm:mr-0 overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-3 sm:p-6">
              <CardTitle className="text-sm font-medium">Team</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900">
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent className="relative p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">Team members</p>
            </CardContent>
          </Card>

          <Card className="flex-shrink-0 w-[180px] sm:w-full mr-3 sm:mr-0 overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-3 sm:p-6">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="relative p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold">$12,450</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <p className="text-xs text-green-500 font-medium">+12%</p>
                <p className="text-xs text-muted-foreground ml-2">Monthly</p>
              </div>
            </CardContent>
          </Card>

          <Card className="flex-shrink-0 w-[180px] sm:w-full mr-3 sm:mr-0 overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-3 sm:p-6">
              <CardTitle className="text-sm font-medium">Inventory</CardTitle>
              <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center dark:bg-cyan-900">
                <Package className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent className="relative p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold">324</div>
              <p className="text-xs text-muted-foreground mt-1">Items</p>
            </CardContent>
          </Card>

          <Card className="flex-shrink-0 w-[180px] sm:w-full mr-3 sm:mr-0 overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative p-3 sm:p-6">
              <CardTitle className="text-sm font-medium">Properties</CardTitle>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center dark:bg-indigo-900">
                <HomeIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent className="relative p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">Active</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for mobile view */}
      <div className="sm:hidden">
        <div className="flex border-b border-border mb-4">
          <button className="px-4 py-2 text-sm font-medium border-b-2 border-primary text-primary">
            Bookings
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted-foreground">
            Tasks
          </button>
        </div>
      </div>

      {/* Detailed Cards */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <Card className="border-none shadow-lg dark:bg-gray-800">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Upcoming Bookings
            </CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <div>
                  <p className="font-medium">Ocean View Villa</p>
                  <p className="text-sm text-muted-foreground">
                    John Smith • 4 guests
                  </p>
                </div>
                <div className="text-sm font-medium px-3 py-1 mt-2 sm:mt-0 inline-block sm:inline rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300">
                  May 15 - May 20
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                <div>
                  <p className="font-medium">Mountain Retreat</p>
                  <p className="text-sm text-muted-foreground">
                    Sarah Johnson • 2 guests
                  </p>
                </div>
                <div className="text-sm font-medium px-3 py-1 mt-2 sm:mt-0 inline-block sm:inline rounded-full bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
                  May 18 - May 25
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/30">
                <div>
                  <p className="font-medium">Downtown Loft</p>
                  <p className="text-sm text-muted-foreground">
                    Michael Brown • 3 guests
                  </p>
                </div>
                <div className="text-sm font-medium px-3 py-1 mt-2 sm:mt-0 inline-block sm:inline rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-800 dark:text-cyan-300">
                  May 22 - May 24
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg dark:bg-gray-800">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              Pending Tasks
            </CardTitle>
            <CardDescription>High priority</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg bg-red-50 dark:bg-red-900/30">
                <div>
                  <p className="font-medium">Replace AC filter</p>
                  <p className="text-sm text-muted-foreground">
                    Ocean View Villa • Maintenance
                  </p>
                </div>
                <div className="text-sm font-medium px-3 py-1 mt-2 sm:mt-0 inline-block sm:inline rounded-full bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300">
                  Due today
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30">
                <div>
                  <p className="font-medium">Deep cleaning</p>
                  <p className="text-sm text-muted-foreground">
                    Mountain Retreat • Cleaning
                  </p>
                </div>
                <div className="text-sm font-medium px-3 py-1 mt-2 sm:mt-0 inline-block sm:inline rounded-full bg-amber-100 text-amber-700 dark:bg-amber-800 dark:text-amber-300">
                  Due tomorrow
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                <div>
                  <p className="font-medium">Restock supplies</p>
                  <p className="text-sm text-muted-foreground">
                    Downtown Loft • Inventory
                  </p>
                </div>
                <div className="text-sm font-medium px-3 py-1 mt-2 sm:mt-0 inline-block sm:inline rounded-full bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300">
                  Due in 3 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
