import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Grid, List, Plus } from "lucide-react";
import PropertySelector from "./PropertySelector";
import RoomGrid from "./RoomGrid";
import InventoryItemList from "./InventoryItemList";
import InventoryItemForm from "./InventoryItemForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function InventoryControl() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("1");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [view, setView] = useState("grid");

  return (
    <div className="p-6 space-y-6 bg-background w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Control</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <p className="text-xs text-muted-foreground">
              Across all properties
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Maintenance Needed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">18</div>
            <p className="text-xs text-muted-foreground">
              Items requiring attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Recently Added
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">In the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Replacement Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,750</div>
            <p className="text-xs text-muted-foreground">
              Total inventory value
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <PropertySelector
          selectedProperty={selectedProperty}
          onSelectProperty={setSelectedProperty}
        />

        <Tabs value={view} onValueChange={setView} className="w-full">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center">
              <Grid className="mr-2 h-4 w-4" />
              Room View
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center">
              <List className="mr-2 h-4 w-4" />
              List View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="grid" className="mt-4">
            <RoomGrid
              propertyId={selectedProperty}
              selectedRoom={selectedRoom}
              onSelectRoom={setSelectedRoom}
            />
            {selectedRoom && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Items in Selected Room
                </h2>
                <InventoryItemList
                  propertyId={selectedProperty}
                  roomId={selectedRoom}
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="list" className="mt-4">
            <InventoryItemList propertyId={selectedProperty} />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Inventory Item</DialogTitle>
          </DialogHeader>
          <InventoryItemForm
            propertyId={selectedProperty}
            roomId={selectedRoom || undefined}
            onSubmit={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InventoryControl;
