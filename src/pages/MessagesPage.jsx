
import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";

const MessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("all");

  const messages = [
    {
      id: 1,
      recipient: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      template: "Property Visit Reminder",
      content: "Hi Sarah, this is a reminder about your property visit tomorrow at 2:00 PM for 123 Main St. Please let me know if you need to reschedule.",
      status: "delivered",
      sentAt: "2024-01-15 14:30",
      deliveredAt: "2024-01-15 14:31",
      readAt: "2024-01-15 14:45",
      cost: 1,
    },
    {
      id: 2,
      recipient: "Michael Chen",
      phone: "+1 (555) 234-5678",
      template: "New Listing Alert",
      content: "Hello Michael, I have a new property that matches your criteria! 3BR House in Downtown for $750,000. Would you like to schedule a viewing?",
      status: "read",
      sentAt: "2024-01-15 13:15",
      deliveredAt: "2024-01-15 13:16",
      readAt: "2024-01-15 13:20",
      cost: 1,
    },
    {
      id: 3,
      recipient: "Emma Williams",
      phone: "+1 (555) 345-6789",
      template: "Contract Follow-up",
      content: "Hi Emma, I wanted to follow up on the contract for 456 Oak Ave. Please review and let me know if you have any questions.",
      status: "pending",
      sentAt: "2024-01-15 12:00",
      deliveredAt: null,
      readAt: null,
      cost: 1,
    },
    {
      id: 4,
      recipient: "David Brown",
      phone: "+1 (555) 456-7890",
      template: "Welcome Message",
      content: "Hi David, welcome to Elite Properties! I'm here to help you find the perfect property. When can we schedule a meeting?",
      status: "failed",
      sentAt: "2024-01-15 11:30",
      deliveredAt: null,
      readAt: null,
      cost: 0,
    },
    {
      id: 5,
      recipient: "Lisa Anderson",
      phone: "+1 (555) 567-8901",
      template: "Price Update",
      content: "Hi Lisa, there's been a price update for the property at 789 Pine St. The new price is $280,000. Would you like to discuss this?",
      status: "delivered",
      sentAt: "2024-01-15 10:15",
      deliveredAt: "2024-01-15 10:16",
      readAt: null,
      cost: 1,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "read":
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-400";
      case "read":
        return "bg-blue-500/20 text-blue-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "failed":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearch = message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || message.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      title: "Total Messages",
      value: messages.length.toString(),
      icon: MessageSquare,
      color: "text-blue-400",
    },
    {
      title: "Delivered",
      value: messages.filter(m => m.status === "delivered" || m.status === "read").length.toString(),
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      title: "Pending",
      value: messages.filter(m => m.status === "pending").length.toString(),
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      title: "Failed",
      value: messages.filter(m => m.status === "failed").length.toString(),
      icon: XCircle,
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-gray-400">View and manage your sent WhatsApp messages</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterDate} onValueChange={setFilterDate}>
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="border-gray-600">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">
            Messages History ({filteredMessages.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-400">Recipient</TableHead>
                <TableHead className="text-gray-400">Template</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400">Sent At</TableHead>
                <TableHead className="text-gray-400">Cost</TableHead>
                <TableHead className="text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id} className="border-gray-700">
                  <TableCell>
                    <div>
                      <p className="text-white font-medium">{message.recipient}</p>
                      <p className="text-gray-400 text-sm">{message.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{message.template}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(message.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-gray-300">{message.sentAt}</p>
                      {message.deliveredAt && (
                        <p className="text-gray-500 text-xs">Delivered: {message.deliveredAt}</p>
                      )}
                      {message.readAt && (
                        <p className="text-gray-500 text-xs">Read: {message.readAt}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{message.cost} credit</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesPage;
