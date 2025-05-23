
import { Button } from "@/components/ui/button";
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
  CreditCard,
  Plus,
  TrendingDown,
  TrendingUp,
  MessageSquare,
  Calendar,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";

const CreditsPage = () => {
  const currentCredits = 7358;
  const monthlyUsage = 1247;
  const averageDaily = 42;

  const creditHistory = [
    {
      id: 1,
      type: "purchase",
      amount: 5000,
      description: "Professional Plan Credits",
      date: "2024-01-01",
      status: "completed",
      cost: "$79.00",
    },
    {
      id: 2,
      type: "usage",
      amount: -156,
      description: "WhatsApp messages sent",
      date: "2024-01-15",
      status: "completed",
      cost: null,
    },
    {
      id: 3,
      type: "usage",
      amount: -89,
      description: "WhatsApp messages sent",
      date: "2024-01-14",
      status: "completed",
      cost: null,
    },
    {
      id: 4,
      type: "usage",
      amount: -67,
      description: "WhatsApp messages sent",
      date: "2024-01-13",
      status: "completed",
      cost: null,
    },
    {
      id: 5,
      type: "purchase",
      amount: 1000,
      description: "Additional Credits",
      date: "2024-01-10",
      status: "completed",
      cost: "$29.00",
    },
  ];

  const creditPackages = [
    {
      name: "Starter Pack",
      credits: 1000,
      price: 29,
      popular: false,
      features: ["1,000 WhatsApp messages", "Basic support", "30-day validity"],
    },
    {
      name: "Professional Pack",
      credits: 5000,
      price: 79,
      popular: true,
      features: ["5,000 WhatsApp messages", "Priority support", "60-day validity", "10% bonus credits"],
    },
    {
      name: "Enterprise Pack",
      credits: 15000,
      price: 199,
      popular: false,
      features: ["15,000 WhatsApp messages", "24/7 support", "90-day validity", "20% bonus credits", "Dedicated manager"],
    },
  ];

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Credits</h1>
        <p className="text-gray-400">Manage your message credits and view usage history</p>
      </div>

      {/* Credits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Current Balance
            </CardTitle>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{currentCredits.toLocaleString()}</div>
            <p className="text-xs text-gray-400">credits available</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              This Month Usage
            </CardTitle>
            <TrendingDown className="h-5 w-5 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{monthlyUsage.toLocaleString()}</div>
            <p className="text-xs text-red-400">-24% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Daily Average
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{averageDaily}</div>
            <p className="text-xs text-green-400">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Buy Credits Section */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Buy More Credits</CardTitle>
          <p className="text-gray-400">Choose a credit package that fits your needs</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPackages.map((pkg, index) => (
              <div
                key={index}
                className={`relative rounded-lg border p-6 ${
                  pkg.popular
                    ? "border-purple-500 bg-gray-800"
                    : "border-gray-700 bg-gray-800/50"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">${pkg.price}</span>
                    <span className="text-gray-400 text-sm ml-1">USD</span>
                  </div>
                  <p className="text-purple-400 font-medium mb-6">
                    {pkg.credits.toLocaleString()} Credits
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    pkg.popular
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Purchase
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Projection */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Usage Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">At current usage rate:</span>
              <span className="text-white font-medium">~175 days remaining</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full" 
                style={{ width: '85%' }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>0 credits</span>
              <span>{currentCredits.toLocaleString()} credits</span>
            </div>
          </div>
        </CardContent>
      </Card>

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
                <TableHead className="text-gray-400">Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {creditHistory.map((transaction) => (
                <TableRow key={transaction.id} className="border-gray-700">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
                      <span className="text-white capitalize">{transaction.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-medium ${
                        transaction.amount > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="text-gray-300">
                    {transaction.cost || "-"}
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

export default CreditsPage;
