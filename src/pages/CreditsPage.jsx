import React, { useEffect, useState } from "react";
import api from "@/lib/api"; // Assure-toi que ce fichier gère bien le token
import {
Card,
CardHeader,
CardFooter,
CardContent,
CardTitle

} from "../components/ui/card"
import { Table,TableBody,TableHead,TableCaption, TableHeader, TableRow } from "../components/ui/table";
import { CreditCard, TrendingDown, TrendingUp } from "lucide-react";


// ... imports UI components comme avant ...

const CreditsPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    available: 0,
    totalUsed: 0,
    usedThisMonth: 0,
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resStats = await api.get("/credits");
        const resHistory = await api.get("/credits/history");
        
        setStats(resStats.data.data.credit);
        setHistory(resHistory.data);
      } catch (error) {
        console.error("Error loading credits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTransactionIcon = (type) => {
    return type === "purchase" ? (
      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
        <Plus className="w-4 h-4 text-green-400" />
      </div>
    ) : (
      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-blue-400" />
      </div>
    );
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Credits</h1>
        <p className="text-gray-400">Manage your message credits and view usage history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Current Balance</CardTitle>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.available?.toLocaleString()}</div>
            <p className="text-xs text-gray-400">{stats}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">This Month Usage</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.usedThisMonth?.toLocaleString()}</div>
            <p className="text-xs text-red-400">Compared to previous period</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Used</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{stats.totalUsed?.toLocaleString()}</div>
            <p className="text-xs text-green-400">Since registration</p>
          </CardContent>
        </Card>
      </div>

      {/* Credit History */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Credit History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-400">Type</TableHead>
                <TableHead className="text-gray-400">Description</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((tx) => (
                <TableRow key={tx.id} className="border-gray-700">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(tx.type)}
                      <span className="text-white capitalize">{tx.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{tx.description}</TableCell>
                  <TableCell className={tx.amount > 0 ? "text-green-400" : "text-red-400"}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-gray-300">{new Date(tx.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditsPage;
