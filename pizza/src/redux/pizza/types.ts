export type FetchPizzasArgs = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
};

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
