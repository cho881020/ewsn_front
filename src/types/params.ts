export interface Params {
  page: number;
  keyword: string;
  politicalOrientationId: number | null;
  categoryId: number | null;
  startDate: string;
  endDate: string;
}

export interface CampParams {
  page: number;
  keyword: string;
  politicalOrientationId: number | null;
  categoryId: number | null;
}
