export interface PointsConversion {
    points: number;
    value: number;
  }
  
  export const conversionRates: PointsConversion[] = [
    { points: 100, value: 50 },
    { points: 200, value: 120 },
    { points: 500, value: 350 }
  ];