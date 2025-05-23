
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Home, ArrowLeft, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <Card className="bg-gray-900 border-gray-800 max-w-2xl w-full">
        <CardContent className="text-center py-16 px-8">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <MessageSquare className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <h1 className="text-6xl font-bold text-white">404</h1>
            <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved, 
              deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
              
              <Button variant="outline" className="border-gray-600 text-gray-300" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="pt-4">
              <p className="text-gray-400 text-sm mb-2">Looking for something specific?</p>
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <Link to="/dashboard/clients" className="hover:text-white transition-colors">
                  Clients
                </Link>
                <span>•</span>
                <Link to="/dashboard/templates" className="hover:text-white transition-colors">
                  Templates
                </Link>
                <span>•</span>
                <Link to="/dashboard/messages" className="hover:text-white transition-colors">
                  Messages
                </Link>
                <span>•</span>
                <Link to="/dashboard/profile" className="hover:text-white transition-colors">
                  Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Search className="w-4 h-4" />
              <span className="text-sm">
                If you believe this is an error, please contact our support team
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
