import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  condition: string;
  notes?: string;
}

interface InventoryCardProps {
  roomName: string;
  items: InventoryItem[];
  onEditItem?: (itemId: string) => void;
}

function InventoryCard({ roomName, items, onEditItem }: InventoryCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group items by category
  const categories = [
    "furniture",
    "bed linen",
    "electronics",
    "lighting",
    "floor-carpet",
    "wall",
    "kitchenware",
    "decor",
    "appliances",
    "other",
  ];

  // Filter items by selected category or show all if none selected
  const filteredItems = selectedCategory
    ? items.filter(
        (item) =>
          item.category.toLowerCase() === selectedCategory.toLowerCase(),
      )
    : items;

  // Group filtered items by category
  const itemsByCategory = filteredItems.reduce<Record<string, InventoryItem[]>>(
    (acc, item) => {
      const category = item.category.toLowerCase();
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {},
  );

  // Count items by category for the filter buttons
  const itemCountByCategory = items.reduce<Record<string, number>>(
    (acc, item) => {
      const category = item.category.toLowerCase();
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {},
  );

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "fair":
        return "bg-yellow-100 text-yellow-800";
      case "poor":
      case "needs-replacement":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{roomName} Inventory</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map(
            (category) =>
              itemCountByCategory[category] && (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <Badge
                    variant="secondary"
                    className="ml-1 bg-primary/20 text-primary"
                  >
                    {itemCountByCategory[category]}
                  </Badge>
                </Button>
              ),
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {Object.entries(itemsByCategory).map(([category, categoryItems]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="capitalize">
                {category}
                <Badge variant="outline" className="ml-2">
                  {categoryItems.length}
                </Badge>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2 border rounded-md hover:bg-accent/50"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox id={`item-${item.id}`} />
                        <div>
                          <label
                            htmlFor={`item-${item.id}`}
                            className="font-medium cursor-pointer"
                          >
                            {item.name}
                          </label>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getConditionColor(
                            item.condition,
                          )}`}
                        >
                          {item.condition}
                        </span>
                        {onEditItem && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEditItem(item.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default InventoryCard;
