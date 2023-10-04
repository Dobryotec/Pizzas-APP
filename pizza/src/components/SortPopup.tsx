import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/filter/slice";
import { selectFilter } from "../redux/filter/selectors";
import { SortPropertyEnum } from "../redux/filter/types";

type SortItem = {
  name: string;
  sort: SortPropertyEnum;
};

export const list: SortItem[] = [
  { name: "popularity(DESC)", sort: SortPropertyEnum.RATING_DESC },
  { name: "popularity(ASC)", sort: SortPropertyEnum.RATING_ASC },
  { name: "price(DESC)", sort: SortPropertyEnum.PRICE_DESC },
  { name: "price(ASC)", sort: SortPropertyEnum.PRICE_ASC },
  { name: "alphabet(DESC)", sort: SortPropertyEnum.TITLE_DESC },
  { name: "alphabet(ASC)", sort: SortPropertyEnum.TITLE_ASC },
];

const SortPopup: React.FC = () => {
  const sort = useSelector(selectFilter);
  const sortRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleBodyClick = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };
      if (
        _event.path &&
        sortRef.current &&
        !_event.path.includes(sortRef.current)
      ) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sort by:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={sort.sort === obj.sort ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortPopup;
