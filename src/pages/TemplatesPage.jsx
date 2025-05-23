import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Eye,
  Globe,
  Filter,
  FileText,
  Tag,
} from "lucide-react";

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await api.get("/templates");
        setTemplates(res.data.data || res.data); // supporte les deux formats
      } catch (err) {
        console.error("Failed to fetch templates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const categories = [
    "All Categories",
    "Appointments",
    "Marketing",
    "Follow-up",
    "Onboarding",
    "Updates",
  ];
  const languages = [
    "All Languages",
    "English",
    "Spanish",
    "French",
    "Portuguese",
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Appointments: "bg-blue-500/20 text-blue-400",
      Marketing: "bg-green-500/20 text-green-400",
      "Follow-up": "bg-orange-500/20 text-orange-400",
      Onboarding: "bg-purple-500/20 text-purple-400",
      Updates: "bg-yellow-500/20 text-yellow-400",
    };
    return colors[category] || "bg-gray-500/20 text-gray-400";
  };

  const handleUseTemplate = (template) => {
    localStorage.setItem("selectedTemplate", JSON.stringify(template));
    navigate("/dashboard/send-message");
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage =
      filterLanguage === "all" || template.language === filterLanguage;
    const matchesCategory =
      filterCategory === "all" || template.category === filterCategory;
    return matchesSearch && matchesLanguage && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Templates</h1>
          <p className="text-gray-400">
            Create and manage your message templates
          </p>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48 bg-gray-700 border-gray-600">
                  <Tag className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Appointments">Appointments</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Onboarding">Onboarding</SelectItem>
                  <SelectItem value="Updates">Updates</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-white">Loading templates...</p>
      ) : filteredTemplates.length === 0 ? (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-lg mb-2">No templates found</h3>
            <p className="text-gray-400 mb-4">
              No templates match your current filters. Try adjusting your search
              criteria.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 transition-colors"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <CardTitle className="text-white text-lg">
                      {template.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}
                      >
                        {template.category}
                      </span>
                      <span className="flex items-center text-gray-400 text-xs">
                        <Globe className="w-3 h-3 mr-1" />
                        {template.language}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {template.content}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-400 text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      Variables:{" "}
                      {Array.isArray(template.variables)
                        ? template.variables
                            .map((v) =>
                              typeof v === "string"
                                ? v
                                : v.variable || v.name || "-"
                            )
                            .join(", ")
                        : "-"}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Used {template.usageCount || 0} times</span>
                      <span>Last used: {template.lastUsed || "-"}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => handleUseTemplate(template)}
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;
