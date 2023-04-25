export interface Paginated<T> {
  data: Array<T>;
  page: number;
  perPage: number;
  totalItems: number;
}
