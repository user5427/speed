// Generate dataset for the past month
export const generateMonthlyDataset = (readingData) => {
  const today = new Date();
  const dataset = [];

  // Generate the last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    // Format the date (e.g., "YYYY-MM-DD")
    const formattedDate = date.toISOString().split('T')[0];

    // Find the day's data or default to 0
    const dayData = readingData.find((data) => data.date === formattedDate);
    const avgReadingSpeed = dayData ? dayData.avgReadingSpeed : 0;

    dataset.push({
      x: formattedDate,
      y: avgReadingSpeed,
    });
  }

  return dataset;
};
