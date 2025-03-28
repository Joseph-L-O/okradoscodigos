
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Legend
} from "recharts";
import {
  FileText,
  Tag,
  Eye,
  Users,
  TrendingUp,
  Plus
} from "lucide-react";
import "../../app/globals.css";
import DashboardLayout from "@/layouts/DashboardLayout";

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

const categoryData = [
  { name: "Technology", posts: 8 },
  { name: "Design", posts: 5 },
  { name: "Lifestyle", posts: 7 }
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalCategories: 0,
    totalSubscribers: 0
  });

  const [recentPosts, setRecentPosts] = useState<Array<{
    id: number;
    title: string;
    category: string;
    date: string;
    views: number;
  }>>([]);

  useEffect(() => {
    // In a real app, this would be API calls to fetch the dashboard data
    setStats({
      totalPosts: 20,
      totalViews: 38456,
      totalCategories: 3,
      totalSubscribers: 1267
    });

    setRecentPosts([
      {
        id: 1,
        title: "The Future of Web Development: Trends to Watch in 2023",
        category: "Technology",
        date: "May 15, 2023",
        views: 1502
      },
      {
        id: 2,
        title: "Minimalist Design Principles for Modern Interiors",
        category: "Design",
        date: "May 10, 2023",
        views: 843
      },
      {
        id: 3,
        title: "Digital Detox: How to Create Healthy Tech Boundaries",
        category: "Lifestyle",
        date: "May 5, 2023",
        views: 1247
      },
      {
        id: 4,
        title: "Building Scalable Web Applications with Modern Architecture",
        category: "Technology",
        date: "Apr 28, 2023",
        views: 987
      }
    ]);
  }, []);

  return (

    <div className="min-h-screen  max-h-[100vh] bg-gray-50 flex gap-3">
      <DashboardLayout />
      <div className="p-6 w-full">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 flex flex-row items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                <h3 className="text-2xl font-bold">{stats.totalPosts}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-row items-center space-x-4">
              <div className="bg-blue-500/10 p-3 rounded-full">
                <Eye className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <h3 className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-row items-center space-x-4">
              <div className="bg-orange-500/10 p-3 rounded-full">
                <Tag className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <h3 className="text-2xl font-bold">{stats.totalCategories}</h3>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex flex-row items-center space-x-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Subscribers</p>
                <h3 className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Blog Visits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={visitData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="visits" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                Posts by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categoryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="posts" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Posts</CardTitle>
            <Link href="/dashboard/posts/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPosts.map(post => (
                    <tr key={post.id} className="border-b hover:bg-muted/50">
                      <td className="py-3">
                        <Link href={`/dashboard/posts/edit/${post.id}`} className="text-primary hover:underline font-medium">
                          {post.title}
                        </Link>
                      </td>
                      <td className="py-3">{post.category}</td>
                      <td className="py-3">{post.date}</td>
                      <td className="py-3 text-right">{post.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/dashboard/posts" className="text-primary hover:underline text-sm mt-4 inline-block">
              View all posts
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;