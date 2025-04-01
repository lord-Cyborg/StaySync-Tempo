import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyFormData } from "./AddProperty";

interface AddPropertyInstallationsProps {
  formData: PropertyFormData;
  onUpdateFormData: (data: Partial<PropertyFormData>) => void;
  onSave: () => void;
  onBack: () => void;
}

const SAMPLE_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    category: "Living Room",
    selected: true,
  },
  {
    url: "https://images.unsplash.com/photo-1556911220-bda9f7f7597e?w=800&q=80",
    category: "Kitchen",
    selected: true,
  },
  {
    url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
    category: "Bedroom 1",
    selected: true,
  },
  {
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    category: "Bedroom 2",
    selected: true,
  },
  {
    url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    category: "Bathroom",
    selected: false,
  },
  {
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
    category: "Outdoor",
    selected: false,
  },
];

const PHOTO_CATEGORIES = [
  "Living Room",
  "Kitchen",
  "Bedroom 1",
  "Bedroom 2",
  "Bedroom 3",
  "Bathroom 1",
  "Bathroom 2",
  "Outdoor",
  "Pool",
  "Dining Room",
];

function AddPropertyInstallations({
  formData,
  onUpdateFormData,
  onSave,
  onBack,
}: AddPropertyInstallationsProps) {
  const [photos, setPhotos] = useState<
    Array<{
      url: string;
      category: string;
      selected: boolean;
    }>
  >(formData.photos || SAMPLE_PHOTOS);
  const [newPhotoCategory, setNewPhotoCategory] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleTogglePhotoSelection = (index: number) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].selected = !updatedPhotos[index].selected;
    setPhotos(updatedPhotos);
    onUpdateFormData({ photos: updatedPhotos });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (uploadedFile && newPhotoCategory) {
      // In a real app, you would upload the file to a server
      // Here we're just creating a local URL
      const newPhoto = {
        url: URL.createObjectURL(uploadedFile),
        category: newPhotoCategory,
        selected: true,
      };
      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      onUpdateFormData({ photos: updatedPhotos });
      setUploadedFile(null);
      setNewPhotoCategory("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Manage Property Photos</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Select the photos you want to import for this property. These photos
          will be used in the property card and gallery.
        </p>

        <div className="space-y-4 mb-6">
          <h3 className="text-md font-medium">Upload New Photo</h3>
          <div className="flex space-x-2">
            <Select
              value={newPhotoCategory}
              onValueChange={setNewPhotoCategory}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Photo Category" />
              </SelectTrigger>
              <SelectContent>
                {PHOTO_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1">
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <Button
              onClick={handleUpload}
              disabled={!uploadedFile || !newPhotoCategory}
              size="sm"
            >
              Upload
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="m9 10 2 2 4-4" />
              </svg>
              <span className="font-medium">
                Selected Photos: {photos.filter((p) => p.selected).length}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative rounded-md overflow-hidden border"
            >
              <img
                src={photo.url}
                alt={photo.category}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 bg-white">
                <p className="text-sm font-medium">{photo.category}</p>
              </div>
              <button
                className={`absolute top-2 right-2 rounded-full p-1 ${photo.selected ? "bg-primary text-white" : "bg-white text-gray-500"}`}
                onClick={() => handleTogglePhotoSelection(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {photo.selected ? (
                    <>
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="m9 10 2 2 4-4" />
                    </>
                  ) : (
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                  )}
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack} className="w-32">
          Back
        </Button>
        <Button onClick={onSave} className="w-32">
          Save Property
        </Button>
      </div>
    </div>
  );
}

export default AddPropertyInstallations;
