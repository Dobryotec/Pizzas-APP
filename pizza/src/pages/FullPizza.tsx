import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Pizza = {
  title: string;
  price: number;
  imageUrl: string;
  description: string;
};

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<Pizza>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://64ac08fa9edb4181202f0434.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error when receiving pizza");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Loading...";
  }

  const { imageUrl, title, price, description } = pizza;

  return (
    <div className="container flex-container">
      <div className="wrapper-image">
        <img src={imageUrl} />
      </div>
      <h2 className="title">{title}</h2>
      <h3>Ingredients:</h3>
      <p className="description">{description}</p>
      <h3 className="price">Price: {price} UAH</h3>
      <Link to="/" className="button button--black">
        Back
      </Link>
    </div>
  );
};

export default FullPizza;
