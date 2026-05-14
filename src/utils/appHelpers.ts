 export const parseReviews = (reviews: string): number => {
  const num = parseFloat(reviews);
  if (Number.isNaN(num)) return 0;
  if (/M/i.test(reviews)) return Math.round(num * 1_000_000);
  if (/K/i.test(reviews)) return Math.round(num * 1_000);
  return Math.round(num);
};