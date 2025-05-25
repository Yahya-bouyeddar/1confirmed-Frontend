// ✅ Nouveau fichier TemplatesPage.jsx (corrigé et amélioré)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  FileText,
  Tag,
  Search,
  Globe,
  Copy,
  Edit,
  Trash2,
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

        setTemplates(res.data.data || res.data);
      } catch (err) {
        console.error("Failed to fetch templates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleUseTemplate = (template) => {
    const templateWithFlowId = {
      ...template,
      template_account_flow_id:
        template.template_account_flow_id || template.id,
    };
    localStorage.setItem(
      "selectedTemplate",
      JSON.stringify(templateWithFlowId)
    );
    navigate("/send-message");
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
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
            Select and use pre-defined WhatsApp templates
          </p>
        </div>
      </div>

      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-white">Loading templates...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">
                  {template.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {template.variables?.length > 0 && (
                    <div className="text-sm text-gray-300">
                      <strong>Variables:</strong>
                      <ul className="list-disc ml-5">
                        {template.variables.map((v, idx) => (
                          <li key={idx}>{v.variable || v.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {template.global_variables?.length > 0 && (
                    <div className="text-sm text-gray-300">
                      <strong>Global variables:</strong>
                      <ul className="list-disc ml-5">
                        {template.global_variables.map((v, idx) => (
                          <li key={idx}>
                            {v.name} ({v.variable})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {template.catch_data?.length > 0 && (
                    <div className="text-sm text-gray-300">
                      <strong>Client answers:</strong>
                      <ul className="list-disc ml-5">
                        {template.catch_data.map((v, idx) => (
                          <li key={idx}>{v.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    onClick={() => handleUseTemplate(template)}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
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
