import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import "../../../app/globals.css";
import DashboardLayout from "@/layouts/DashboardLayout";
import AuthGuard from "@/components/AuthGuard";

// Mock data for charts
const visitData = [
  { name: "Jan", visits: 1200 },
  { name: "Feb", visits: 1900 },
  { name: "Mar", visits: 3000 },
  { name: "Apr", visits: 2780 },
  { name: "May", visits: 4890 },
  { name: "Jun", visits: 3390 },
  { name: "Jul", visits: 3490 }
];

const weeklyData = [
  { name: "Mon", visits: 340 },
  { name: "Tue", visits: 428 },
  { name: "Wed", visits: 492 },
  { name: "Thu", visits: 380 },
  { name: "Fri", visits: 312 },
  { name: "Sat", visits: 248 },
  { name: "Sun", visits: 210 }
];

const categoryData = [
  { name: "Technology", posts: 8, views: 12500 },
  { name: "Design", posts: 5, views: 9800 },
  { name: "Lifestyle", posts: 7, views: 16100 }
];

const popularPosts = [
  { name: "The Future of Web Development", views: 4890 },
  { name: "Digital Detox Guide", views: 3640 },
  { name: "Minimalist Design Principles", views: 2970 },
  { name: "Scalable Web Applications", views: 2450 },
  { name: "Psychology of Color in UI", views: 1980 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Analytics = () => {
  return (
    <AuthGuard requireAuth={true}>
      <div className="flex min-h-screen bg-gray-100">
        <DashboardLayout />
        <div className="container mx-auto p-4 max-h-screen overflow-y-auto">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            <p className="text-muted-foreground">View statistics and insights for your blog.</p>
          </div>

          <div className="flex justify-between items-center">
            <Tabs defaultValue="traffic" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="traffic">Traffic</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                </TabsList>

                <Select defaultValue="30days">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="year">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="traffic" className="space-y-6">
                {/* Page Views Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Page Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={visitData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="visits"
                            stroke="#0ea5e9"
                            fill="#0ea5e9"
                            fillOpacity={0.2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Traffic Sources & Daily Patterns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Search', value: 45 },
                                { name: 'Social', value: 30 },
                                { name: 'Direct', value: 15 },
                                { name: 'Referral', value: 10 }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {[
                                { name: 'Search', value: 45 },
                                { name: 'Social', value: 30 },
                                { name: 'Direct', value: 15 },
                                { name: 'Referral', value: 10 }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Traffic Pattern</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={weeklyData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="visits" fill="#0ea5e9" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                {/* Posts by Category */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content Performance by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={categoryData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="posts" fill="#8884d8" name="Posts" />
                          <Bar yAxisId="right" dataKey="views" fill="#82ca9d" name="Views" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Posts */}
                <Card>
                  <CardHeader>
                    <CardTitle>Most Popular Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={popularPosts}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={150} />
                          <Tooltip />
                          <Bar dataKey="views" fill="#0f172a" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-6">
                {/* Engagement Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Average Time on Page</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold">3:24</div>
                        <div className="text-sm text-green-500 flex items-center">
                          +12.5%
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Bounce Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold">42.3%</div>
                        <div className="text-sm text-red-500 flex items-center">
                          +2.1%
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium">Pages Per Session</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold">1.8</div>
                        <div className="text-sm text-green-500 flex items-center">
                          +5.3%
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">vs. previous period</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Comments & Social Shares */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Comments Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={[
                              { name: "Jan", comments: 25 },
                              { name: "Feb", comments: 38 },
                              { name: "Mar", comments: 42 },
                              { name: "Apr", comments: 37 },
                              { name: "May", comments: 65 },
                              { name: "Jun", comments: 57 },
                              { name: "Jul", comments: 78 }
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="comments"
                              stroke="#8884d8"
                              fill="#8884d8"
                              fillOpacity={0.2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Social Shares by Platform</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Twitter', value: 45 },
                                { name: 'Facebook', value: 25 },
                                { name: 'LinkedIn', value: 20 },
                                { name: 'Pinterest', value: 10 }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {[
                                { name: 'Twitter', value: 45 },
                                { name: 'Facebook', value: 25 },
                                { name: 'LinkedIn', value: 20 },
                                { name: 'Pinterest', value: 10 }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Analytics;