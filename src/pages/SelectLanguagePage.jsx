import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, ArrowRight, Check } from "lucide-react";

const SelectLanguagePage = () => {
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await api.get("/languages");
        setLanguages(res.data.data);

        const userRes = await api.get("/auth/me");
        if (userRes.data.languageId) {
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Erreur chargement langues:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLanguages();
  }, [navigate]);

  const handleContinue = async () => {
    try {
      await api.put("/languages/select", {
        languageId: selectedLanguage,
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Erreur mise à jour langue:", err);
      alert("Une erreur est survenue lors de la sauvegarde de la langue.");
    }
  };

  if (loading) return <p className="text-white text-center">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl text-white mb-2">Choose Your Language</CardTitle>
            <p className="text-gray-400 text-lg">
              Select your preferred language to personalize ImmoConnect
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <Card
                  key={lang.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedLanguage === lang.id
                      ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500"
                      : "bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedLanguage(lang.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{lang.language}</h3>
                      </div>
                      {selectedLanguage === lang.id && (
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{lang.flag}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleContinue}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                disabled={!selectedLanguage}
              >
                Continue to Dashboard
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SelectLanguagePage;
