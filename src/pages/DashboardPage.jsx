import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  FileText,
  CreditCard,
  TrendingUp,
  Send,
  Clock,
  CheckCircle,
} from "lucide-react";

const DashboardPage = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        // Adapter le format ici selon ce que retourne ton backend
        setStats([
          {
            title: "Total Clients",
            value: res.data.totalClients,
            icon: Users,
            change: "+12%",
            changeType: "increase",
          },
          {
            title: "Messages Sent",
            value: res.data.totalMessages,
            icon: MessageSquare,
            change: "+8%",
            changeType: "increase",
          },
          {
            title: "Templates",
            value: res.data.totalTemplates,
            icon: FileText,
            change: "+3",
            changeType: "increase",
          },
          {
            title: "Credits Remaining",
            value: res.data.totalCredits,
            icon: CreditCard,
            change: "-24%",
            changeType: "decrease",
          },
        ]);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const recentMessages = [/* même contenu statique que plus haut */];
  const quickActions = [/* même contenu statique que plus haut */];

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening with your account.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
                <Icon className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions (inchangé) */}
      {/* Recent Messages + Performance (inchangé) */}
      {/* ... copie ici ton code statique comme tu as déjà fourni ... */}
    </div>
  );
};

export default DashboardPage;
