import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/filter/slice";
import { selectCategoryId } from "../redux/filter/selectors";

const Categories: React.FC = () => {
  const categoryId = useSelector(selectCategoryId);
  const dispatch = useDispatch();
  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Cheese"];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={categoryId === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
