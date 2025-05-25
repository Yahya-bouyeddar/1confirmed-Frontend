import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  Shield,
  Camera,
  Save,
  Loader,
  LoaderCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useLanguages from "../hooks/useLanguages";
import { useState } from "react";
import api from "../lib/api";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState(user);
  const [isUpdatePending, setUpdatePending] = useState(false);

  const { data: languages, isLoading } = useLanguages();

  if (isLoading) {
    return <div className="text-white">Loading languages...</div>;
  }

  const handleChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      setUpdatePending(true);
      await api.post(`/users/${user.id}`, profile);
      updateUser(profile);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
    setUpdatePending(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-gray-700 hover:bg-gray-600"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-white font-medium">{user.agencyName}</h3>
              <p className="text-gray-400 text-sm">Real Estate Agent</p>
            </div>
            <Button variant="outline" className="border-gray-600">
              Change Picture
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agencyName" className="text-gray-300">
                    Agency Name
                  </Label>
                  <Input
                    id="agencyName"
                    onChange={(e) => handleChange("agencyName", e.target.value)}
                    defaultValue={user.agencyName}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                {/* <div>
                  <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue="Doe"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div> */}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    onChange={(e) => handleChange("email", e.target.value)}
                    defaultValue={user.email}
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Experienced real estate agent with over 10 years in the industry. Specializing in residential properties and client satisfaction."
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label
                  htmlFor="language"
                  className="text-gray-300 mb-2 inline-block"
                >
                  Language
                </Label>
                <Select
                  defaultValue={user.languageId}
                  onValueChange={(value) => handleChange("languageId", value)}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {languages.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          {/* <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            
            {/* <div>
              <Label htmlFor="timezone" className="text-gray-300">Timezone</Label>
              <Select defaultValue="est">
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="est">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="cst">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="mst">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="pst">Pacific Time (UTC-8)</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

          {/* <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300">Two-Factor Authentication</p>
                <p className="text-gray-500 text-sm">Add an extra layer of security</p>
              </div>
              <Switch />
            </div> */}

          {/* <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300">Login Notifications</p>
                <p className="text-gray-500 text-sm">Get notified of new logins</p>
              </div>
              <Switch defaultChecked />
            </div> */}
          {/* </CardContent> */}
          {/* </Card>  */}

          {/* <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company" className="text-gray-300">Company Name</Label>
                <Input
                  id="company"
                  defaultValue="Elite Properties"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="position" className="text-gray-300">Position</Label>
                <Input
                  id="position"
                  defaultValue="Senior Real Estate Agent"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="address" className="text-gray-300">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="address"
                    defaultValue="123 Business District, New York, NY 10001"
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="website" className="text-gray-300">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="website"
                    defaultValue="https://eliteproperties.com"
                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300">Email Notifications</p>
                <p className="text-gray-500 text-sm">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300">SMS Notifications</p>
                <p className="text-gray-500 text-sm">Receive notifications via SMS</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300">Message Delivery Reports</p>
                <p className="text-gray-500 text-sm">Get notified when messages are delivered</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300">Weekly Reports</p>
                <p className="text-gray-500 text-sm">Receive weekly usage reports</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card> */}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={saveProfile}
          disabled={isUpdatePending}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          {isUpdatePending ? (
            <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
