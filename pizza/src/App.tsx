import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

import "./App.css";
import "./scss/app.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
