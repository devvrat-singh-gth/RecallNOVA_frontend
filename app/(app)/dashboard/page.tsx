"use client";

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { getDashboardStats } from "@/lib/api";
import CountUp from "@/components/CountUp";
export default function DashboardPage() {
const { theme } = useTheme();
const chartColors = {
  light: "#111111",
  dark: "#a3e635",
  mint: "#00b894",
  neon: "#39ff14"
};
  const [stats,setStats] = useState({
    documents:0,
    flashcards:0,
    quiz_questions:0,
    accuracy:0,
    progress:0
  });
  
  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  return (

<div
  className="
    max-w-7xl
    mx-auto
    p-6

    h-full
    overflow-y-auto

    pb-32
  "
>
      {/* HERO */}

   <div className="
glass-card
p-8
mb-8
">
        <h1 className="
        text-5xl
        font-black
        ">
          Learning Analytics
        </h1>

        <p className="
        opacity-70
        mt-3
        ">
          Monitor documents,
          flashcards,
          quizzes,
          and learning growth.
        </p>

      </div>

      {/* MAIN GRID */}

      <div className="
      grid
      grid-cols-1
      lg:grid-cols-3
      gap-6
      ">

        {/* PROGRESS */}

        <div className="
        glass-card p-6
        lg:col-span-1
        ">

          <h2 className="
          font-bold
          mb-4
          ">
            Learning Progress
          </h2>

          <ResponsiveContainer
            width="100%"
            height={220}
          >

       <RadialBarChart
  innerRadius="72%"
  outerRadius="100%"
  startAngle={90}
  endAngle={-270}
  data={[
    {
      value: stats.progress
    }
  ]}
>

       <RadialBar
  background
  dataKey="value"
  fill={chartColors[theme]}
  cornerRadius={30}
/>

            </RadialBarChart>

          </ResponsiveContainer>

          <div className="
          text-center
          text-5xl
          font-black
          ">
<CountUp
  end={stats.progress}
  suffix="%"
/>          </div>

        </div>

        {/* KPI GRID */}

        <div className="
        lg:col-span-2
        grid
        md:grid-cols-2
        gap-6
        ">

          <div className="glass-card p-6">

            <div className="opacity-60">
              Documents
            </div>

            <div className="
            text-5xl
            font-black
            mt-4
            ">
<CountUp end={stats.documents} duration={800} />
            </div>

          </div>

          <div className="glass-card p-6">

            <div className="opacity-60">
              Flashcards
            </div>

            <div className="
            text-5xl
            font-black
            mt-4
            ">
<CountUp end={stats.flashcards} duration={1200} />
            </div>

          </div>

          <div className="glass-card p-6">

            <div className="opacity-60">
              Quiz Questions
            </div>

            <div className="
            text-5xl
            font-black
            mt-4
            ">
<CountUp end={stats.quiz_questions} duration={1600} />
            </div>

          </div>

          <div className="glass-card p-6">

            <div className="opacity-60">
              Accuracy
            </div>

            <div className="
            text-5xl
            font-black
            mt-4
            ">
<CountUp end={Math.round(stats.accuracy)} duration={2000} suffix="%" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}