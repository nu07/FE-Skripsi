export interface Pagination {
  currentPages: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  isLoading: boolean;
  showDeleted: boolean; // Ensure this property is included
}
