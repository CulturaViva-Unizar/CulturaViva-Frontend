export const pieOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

export const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

export const barOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const lineOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

export function generateColors(count: number) {
  const backgroundColor: string[] = [];
  const hoverBackgroundColor: string[] = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.round((360 * i) / count);
    backgroundColor.push(`hsl(${hue}, 70%, 50%)`);
    hoverBackgroundColor.push(`hsl(${hue}, 70%, 60%)`);
  }
  return { backgroundColor, hoverBackgroundColor };
}
