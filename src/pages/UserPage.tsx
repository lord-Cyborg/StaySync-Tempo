import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Bell,
  Calendar,
  Camera,
  Check,
  CreditCard,
  Edit,
  Eye,
  EyeOff,
  LogOut,
  Phone,
  Save,
  Settings,
  Upload,
  User,
  X,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UserData {
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  bio?: string;
  profileImage?: string;
  joinDate?: string;
  propertiesManaged?: number;
  lastActive?: string;
  language?: string;
  timezone?: string;
  notificationPreferences?: {
    email: boolean;
    tasks: boolean;
    bookings: boolean;
    marketing: boolean;
  };
}

export default function UserPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editMode, setEditMode] = useState<{
    name: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
    bio: boolean;
  }>({ name: false, email: false, phone: false, address: false, bio: false });
  const [formData, setFormData] = useState<Partial<UserData>>({});
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    // Parse user data and add some mock additional info
    const user = JSON.parse(storedUser);
    setUserData({
      ...user,
      phone: user.phone || "+1 (555) 123-4567",
      address: user.address || "123 Property St",
      city: user.city || "San Francisco",
      state: user.state || "CA",
      zip: user.zip || "94105",
      country: user.country || "United States",
      bio:
        user.bio ||
        "Property manager with 5+ years of experience in vacation rentals and Airbnb properties.",
      profileImage:
        user.profileImage ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
      joinDate: "January 15, 2023",
      propertiesManaged: 12,
      lastActive: "Today at 10:45 AM",
      language: "English",
      timezone: "(GMT-08:00) Pacific Time",
      notificationPreferences: {
        email: true,
        tasks: true,
        bookings: true,
        marketing: false,
      },
    });
    setFormData({
      ...user,
      phone: user.phone || "+1 (555) 123-4567",
      address: user.address || "123 Property St",
      city: user.city || "San Francisco",
      state: user.state || "CA",
      zip: user.zip || "94105",
      country: user.country || "United States",
      bio:
        user.bio ||
        "Property manager with 5+ years of experience in vacation rentals and Airbnb properties.",
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = (field: keyof typeof editMode) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
    if (editMode[field]) {
      // Save changes
      if (userData) {
        const updatedUserData = { ...userData, ...formData };
        setUserData(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = () => {
    setPasswordError("");
    setPasswordSuccess(false);

    // Validate password
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Mock password change success
    setPasswordSuccess(true);
    setTimeout(() => {
      setShowPasswordDialog(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordSuccess(false);
    }, 2000);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      // Mock image upload
      setTimeout(() => {
        // In a real app, you would upload the file to a server and get a URL back
        // For now, we'll just use a random avatar
        const randomSeed = Math.random().toString(36).substring(2, 8);
        const newImageUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;

        if (userData) {
          const updatedUserData = { ...userData, profileImage: newImageUrl };
          setUserData(updatedUserData);
          localStorage.setItem("user", JSON.stringify(updatedUserData));
        }
        setUploadingImage(false);
      }, 1500);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleNotificationToggle = (
    type: keyof UserData["notificationPreferences"],
  ) => {
    if (userData && userData.notificationPreferences) {
      const updatedPreferences = {
        ...userData.notificationPreferences,
        [type]: !userData.notificationPreferences[type],
      };

      const updatedUserData = {
        ...userData,
        notificationPreferences: updatedPreferences,
      };

      setUserData(updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));
    }
  };

  if (!userData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
          {/* User Profile Card */}
          <Card className="h-fit">
            <CardHeader className="text-center">
              <div className="flex justify-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/10">
                    <AvatarImage
                      src={userData.profileImage}
                      alt={userData.name}
                    />
                    <AvatarFallback>
                      <User className="h-12 w-12" />
                    </AvatarFallback>
                  </Avatar>
                  <button
                    className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white shadow-md hover:bg-primary/90"
                    onClick={handleImageUpload}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <CardTitle className="mt-4">{userData.name}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
              <Badge variant="outline" className="mt-2">
                {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Joined</span>
                  <span className="text-sm font-medium">
                    {userData.joinDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Properties
                  </span>
                  <span className="text-sm font-medium">
                    {userData.propertiesManaged}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last active
                  </span>
                  <span className="text-sm font-medium">
                    {userData.lastActive}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </Button>
            </CardFooter>
          </Card>

          {/* User Details Tabs */}
          <div className="space-y-6">
            <Tabs defaultValue="settings">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 h-5 w-5" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Display Name */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Display Name</h3>
                      <p className="text-sm text-muted-foreground">
                        This is the name that will be displayed to other users.
                      </p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          name="name"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          value={editMode.name ? formData.name : userData.name}
                          onChange={handleInputChange}
                          readOnly={!editMode.name}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditToggle("name")}
                        >
                          {editMode.name ? (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save
                            </>
                          ) : (
                            <>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Email Address */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Email Address</h3>
                      <p className="text-sm text-muted-foreground">
                        This email is used for notifications and login.
                      </p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="email"
                          name="email"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          value={
                            editMode.email ? formData.email : userData.email
                          }
                          onChange={handleInputChange}
                          readOnly={!editMode.email}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditToggle("email")}
                        >
                          {editMode.email ? (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save
                            </>
                          ) : (
                            <>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Phone Number</h3>
                      <p className="text-sm text-muted-foreground">
                        Your contact phone number for important notifications.
                      </p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="tel"
                          name="phone"
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          value={
                            editMode.phone ? formData.phone : userData.phone
                          }
                          onChange={handleInputChange}
                          readOnly={!editMode.phone}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditToggle("phone")}
                        >
                          {editMode.phone ? (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save
                            </>
                          ) : (
                            <>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Address */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Address</h3>
                      <p className="text-sm text-muted-foreground">
                        Your mailing address for important documents.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            name="address"
                            placeholder="Street Address"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={
                              editMode.address
                                ? formData.address
                                : userData.address
                            }
                            onChange={handleInputChange}
                            readOnly={!editMode.address}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditToggle("address")}
                          >
                            {editMode.address ? (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save
                              </>
                            ) : (
                              <>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </>
                            )}
                          </Button>
                        </div>

                        {editMode.address && (
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              name="city"
                              placeholder="City"
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                name="state"
                                placeholder="State"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.state}
                                onChange={handleInputChange}
                              />
                              <input
                                type="text"
                                name="zip"
                                placeholder="ZIP"
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.zip}
                                onChange={handleInputChange}
                              />
                            </div>
                            <input
                              type="text"
                              name="country"
                              placeholder="Country"
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              value={formData.country}
                              onChange={handleInputChange}
                            />
                          </div>
                        )}

                        {!editMode.address && (
                          <div className="text-sm text-muted-foreground">
                            {userData.city}, {userData.state} {userData.zip}
                            <br />
                            {userData.country}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Bio */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Bio</h3>
                      <p className="text-sm text-muted-foreground">
                        Tell others about yourself and your experience.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <textarea
                          name="bio"
                          rows={4}
                          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          value={editMode.bio ? formData.bio : userData.bio}
                          onChange={handleInputChange}
                          readOnly={!editMode.bio}
                        />
                        <div className="flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditToggle("bio")}
                          >
                            {editMode.bio ? (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save
                              </>
                            ) : (
                              <>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Language and Timezone */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Preferences</h3>
                      <p className="text-sm text-muted-foreground">
                        Set your language and timezone preferences.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium">
                            Language
                          </label>
                          <select
                            className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            defaultValue={userData.language}
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Portuguese</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium">
                            Timezone
                          </label>
                          <select
                            className="mt-1 w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            defaultValue={userData.timezone}
                          >
                            <option>(GMT-08:00) Pacific Time</option>
                            <option>(GMT-07:00) Mountain Time</option>
                            <option>(GMT-06:00) Central Time</option>
                            <option>(GMT-05:00) Eastern Time</option>
                            <option>(GMT+00:00) UTC</option>
                            <option>(GMT+01:00) Central European Time</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your password and security preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Change Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setShowPasswordDialog(true)}
                      >
                        Change Password
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Login Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage your active login sessions.
                      </p>
                      <div className="mt-2 rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">
                              Current Session
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Started: Today at 10:45 AM
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Location: San Francisco, CA
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Device: Chrome on macOS
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          >
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Account Activity</h3>
                      <p className="text-sm text-muted-foreground">
                        Recent security events for your account.
                      </p>
                      <div className="space-y-3">
                        {[
                          {
                            event: "Password changed",
                            date: "May 15, 2023",
                            location: "San Francisco, CA",
                          },
                          {
                            event: "New login",
                            date: "May 10, 2023",
                            location: "San Francisco, CA",
                          },
                          {
                            event: "Failed login attempt",
                            date: "May 5, 2023",
                            location: "New York, NY",
                          },
                        ].map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className="rounded-full bg-primary/10 p-1.5">
                              <Lock className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {activity.event}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {activity.date} • {activity.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Control how and when you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">
                            Email Notifications
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Receive booking and task notifications via email.
                          </p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={userData.notificationPreferences?.email}
                              onChange={() => handleNotificationToggle("email")}
                            />
                            <div className="h-5 w-9 rounded-full bg-muted peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                          </label>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">
                            Task Reminders
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Get reminders about upcoming and overdue tasks.
                          </p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={userData.notificationPreferences?.tasks}
                              onChange={() => handleNotificationToggle("tasks")}
                            />
                            <div className="h-5 w-9 rounded-full bg-muted peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                          </label>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">
                            Booking Notifications
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about new and updated
                            bookings.
                          </p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={
                                userData.notificationPreferences?.bookings
                              }
                              onChange={() =>
                                handleNotificationToggle("bookings")
                              }
                            />
                            <div className="h-5 w-9 rounded-full bg-muted peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                          </label>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">
                            Marketing Communications
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about new features and promotions.
                          </p>
                        </div>
                        <div className="ml-auto flex items-center space-x-2">
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={
                                userData.notificationPreferences?.marketing
                              }
                              onChange={() =>
                                handleNotificationToggle("marketing")
                              }
                            />
                            <div className="h-5 w-9 rounded-full bg-muted peer-checked:bg-primary after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Billing Information
                    </CardTitle>
                    <CardDescription>
                      Manage your subscription and payment methods.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border border-border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-medium">Current Plan</h3>
                          <p className="text-xl font-bold mt-1">Professional</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            $49.99/month • Renews on June 1, 2023
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Change Plan
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Payment Method</h3>
                      <div className="flex items-center space-x-4 rounded-lg border border-border p-4">
                        <div className="rounded-md bg-background p-2 shadow-sm">
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            •••• •••• •••• 4242
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/24
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          Edit
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Billing History</h3>
                      <div className="space-y-3">
                        {[
                          {
                            date: "May 1, 2023",
                            amount: "$49.99",
                            status: "Paid",
                          },
                          {
                            date: "April 1, 2023",
                            amount: "$49.99",
                            status: "Paid",
                          },
                          {
                            date: "March 1, 2023",
                            amount: "$49.99",
                            status: "Paid",
                          },
                        ].map((invoice, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border border-border p-3"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                Invoice #{2023050 + index}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {invoice.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {invoice.amount}
                              </p>
                              <Badge
                                variant="outline"
                                className="mt-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              >
                                {invoice.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 w-full"
                      >
                        View All Invoices
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Updated property details",
                      property: "Seaside Villa",
                      time: "Today at 10:45 AM",
                    },
                    {
                      action: "Added new booking",
                      property: "Mountain Cabin",
                      time: "Yesterday at 3:20 PM",
                    },
                    {
                      action: "Completed maintenance task",
                      property: "Downtown Apartment",
                      time: "May 10, 2023",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.property}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {passwordError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{passwordError}</AlertDescription>
              </Alert>
            )}
            {passwordSuccess && (
              <Alert className="mb-4 border-green-500 text-green-700 dark:text-green-400">
                <Check className="h-4 w-4" />
                <AlertDescription>
                  Password changed successfully!
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword.current ? "text" : "password"}
                  name="currentPassword"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPassword.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  name="newPassword"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPassword.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPassword.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(false)}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit} disabled={passwordSuccess}>
              <Save className="mr-2 h-4 w-4" />
              Save Password
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
