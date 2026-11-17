
"use client";

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { getDashboardStats } from "@/lib/api";
import CountUp from "@/components/CountUp";

type DocumentStat = {
  id: string;
  name: string;
  flashcards: number;
  quiz_questions: number;
  score: number | null;
};

type DashboardStats = {
  documents: number;
  flashcards: number;
  quiz_questions: number;
  accuracy: number;
  assessed_documents: number;
  document_breakdown: DocumentStat[];
};

const INITIAL_STATS: DashboardStats = {
  documents: 0,
  flashcards: 0,
  quiz_questions: 0,
  accuracy: 0,
  assessed_documents: 0,
  document_breakdown: [],
};

const MATERIAL_COLORS = ["#a3e635", "#45b99a"];

export default function DashboardPage() {
  const { theme } = useTheme();

  const [stats, setStats] =
    useState<DashboardStats>(INITIAL_STATS);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  const chartColors: Record<string, string> = {
    light: "#202020",
    dark: "#a3e635",
    mint: "#009b7b",
    neon: "#39e62a",
  };

  const chartColor = chartColors[theme] ?? chartColors.dark;

  useEffect(() => {
    let active = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getDashboardStats();

        if (!active) return;

        setStats({
          documents: Number(data.documents) || 0,
          flashcards: Number(data.flashcards) || 0,
          quiz_questions: Number(data.quiz_questions) || 0,
          accuracy: Math.min(
            100,
            Math.max(0, Number(data.accuracy) || 0)
          ),
          assessed_documents:
            Number(data.assessed_documents) || 0,
          document_breakdown: Array.isArray(
            data.document_breakdown
          )
            ? data.document_breakdown.map((document: DocumentStat) => ({
                id: String(document.id),
                name: document.name || "Untitled document",
                flashcards: Number(document.flashcards) || 0,
                quiz_questions:
                  Number(document.quiz_questions) || 0,
                score:
                  typeof document.score === "number" &&
                  Number.isFinite(document.score)
                    ? Math.min(100, Math.max(0, document.score))
                    : null,
              }))
            : [],
        });
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load dashboard data."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      active = false;
    };
  }, [retryKey]);

  const documents = stats.document_breakdown;

  const materialData = useMemo(
    () => [
      {
        name: "Flashcards",
        value: stats.flashcards,
      },
      {
        name: "Quiz questions",
        value: stats.quiz_questions,
      },
    ],
    [stats.flashcards, stats.quiz_questions]
  );

  const documentChartData = useMemo(
    () =>
      documents.map((document) => ({
        name: document.name,
        flashcards: document.flashcards,
        quiz_questions: document.quiz_questions,
      })),
    [documents]
  );

  const metricCards = [
    {
      label: "Documents",
      value: stats.documents,
      description: "Uploaded to your workspace",
      accent: "#a3e635",
    },
    {
      label: "Flashcards",
      value: stats.flashcards,
      description: "Generated learning cards",
      accent: "#45b99a",
    },
    {
      label: "Quiz Questions",
      value: stats.quiz_questions,
      description: "Generated questions",
      accent: "#60a5fa",
    },
    {
      label: "Documents Assessed",
      value: stats.assessed_documents,
      description: "With saved quiz results",
      accent: "#c084fc",
    },
  ];

  const hasMaterials =
    stats.flashcards + stats.quiz_questions > 0;

  const hasDocumentScores = documents.some(
    (document) => document.score !== null
  );

  const chartTooltipStyle = {
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    color: "var(--text)",
    fontSize: "12px",
    padding: "10px 12px",
  };

  return (
    <main
      className="
        mx-auto h-full min-h-0 w-full min-w-0
        max-w-[1600px] overflow-x-hidden
        overflow-y-auto overscroll-contain
        px-4 py-5 pb-28
        sm:px-6 sm:py-7
        lg:px-8 lg:py-8
      "
    >
      {/* HEADER */}
      <section
        className="
          glass-card relative mb-6 overflow-hidden
          p-5 sm:p-7 lg:p-9
        "
      >
        <div
          className="
            pointer-events-none absolute -right-16
            -top-24 h-64 w-64 rounded-full
            opacity-[0.09] blur-3xl
          "
          style={{ background: chartColor }}
        />

        <div className="relative z-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className="
                h-2 w-2 rounded-full
              "
              style={{ background: chartColor }}
            />

            <p
              className="
                text-[10px] font-bold uppercase
                tracking-[0.2em] opacity-55
              "
            >
              Your learning overview
            </p>
          </div>

          <h1
            className="
              text-[clamp(2rem,4vw,3.25rem)]
              font-black tracking-tight
            "
          >
            Learning Analytics
          </h1>

          <p
            className="
              mt-3 max-w-2xl text-sm
              leading-6 opacity-60 sm:text-base
            "
          >
            Understand your learning activity, explore
            generated materials and track your saved
            quiz performance.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div
              className="
                rounded-xl border px-4 py-2.5
              "
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-[10px] uppercase tracking-wider opacity-50">
                Your documents
              </p>

              <p className="mt-1 text-xl font-bold">
                {loading ? "—" : stats.documents}
              </p>
            </div>

            <div
              className="
                rounded-xl border px-4 py-2.5
              "
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-[10px] uppercase tracking-wider opacity-50">
                Average quiz score
              </p>

              <p className="mt-1 text-xl font-bold">
                {loading ? "—" : `${Math.round(stats.accuracy)}%`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <section
          role="alert"
          className="
            glass-card mb-6 flex flex-col gap-3
            p-4 sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <div>
            <p className="text-sm font-semibold">
              Dashboard couldn't be loaded
            </p>
            <p className="mt-1 text-xs opacity-60">
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRetryKey((value) => value + 1)}
            className="
              w-fit rounded-xl px-4 py-2.5
              text-sm font-semibold transition
              hover:opacity-80
            "
            style={{
              background: "var(--primary)",
              color: "var(--bg)",
            }}
          >
            Try again
          </button>
        </section>
      )}

      {/* KPI CARDS */}
      <section className="mb-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] opacity-45">
              At a glance
            </p>
            <h2 className="mt-1 text-lg font-bold">
              Workspace statistics
            </h2>
          </div>

          <span className="text-[10px] opacity-45">
            {loading ? "Updating..." : "Current totals"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metricCards.map((metric) => (
            <article
              key={metric.label}
              className="
                glass-card group relative
                flex min-h-[145px] min-w-0
                flex-col justify-between overflow-hidden
                p-5 transition duration-300
                hover:-translate-y-1
              "
            >
              <div
                className="
                  absolute right-0 top-0 h-24 w-24
                  rounded-full opacity-[0.07] blur-2xl
                  transition group-hover:opacity-[0.13]
                "
                style={{ background: metric.accent }}
              />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: metric.accent }}
                  />

                  <p className="text-sm font-semibold opacity-70">
                    {metric.label}
                  </p>
                </div>

                <p className="mt-1 text-xs opacity-45">
                  {metric.description}
                </p>
              </div>

              <div className="relative mt-5 text-4xl font-black tracking-tight sm:text-[2.7rem]">
                {loading ? (
                  <span className="opacity-30">—</span>
                ) : (
                  <CountUp
                    end={metric.value}
                    duration={900}
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PERFORMANCE + MATERIAL DISTRIBUTION */}
      <section className="mb-7 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-5">
        {/* QUIZ SCORE */}
        <article className="glass-card min-w-0 p-5 sm:p-6 xl:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.17em] opacity-45">
                Performance
              </p>
              <h2 className="mt-1 text-lg font-bold">
                Average Quiz Score
              </h2>
              <p className="mt-1 text-xs opacity-50">
                Latest saved score per document
              </p>
            </div>

            <span
              className="
                rounded-full border px-3 py-1
                text-[10px] font-semibold
              "
              style={{
                borderColor: "var(--border)",
                color: chartColor,
              }}
            >
              {stats.assessed_documents} assessed
            </span>
          </div>

          <div className="relative mx-auto mt-5 h-[230px] w-full max-w-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="77%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
                data={[
                  {
                    value: loading ? 0 : stats.accuracy,
                  },
                ]}
              >
                <RadialBar
                  dataKey="value"
                  background={{ fill: "var(--border)" }}
                  fill={chartColor}
                  cornerRadius={30}
                  isAnimationActive={!loading}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-black tracking-tight">
                {loading ? (
                  "—"
                ) : (
                  <CountUp
                    end={Math.round(stats.accuracy)}
                    duration={1000}
                    suffix="%"
                  />
                )}
              </p>

              <p className="mt-1 text-[11px] opacity-50">
                Average score
              </p>
            </div>
          </div>

          <div
            className="
              mt-3 rounded-xl border p-3
              text-center
            "
            style={{ borderColor: "var(--border)" }}
          >
            <p className="text-xs opacity-60">
              {loading
                ? "Loading performance data..."
                : stats.assessed_documents === 0
                  ? "Save a quiz result to start tracking your performance."
                  : `Calculated from ${stats.assessed_documents} document${stats.assessed_documents === 1 ? "" : "s"} with saved results.`}
            </p>
          </div>
        </article>

        {/* MATERIAL DISTRIBUTION */}
        <article className="glass-card min-w-0 p-5 sm:p-6 xl:col-span-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] opacity-45">
              Content generation
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Learning Materials
            </h2>

            <p className="mt-1 text-xs opacity-50">
              Distribution of generated study resources
            </p>
          </div>

          {loading ? (
            <div className="flex h-[250px] items-center justify-center text-sm opacity-40">
              Loading material statistics...
            </div>
          ) : hasMaterials ? (
            <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
              <div className="relative mx-auto h-[220px] w-full max-w-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={materialData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="65%"
                      outerRadius="90%"
                      paddingAngle={4}
                      stroke="none"
                    >
                      {materialData.map((item, index) => (
                        <Cell
                          key={item.name}
                          fill={MATERIAL_COLORS[index]}
                        />
                      ))}
                    </Pie>

                    <Tooltip contentStyle={chartTooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-black">
                    {stats.flashcards + stats.quiz_questions}
                  </p>
                  <p className="text-[10px] opacity-50">
                    Total generated
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {materialData.map((item, index) => {
                  const total =
                    stats.flashcards + stats.quiz_questions;

                  const percentage =
                    total > 0
                      ? Math.round((item.value / total) * 100)
                      : 0;

                  return (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              background: MATERIAL_COLORS[index],
                            }}
                          />
                          <span className="text-sm font-medium opacity-75">
                            {item.name}
                          </span>
                        </div>

                        <span className="text-sm font-bold">
                          {item.value}
                        </span>
                      </div>

                      <div
                        className="
                          h-2 overflow-hidden rounded-full
                        "
                        style={{ background: "var(--border)" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${percentage}%`,
                            background: MATERIAL_COLORS[index],
                          }}
                        />
                      </div>

                      <p className="mt-1 text-[10px] opacity-40">
                        {percentage}% of generated materials
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex min-h-[230px] flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold opacity-65">
                No learning materials yet
              </p>
              <p className="mt-2 max-w-xs text-xs leading-5 opacity-45">
                Generate flashcards or quiz questions from
                your documents to see their distribution here.
              </p>
            </div>
          )}
        </article>
      </section>

      {/* DOCUMENT MATERIAL COMPARISON */}
      <section className="glass-card mb-7 min-w-0 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] opacity-45">
              Document insights
            </p>

            <h2 className="mt-1 text-lg font-bold">
              Learning Materials by Document
            </h2>

            <p className="mt-1 text-xs opacity-50">
              Compare generated flashcards and quiz questions
              across your uploaded documents.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-2 text-[11px] opacity-65">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: MATERIAL_COLORS[0] }}
              />
              Flashcards
            </span>

            <span className="flex items-center gap-2 text-[11px] opacity-65">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: MATERIAL_COLORS[1] }}
              />
              Quiz questions
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex h-[240px] items-center justify-center text-sm opacity-40">
            Loading document data...
          </div>
        ) : documents.length > 0 ? (
          <div
            className="mt-5 w-full min-w-0"
            style={{
              height: Math.max(
                240,
                Math.min(documents.length * 65, 520)
              ),
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={documentChartData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 15,
                  left: 5,
                  bottom: 5,
                }}
                barGap={5}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  horizontal={false}
                />

                <XAxis
                  type="number"
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--text)", fontSize: 10 }}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={105}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--text)",
                    fontSize: 10,
                  }}
                  tickFormatter={(value: string) =>
                    value.length > 17
                      ? `${value.slice(0, 15)}…`
                      : value
                  }
                />

                <Tooltip
                  contentStyle={chartTooltipStyle}
                  cursor={{ fill: "var(--border)", opacity: 0.25 }}
                />

                <Bar
                  dataKey="flashcards"
                  name="Flashcards"
                  fill={MATERIAL_COLORS[0]}
                  radius={[0, 5, 5, 0]}
                  maxBarSize={15}
                />

                <Bar
                  dataKey="quiz_questions"
                  name="Quiz questions"
                  fill={MATERIAL_COLORS[1]}
                  radius={[0, 5, 5, 0]}
                  maxBarSize={15}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold opacity-65">
              No documents to compare
            </p>
            <p className="mt-2 text-xs opacity-45">
              Upload a document to start building your learning analytics.
            </p>
          </div>
        )}
      </section>

      {/* DOCUMENT PERFORMANCE */}
      <section className="mb-7">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.17em] opacity-45">
            Individual progress
          </p>

          <h2 className="mt-1 text-lg font-bold">
            Document Performance
          </h2>

          <p className="mt-1 text-xs opacity-50">
            Explore your saved quiz results and generated resources
            for each document.
          </p>
        </div>

        {loading ? (
          <div className="glass-card flex min-h-[150px] items-center justify-center text-sm opacity-40">
            Loading document performance...
          </div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {documents.map((document) => (
              <article
                key={document.id}
                className="
                  glass-card min-w-0 overflow-hidden
                  p-5 transition duration-300
                  hover:-translate-y-0.5
                "
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl text-lg
                    "
                    style={{
                      background: "var(--border)",
                    }}
                  >
                    <span aria-hidden="true">PDF</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="truncate text-sm font-bold"
                      title={document.name}
                    >
                      {document.name}
                    </h3>

                    <p className="mt-1 text-[10px] opacity-45">
                      Document learning summary
                    </p>
                  </div>

                  <span
                    className="
                      shrink-0 rounded-full border
                      px-2.5 py-1 text-[10px] font-semibold
                    "
                    style={{ borderColor: "var(--border)" }}
                  >
                    {document.score === null
                      ? "Not assessed"
                      : "Assessed"}
                  </span>
                </div>

                <div className="my-5 grid grid-cols-2 gap-3">
                  <div
                    className="rounded-xl p-3"
                    style={{ background: "var(--bg)" }}
                  >
                    <p className="text-[10px] opacity-50">
                      Flashcards
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      {document.flashcards}
                    </p>
                  </div>

                  <div
                    className="rounded-xl p-3"
                    style={{ background: "var(--bg)" }}
                  >
                    <p className="text-[10px] opacity-50">
                      Quiz questions
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      {document.quiz_questions}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold opacity-65">
                      Latest quiz score
                    </span>

                    <span className="text-sm font-black">
                      {document.score === null
                        ? "—"
                        : `${Math.round(document.score)}%`}
                    </span>
                  </div>

                  <div
                    className="h-2 overflow-hidden rounded-full"
                    style={{ background: "var(--border)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${document.score ?? 0}%`,
                        background:
                          document.score === null
                            ? "transparent"
                            : chartColor,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-[10px] opacity-40">
                    {document.score === null
                      ? "No saved quiz result for this document yet."
                      : "Based on the latest saved quiz result."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="glass-card flex min-h-[170px] flex-col items-center justify-center p-6 text-center">
            <p className="text-sm font-semibold opacity-65">
              Your document analytics will appear here
            </p>

            <p className="mt-2 max-w-sm text-xs leading-5 opacity-45">
              Upload your first PDF to see its learning materials
              and quiz performance in this section.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER */}
      {!loading && !error && (
        <footer className="pb-3 pt-1 text-center">
          <p className="text-[10px] leading-5 opacity-40">
            Analytics reflect the information currently saved
            to your RecallNova account.
          </p>
        </footer>
      )}
    </main>
  );
}
