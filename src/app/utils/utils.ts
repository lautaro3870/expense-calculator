import { Category, CategoryTotal, MonthlyCategoryReport } from '../interaface';

export const parseReport = (raw: string): MonthlyCategoryReport[] => {
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

export const getTotalByCategoryFromTable = (
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
      categoryColor: category.color
    };
  });
};
