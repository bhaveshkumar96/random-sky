import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import Navbar from "./components/Navbar.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
