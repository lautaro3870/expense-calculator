'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Category, CategoryTotal, MonthlyCategoryReport } from '../interaface';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  indexAxis: 'y' as const,
  maintainAspectRatio: false,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function Graphic() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: [] as string[],
        barThickness: 0 as number,
      },
    ],
  });

  const generateColor = (index: number, total: number) => {
    const hue = 145;
    const saturation = 55;
    const minLight = 35;
    const maxLight = 70;

    const lightness =
      minLight + (index / Math.max(total - 1, 1)) * (maxLight - minLight);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const buildChartData = (data: CategoryTotal[]) => {
    return {
      labels: data.map((c) => c.categoryName),
      datasets: [
        {
          data: data.map((c) => c.total),
          backgroundColor: data.map((_, i) => generateColor(i, data.length)),
          barThickness: 37,
        },
      ],
    };
  };

  const parseReport = (raw: string): MonthlyCategoryReport[] => {
    const parsed = JSON.parse(raw);

    return Object.entries(parsed)
      .map(([month, categories]) => ({
        month,
        categories: Object.values(
          categories as {
            categoryId: string;
            categoryName: string;
            total: number;
          }[],
        ),
      }))
      .sort((a, b) => b.month.localeCompare(a.month));
  };

  const getTotalByCategoryFromTable = (
    report: MonthlyCategoryReport[],
    categories: Category[],
  ): CategoryTotal[] => {
    return categories.map((category) => {
      const total = report.reduce((sum, month) => {
        const data = month.categories.find((c) => c.categoryId === category.id);
        return sum + (data?.total ?? 0);
      }, 0);

      return {
        categoryName: category.category,
        total,
      };
    });
  };

  useEffect(() => {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');

    const raw = localStorage.getItem('expensesReport');
    if (!raw) return;

    const report = parseReport(raw);
    const totals = getTotalByCategoryFromTable(report, categories);

    setChartData(buildChartData(totals));
  }, []);

  return (
    <div style={{ marginTop: '3rem', height: '60vh' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
