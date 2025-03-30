import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROPERTIES = [
  { id: "1", name: "Ocean View Villa" },
  { id: "2", name: "Mountain Retreat" },
  { id: "3", name: "Downtown Loft" },
];

interface PropertySelectorProps {
  selectedProperty: string;
  onSelectProperty: (propertyId: string) => void;
}

function PropertySelector({
  selectedProperty,
  onSelectProperty,
}: PropertySelectorProps) {
  return (
    <div className="flex items-center justify-between bg-card p-4 rounded-md border">
      <h2 className="text-lg font-semibold">Select Property</h2>
      <Select value={selectedProperty} onValueChange={onSelectProperty}>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select property" />
        </SelectTrigger>
        <SelectContent>
          {PROPERTIES.map((property) => (
            <SelectItem key={property.id} value={property.id}>
              {property.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default PropertySelector;
