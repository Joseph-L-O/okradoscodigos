import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FileText,
    Tag,
    BarChart,
    X,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import "../app/globals.css";
import { HomeIcon } from "@heroicons/react/24/solid";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [location, setLocation] = useState<Location | null>(null);

    useEffect(() => {
        setLocation(window.location);
    }, []);
    const navItems = [
        { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { title: "Posts", path: "/dashboard/posts", icon: FileText },
        { title: "Categories", path: "/dashboard/categories", icon: Tag },
        { title: "Analytics", path: "/dashboard/analytics", icon: BarChart },
        { title: "View Blog", path: "/", icon: HomeIcon },
    ];

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="h-[100%] flex bg-background">

            <aside
                className={`bg-[#073246]  md:static md:translate-x-0 h-[100vh] z-30 transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                style={{ width: "260px" }}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#acacac]">
                        <Link href="/" className=" text-[#d6d6d6] text-sidebar-foreground font-bold text-2xl">
                            ElegantBlog
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleSidebar}
                            className="md:hidden text-sidebar-foreground"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navItems.map((item) => {
                            const isActive = location?.pathname === item.path ||
                                (item.path !== "/dashboard" && location?.pathname.startsWith(item.path));

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center px-3 py-3 rounded-md transition-colors text-[#acacac] ${isActive
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="px-6 py-4 border-t border-sidebar-border">
                        <Link
                            href="/dashboard/logout"
                            className="flex text-[#acacac] items-center text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            <span>Sign Out</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default DashboardLayout;