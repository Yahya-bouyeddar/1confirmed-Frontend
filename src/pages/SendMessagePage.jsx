// ✅ Updated SendMessagePage.jsx to support globalData and catchData

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
import { Eye, FileText, Send, Users } from "lucide-react";

const SendMessagePage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateVariables, setTemplateVariables] = useState({});
  const [globalData, setGlobalData] = useState({});
  const [catchData, setCatchData] = useState({});
  const [messagePreview, setMessagePreview] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };

    fetchClients();
    fetchUser();

    const storedTemplate = localStorage.getItem("selectedTemplate");
    if (storedTemplate) {
      const parsed = JSON.parse(storedTemplate);
      setSelectedTemplate(parsed);
      console.log({ selectedTemplate: parsed });

      const vars = {};
      parsed.variables?.forEach((v) => (vars[v] = ""));
      setTemplateVariables(vars);
      setGlobalData({});
      setCatchData({});
      updatePreview(parsed.content, vars);
      localStorage.removeItem("selectedTemplate");
    }
  }, []);

  const updatePreview = (content, vars, customText = customMessage) => {
    if (!content || typeof vars !== "object") return;
    let preview = content;
    Object.keys(vars).forEach((key) => {
      preview = preview.replace(
        new RegExp(`{{${key}}}`, "g"),
        vars[key] || `{{${key}}}`
      );
    });
    if (customText) preview += `\n\n${customText}`;
    setMessagePreview(preview);
  };

  const handleSend = async () => {
    const client = clients.find((c) => c.id.toString() === selectedClientId);
    if (!client || !selectedTemplate) return;

    const payload = {
      phone: client.phone,
      templateId: selectedTemplate.id,
      template_account_flow_id:
        selectedTemplate.template_account_flow_id || selectedTemplate.id,
      languageId: user?.languageId || 1,
      name: user?.agencyName || "Agence Immobilière",
      data: templateVariables,
      globalData,
      catchData,
    };

    try {
      setSending(true);
      await api.post("/messages", payload);
      alert("Message sent successfully!");
      navigate("/dashboard/messages");
    } catch (err) {
      console.error("Error sending message", err);
      alert("Error sending message");
    } finally {
      setSending(false);
    }
  };

  const handleCustomChange = (text) => {
    setCustomMessage(text);
    updatePreview(selectedTemplate?.content || "", templateVariables, text);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Send Message</h1>
        <p className="text-gray-400">
          Send WhatsApp messages to your clients using templates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Client selection */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2" /> Select Client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="text-gray-300">Client</Label>
              <Select
                value={selectedClientId}
                onValueChange={setSelectedClientId}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id.toString()}>
                      {client.name} - {client.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* <p>{selectedTemplate?.variables}</p> */}

          {/* Dynamic template fields */}
          {[
            {
              label: "Variables",
              source: selectedTemplate?.variables.map((v) => v?.name || "--"),
              state: templateVariables,
              setter: setTemplateVariables,
            },
            {
              label: "Global Variables",
              source: selectedTemplate?.global_variables?.map(
                (g) => g?.variable || "--"
              ),
              state: globalData,
              setter: setGlobalData,
            },
            {
              label: "Catch Data",
              source: selectedTemplate?.catch_data?.map((c) =>
                c.name.toLowerCase()
              ),
              state: catchData,
              setter: setCatchData,
            },
          ]
            .filter((g) => g.source?.length)
            .map((group, idx) => (
              <Card key={idx} className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2" /> {group.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.source.map((variable) => (
                    <div key={variable}>
                      <Label className="text-gray-300 capitalize">
                        {variable}
                      </Label>
                      <Input
                        value={group.state[variable] || ""}
                        onChange={(e) =>
                          group.setter({
                            ...group.state,
                            [variable]: e.target.value,
                          })
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">
                Custom Message (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Add a custom message or modify the template..."
                className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                value={customMessage}
                onChange={(e) => handleCustomChange(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Eye className="w-5 h-5 mr-2" /> Message Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-700 rounded-lg p-4 min-h-[200px]">
                {messagePreview ? (
                  <div className="text-white whitespace-pre-wrap">
                    {messagePreview}
                  </div>
                ) : (
                  <div className="text-gray-400 italic">
                    Select a template and fill variables to see preview
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Characters: {messagePreview.length}
                </span>
                <span className="text-gray-400">Estimated cost: 1 credit</span>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSend}
            disabled={sending || !selectedClientId || !selectedTemplate}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Send className="w-4 h-4 mr-2" />
            {sending ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendMessagePage;
