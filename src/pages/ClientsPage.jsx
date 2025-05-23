import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Phone,
  Mail,
  Filter,
  Download,
} from "lucide-react";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  const [editingClient, setEditingClient] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleAddClient = async () => {
    try {
      const newClient = {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        propertyType,
        budget,
        status: "prospect",
        lastContact: new Date().toISOString().split("T")[0],
      };
      const res = await api.post("/clients", newClient);
      setClients([res.data, ...clients]);
      resetForm();
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to add client", err);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      setClients(clients.filter(client => client.id !== id));
    } catch (err) {
      console.error("Failed to delete client", err);
    }
  };

  const handleEditClient = (client) => {
    const [first, ...last] = client.name.split(" ");
    setFirstName(first);
    setLastName(last.join(" "));
    setEmail(client.email);
    setPhone(client.phone);
    setPropertyType(client.propertyType);
    setBudget(client.budget);
    setEditingClient(client);
    setDialogOpen(true);
  };

  const handleUpdateClient = async () => {
    try {
      const updatedClient = {
        name: `${firstName} ${lastName}`,
        phone,
        notes: budget,
      };
      const res = await api.put(`/clients/${editingClient.id}`, updatedClient);
      setClients(clients.map((c) => (c.id === res.data.id ? res.data : c)));
      resetForm();
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to update client", err);
    }
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPropertyType("");
    setBudget("");
    setEditingClient(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400";
      case "prospect": return "bg-blue-500/20 text-blue-400";
      case "inactive": return "bg-gray-500/20 text-gray-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name?.toLowerCase().includes(searchTerm.toLowerCase()) || client.email?.toLowerCase().includes(searchTerm.toLowerCase()) || client.phone?.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-gray-400">Manage your client database and relationships</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setDialogOpen(true); }} className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" /> {editingClient ? "Edit Client" : "Add Client"}
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader><DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-gray-700 border-gray-600" /></div>
                <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-gray-700 border-gray-600" /></div>
              </div>
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-700 border-gray-600" /></div>
              <div><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-gray-700 border-gray-600" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="propertyType">Property Type</Label><Select value={propertyType} onValueChange={setPropertyType}><SelectTrigger className="bg-gray-700 border-gray-600"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent className="bg-gray-700 border-gray-600"><SelectItem value="apartment">Apartment</SelectItem><SelectItem value="house">House</SelectItem><SelectItem value="condo">Condo</SelectItem><SelectItem value="townhouse">Townhouse</SelectItem></SelectContent></Select></div>
                <div><Label htmlFor="budget">Budget</Label><Input id="budget" placeholder="$0" value={budget} onChange={(e) => setBudget(e.target.value)} className="bg-gray-700 border-gray-600" /></div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="border-gray-600" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={editingClient ? handleUpdateClient : handleAddClient} className="bg-gradient-to-r from-purple-500 to-blue-500">{editingClient ? "Update" : "Add Client"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader><CardTitle className="text-white">Clients ({filteredClients.length})</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-white">Loading clients...</p> : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Property Type</TableHead>
                  <TableHead className="text-gray-400">Budget</TableHead>
                  <TableHead className="text-gray-400">Last Contact</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id} className="border-gray-700">
                    <TableCell className="text-white font-medium">{client.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-gray-300"><Mail className="w-3 h-3 mr-2" />{client.email}</div>
                        <div className="flex items-center text-gray-300"><Phone className="w-3 h-3 mr-2" />{client.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>{client.status ? client.status.charAt(0).toUpperCase() + client.status.slice(1) : 'N/A'}</span>
                    </TableCell>
                    <TableCell className="text-gray-300">{client.propertyType}</TableCell>
                    <TableCell className="text-gray-300">{client.budget}</TableCell>
                    <TableCell className="text-gray-300">{client.lastContact || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => handleEditClient(client)}><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-red-400" onClick={() => handleDeleteClient(client.id)}><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;
