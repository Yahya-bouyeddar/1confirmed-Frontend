
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Shield, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const ChangePasswordPage = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordRequirements = [
    { text: "At least 8 characters", met: newPassword.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(newPassword) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(newPassword) },
    { text: "Contains number", met: /\d/.test(newPassword) },
    { text: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
  ];

  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const allRequirementsMet = passwordRequirements.every(req => req.met);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Change Password</h1>
        <p className="text-gray-400">Update your password to keep your account secure</p>
      </div>

      <div className="max-w-2xl">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Password Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-gray-300">
                Current Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-300">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-gray-300 font-medium">Password Requirements</h4>
              <div className="space-y-2">
                {passwordRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {requirement.met ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-500"></div>
                    )}
                    <span className={`text-sm ${requirement.met ? 'text-green-400' : 'text-gray-400'}`}>
                      {requirement.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

           <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 text-gray-400 hover:text-white"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {confirmPassword.length > 0 && (
                <div className="flex items-center space-x-2">
                  {passwordsMatch ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm ${passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                    {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                  </span>
                </div>
              )}
            </div>

            <Alert className="bg-blue-500/20 border-blue-500/50">
              <Shield className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                For your security, you'll need to log in again after changing your password.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" className="border-gray-600">
                Cancel
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                disabled={!currentPassword || !allRequirementsMet || !passwordsMatch}
              >
                Update Password
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                <span>Use a unique password that you don't use for other accounts</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                <span>Consider using a password manager to generate and store strong passwords</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                <span>Enable two-factor authentication for additional security</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2"></div>
                <span>Avoid using personal information like birthdays or names in your password</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
