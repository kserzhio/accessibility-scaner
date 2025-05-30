'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useClientProject } from 'context/ClientProjectContext';

const COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444"];

export default function ClientDashboard() {
  const { project, loading } = useClientProject();
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!project) return;
      try {
        const res = await fetch(`/api/client/projects/${project.projectId}/summary`);
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        console.error('Failed to load summary', err);
      }
    }

    load();
  }, [project]);

  if (loading || !summary) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Accessibility Audit Overview</h1>
          <p className="text-muted-foreground text-sm">
            Project: <strong className="text-black">ShopFlow Web</strong> — Status: <Badge>Active</Badge>
          </p>
        </div>
        <Button asChild>
          <Link href="/client/reports">
            Export Report <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium">
              Pages Checked: {summary.checkedPages} / {summary.totalPages}
            </div>
            <Progress value={summary.score} className="h-3" />
            <div className="flex gap-4 text-sm mt-2">
              <span className="text-green-600">✔ Passed</span>
              <span className="text-yellow-600">⚠ Issues</span>
              <span className="text-red-600">✖ Failed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={Object.entries(summary.issues).map(([name, value]) => ({ name, value }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {Object.entries(summary.issues).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fixes Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={summary.trend} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="fixed" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="new" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
