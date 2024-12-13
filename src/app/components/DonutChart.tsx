// src/components/MyDoughnutChart.js
"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type IBudgets = {
  category: string;
  maximum: number;
  theme: string;
  sum?: number;
};

export default function DonutChart({
  chartdata,
  summarydata,
}: {
  chartdata: IBudgets[] | undefined;
  summarydata: boolean;
}) {
  const finalData = {
    label: summarydata ? chartdata?.map((item: IBudgets) => item.maximum) : "",

    datasets: [
      {
        data: summarydata
          ? chartdata?.map((item: IBudgets) => Math.round(item.maximum))
          : chartdata?.map((item: IBudgets) => Math.round(item.sum ?? 0)),
        backgroundColor: chartdata?.map((item: IBudgets) => item.theme),
        borderColor: chartdata?.map((item: IBudgets) => item.theme),
        borderWidth: 1,
        dataVisibility: new Array(chartdata?.length).fill(true),
      },
    ],
  };

  return (
    <Doughnut
      data={finalData}
      plugins={[]}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
      }}
    />
  );
}
