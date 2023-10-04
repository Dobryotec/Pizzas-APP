import qs from "qs";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";

import { fetchPizzas } from "../redux/pizza/asyncActions";
import {
  selectCurrentPage,
  selectSearchValue,
  selectFilter,
  selectCategoryId,
} from "../redux/filter/selectors";
import { selectPizza } from "../redux/pizza/selectors";
import SortPopup from "../components/SortPopup";
import Categories from "../components/Categories";
import Pizza from "../components/Pizza";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination/Pagination";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizza);

  const categoryId = useSelector(selectCategoryId);
  const sort = useSelector(selectFilter);
  const currentPage = useSelector(selectCurrentPage);
  const searchValue = useSelector(selectSearchValue);

  const getPizzas = async () => {
    const sortBy = sort.sort.replace("-", "");
    const order = sort.sort.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage }));
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sort: sort.sort,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  const pizzas = items.map(({ id, title, price, imageUrl, sizes, types }) => (
    <Pizza
      key={id}
      id={id}
      title={title}
      price={price}
      imageUrl={imageUrl}
      sizes={sizes}
      types={types}
    />
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories />
        <SortPopup />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            An error has occurred <span>😕</span>
          </h2>
          <p>
            Unfortunately, we were unable to get any pizza. Please try again
            later.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination />
    </>
  );
};

export default HomePage;
