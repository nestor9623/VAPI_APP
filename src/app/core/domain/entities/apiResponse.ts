export interface ApiResponse<T> {
  count: number;
  message: string;
  searchCriteria: string;
  results: T[];
}
