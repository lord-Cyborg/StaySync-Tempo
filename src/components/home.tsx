import {
  CalendarDays,
  ClipboardList,
  Home as HomeIcon,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  Building,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  MoreHorizontal,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Home() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8 bg-background w-full h-full">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Welcome back! Here's your property overview for {currentDate}.
            </p>
          </div>
          <Button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Sparkles className="h-4 w-4" />
            <span>Quick Actions</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards - Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
            <CardTitle className="text-sm font-medium">Bookings</CardTitle>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <p className="text-xs text-emerald-500 font-medium">+8%</p>
              <p className="text-xs text-muted-foreground ml-2">
                from last month
              </p>
            </div>
            <Progress className="h-1 mt-4" value={75} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center mt-1">
              <p className="text-xs text-muted-foreground">
                <span className="text-amber-500 font-medium">
                  3 high priority
                </span>{" "}
                tasks pending
              </p>
            </div>
            <Progress className="h-1 mt-4" value={40} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold">$12,450</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <p className="text-xs text-emerald-500 font-medium">+12%</p>
              <p className="text-xs text-muted-foreground ml-2">
                from last month
              </p>
            </div>
            <Progress className="h-1 mt-4" value={85} />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <div className="h-9 w-9 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Building className="h-5 w-5 text-indigo-500" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center mt-1">
              <p className="text-xs text-muted-foreground">
                <span className="text-indigo-500 font-medium">100%</span>{" "}
                occupancy rate
              </p>
            </div>
            <Progress className="h-1 mt-4" value={100} />
          </CardContent>
        </Card>
      </div>

      {/* Tabs for all views */}
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:w-auto">
          <TabsTrigger value="bookings" className="text-sm">
            Bookings
          </TabsTrigger>
          <TabsTrigger value="tasks" className="text-sm">
            Tasks
          </TabsTrigger>
          <TabsTrigger value="team" className="text-sm">
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Upcoming Bookings</h3>
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>View Calendar</span>
            </Button>
          </div>

          <div className="space-y-3">
            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-0">
                <div className="flex items-center border-l-4 border-primary p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20 rounded-md"
                      >
                        Today
                      </Badge>
                      <h4 className="font-medium">Ocean View Villa</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                          alt="John Smith"
                        />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">
                        John Smith • 4 guests • 5 nights
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                      May 15 - May 20
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-0">
                <div className="flex items-center border-l-4 border-purple-500 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/5 text-purple-500 border-purple-500/20 rounded-md"
                      >
                        In 3 days
                      </Badge>
                      <h4 className="font-medium">Mountain Retreat</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                          alt="Sarah Johnson"
                        />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">
                        Sarah Johnson • 2 guests • 7 nights
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-none">
                      May 18 - May 25
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-0">
                <div className="flex items-center border-l-4 border-cyan-500 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-cyan-500/5 text-cyan-500 border-cyan-500/20 rounded-md"
                      >
                        In 7 days
                      </Badge>
                      <h4 className="font-medium">Downtown Loft</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                          alt="Michael Brown"
                        />
                        <AvatarFallback>MB</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">
                        Michael Brown • 3 guests • 2 nights
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border-none">
                      May 22 - May 24
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Cancel Booking
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" className="text-xs gap-1">
              <span>View All Bookings</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Pending Tasks</h3>
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
              <ClipboardList className="h-3.5 w-3.5" />
              <span>View All Tasks</span>
            </Button>
          </div>

          <div className="space-y-3">
            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-0">
                <div className="flex items-center border-l-4 border-red-500 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-red-500/5 text-red-500 border-red-500/20 rounded-md"
                      >
                        High Priority
                      </Badge>
                      <h4 className="font-medium">Replace AC filter</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <p className="text-sm text-muted-foreground">
                        Ocean View Villa • Maintenance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-none">
                      Due today
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                        <DropdownMenuItem>Reassign Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-0">
                <div className="flex items-center border-l-4 border-amber-500 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-amber-500/5 text-amber-500 border-amber-500/20 rounded-md"
                      >
                        Medium Priority
                      </Badge>
                      <h4 className="font-medium">Deep cleaning</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <p className="text-sm text-muted-foreground">
                        Mountain Retreat • Cleaning
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none">
                      Due tomorrow
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                        <DropdownMenuItem>Reassign Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-0">
                <div className="flex items-center border-l-4 border-emerald-500 p-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/5 text-emerald-500 border-emerald-500/20 rounded-md"
                      >
                        Low Priority
                      </Badge>
                      <h4 className="font-medium">Restock supplies</h4>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <p className="text-sm text-muted-foreground">
                        Downtown Loft • Inventory
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">
                      Due in 3 days
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                        <DropdownMenuItem>Reassign Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" className="text-xs gap-1">
              <span>View All Tasks</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Team Members</h3>
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>Manage Team</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                      alt="Alex Johnson"
                    />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Alex Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      Cleaning Manager
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-none">
                    Available
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t border-border/40">
                <Button
                  variant="ghost"
                  className="w-full rounded-none h-10 text-xs"
                >
                  View Schedule
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                      alt="Maria Garcia"
                    />
                    <AvatarFallback>MG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Maria Garcia</h4>
                    <p className="text-sm text-muted-foreground">
                      Maintenance Lead
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-muted-foreground/20" />
                  </div>
                  <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none">
                    On Task
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t border-border/40">
                <Button
                  variant="ghost"
                  className="w-full rounded-none h-10 text-xs"
                >
                  View Schedule
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all dark:bg-gray-800/50">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=David"
                      alt="David Kim"
                    />
                    <AvatarFallback>DK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">David Kim</h4>
                    <p className="text-sm text-muted-foreground">
                      Property Inspector
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  </div>
                  <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-none">
                    Off Duty
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-0 border-t border-border/40">
                <Button
                  variant="ghost"
                  className="w-full rounded-none h-10 text-xs"
                >
                  View Schedule
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" className="text-xs gap-1">
              <span>View All Team Members</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Home;
