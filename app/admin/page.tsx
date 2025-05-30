'use client';
import { Users, AlertTriangle, Clock } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectLineChart } from "components/charts/ProjectLineChart";
import { ProjectPieChart } from "components/charts/ProjectPieChart";


const MotionDiv = motion.div;

const mockLineChartData = [
  { url: "/home", date: "2025-05-01", compliance: 91 },
  { url: "/about", date: "2025-05-10", compliance: 82 },
  { url: "/contact", date: "2025-05-20", compliance: 95 },
];

const mockPieData = {
  CRITICAL: 8,
  SERIOUS: 14,
  MODERATE: 6,
  MINOR: 3,
};

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-12">
      {/* Section: Performance Overview */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground text-sm">Get a quick glance at system-wide accessibility health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Summary Card */}
        <MotionDiv layout className="lg:col-span-2">
          <Card className="rounded-2xl shadow-xl transition-shadow hover:shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Project Overview</h2>
                <Badge variant="outline">Updated just now</Badge>
              </div>
              <ProjectLineChart data={mockLineChartData} />
            </CardContent>
          </Card>
        </MotionDiv>

        {/* Impact Summary Pie Chart */}
        <MotionDiv layout>
          <Card className="rounded-2xl shadow-xl transition-shadow hover:shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Impact Distribution</h2>
              <ProjectPieChart data={mockPieData} />
            </CardContent>
          </Card>
        </MotionDiv>
      </div>

      {/* Section: Activity & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <MotionDiv layout className="lg:col-span-2">
          <Card className="rounded-2xl shadow-xl transition-shadow hover:shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Page scan completed for /pricing</span>
                  <span className="text-xs text-gray-500">2 min ago</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Users className="w-4 h-4" /> New user added to Project Alpha</span>
                  <span className="text-xs text-gray-500">10 min ago</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" /> Critical issue found on /checkout</span>
                  <span className="text-xs text-gray-500">30 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        {/* Quick Stats */}
        <MotionDiv layout>
          <Card className="rounded-2xl shadow-xl transition-shadow hover:shadow-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-center">
                  <p className="font-medium">Total Projects</p>
                  <p className="text-xl font-bold">12</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-center">
                  <p className="font-medium">Pages Scanned</p>
                  <p className="text-xl font-bold">128</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-center">
                  <p className="font-medium">Open Issues</p>
                  <p className="text-xl font-bold text-red-600">34</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 text-center">
                  <p className="font-medium">Fixed Issues</p>
                  <p className="text-xl font-bold text-green-600">94</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>
      </div>

      {/* Section: Role-based Views */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Role-Based Widgets Preview</h2>

        {/* Reviewer - Assigned Pages */}
        <Card className="rounded-2xl shadow hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Assigned Pages (Reviewer)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>/checkout</span>
                <Badge variant="destructive">3 issues</Badge>
              </li>
              <li className="flex justify-between">
                <span>/cart</span>
                <Badge variant="secondary">0 issues</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Team Lead - Activity */}
        <Card className="rounded-2xl shadow hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Team Activity (Team Lead)</h3>
            <div className="text-sm space-y-1">
              <p><strong>Maria</strong> reviewed 5 pages today</p>
              <p><strong>John</strong> fixed 3 issues on /profile</p>
              <p><strong>Anna</strong> assigned new audit</p>
            </div>
          </CardContent>
        </Card>

        {/* PM - Deadlines */}
        <Card className="rounded-2xl shadow hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project Deadlines (Project Manager)</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Project Alpha</span>
                <span className="text-red-600">Due: May 31</span>
              </li>
              <li className="flex justify-between">
                <span>Project Beta</span>
                <span className="text-green-600">Due: June 10</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}