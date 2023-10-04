import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filter.sort;

export const selectCategoryId = (state: RootState) => state.filter.categoryId;

export const selectCurrentPage = (state: RootState) => state.filter.currentPage;

export const selectSearchValue = (state: RootState) => state.filter.searchValue;
