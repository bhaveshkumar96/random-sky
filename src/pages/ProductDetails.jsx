import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Heading, Text, Box } from "@chakra-ui/react";
import { useCart } from "../hooks/useCart";
import ProductDetailsAccordion from "../components/ProductDetailsAccordion";
import { useParams } from "react-router-dom";
// import styles from "../styles/ProductDetails.css";
import "../styles/ProductDetails.css";
export default function ProductDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
  });
  const images = [
    "https://picsum.photos/600?random=1",
    "https://picsum.photos/600?random=2",
    "https://picsum.photos/600?random=3",
    "https://picsum.photos/600?random=4",
    "https://picsum.photos/600?random=5",
    "https://picsum.photos/600?random=6",
    "https://picsum.photos/600?random=7",
  ];
  const { addToCart, cartItems } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [productData, setProductData] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || "blue",
  );
  const [selectedSize, setSelectedSize] = useState(
    searchParams.get("size") || "m",
  );
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://fakestoreapi.com/products/${id}`,
      );
      console.log("data", data);
      setProductData(data || {});
    } catch (error) {
      console.log(error.message);
    }
  };

  const color = searchParams.get("color");
  const size = searchParams.get("size");
  const isInCart = cartItems.some((item) => item.id === productData.id);
  const discountedPrice = (productData.price * 0.4).toFixed(2);
  useEffect(() => {
    getProduct();
  }, []);
  const handleSizeChange = (size) => {
    setSelectedSize(size);

    setSearchParams({
      color: selectedColor,
      size,
    });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);

    setSearchParams({
      color,
      size: selectedSize,
    });
  };
  const handleAddtoCart = (product) => {
    setButtonLoading(true);
    try {
      addToCart({ ...product, quantity: count });
      setButtonLoading(false);
    } catch (error) {
      setButtonLoading(false);
      console.log(error.message);
    }
  };
  const handleIncreaseCount = () => {
    if (selectedSize === "m" && count >= 2) {
      toast.error("Only 2 left in stock");
      return;
    }

    setCount((prev) => prev + 1);
  };
  return (
    <div className="container">
      <div className="image-section">
        <img
          src={selectedImage}
          alt="product"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          style={{
            transform: zoom ? "scale(1.2)" : "scale(1)",
          }}
          className="main-image"
        />

        <div className="thumbnail-section">
          {images.map((img) => (
            <img
              key={img}
              src={img}
              alt={img}
              onClick={() => setSelectedImage(img)}
              className={`thumbnail-image ${
                selectedImage === img ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <Heading size={"lg"}>{productData.title}</Heading>
        <p className="product-category">{productData.category}</p>

        <div className="price-section">
          <span
            style={{
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            ${productData.price}
          </span>

          <span
            style={{
              textDecoration: "line-through",
              color: "#888",
            }}
          >
            ${(Number(productData.price) + Number(discountedPrice)).toFixed(2)}
          </span>

          <span
            style={{
              color: "green",
              fontWeight: "600",
            }}
          >
            40% OFF
          </span>
        </div>

        <div style={{ marginBottom: "24px" }} className="color-section">
          <h4>Color</h4>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {["black", "olive", "blue"].map((color) => (
              <div
                key={color}
                onClick={() => handleColorChange(color)}
                style={{
                  backgroundColor: color,
                  border:
                    selectedColor === color
                      ? "3px solid #ff2d55"
                      : "2px solid #ddd",
                }}
                className="color-option"
              />
            ))}
          </div>

          <Text mt={2} fontSize="sm" color="gray.600">
            Selected Color:{" "}
            <Text as="span" fontWeight="semibold" color="black">
              {selectedColor?.charAt(0).toUpperCase() + selectedColor?.slice(1)}
            </Text>
          </Text>
        </div>

        <div style={{ marginBottom: "24px" }} className="size-section">
          <h4>Size</h4>

          <div className="size-option">
            <Button
              variant={selectedSize === "s" ? "solid" : "outline"}
              onClick={() => handleSizeChange("s")}
            >
              S
            </Button>

            <Button
              variant={selectedSize === "m" ? "solid" : "outline"}
              onClick={() => handleSizeChange("m")}
            >
              M (Only 2 left)
            </Button>

            <Button disabled>L (Sold Out)</Button>
          </div>

          <Text mt={2} fontSize="sm" color="gray.600">
            Selected Size:{" "}
            <Text as="span" fontWeight="semibold" color="black">
              {selectedSize?.toUpperCase()}
            </Text>
          </Text>
        </div>

        <div className="quantity-section">
          <Button
            onClick={() => {
              if (count > 1) {
                setCount((prev) => prev - 1);
              }
            }}
          >
            -
          </Button>
          <span>{count}</span>
          <Button onClick={handleIncreaseCount}>+</Button>
        </div>

        <Button
          w="100%"
          onClick={() => handleAddtoCart(productData)}
          className="add-to-cart-button"
          isLoading={buttonLoading}
          loadingText="Adding to Cart..."
        >
          {isInCart ? "Added to Cart ✓" : "Add to Cart"}
        </Button>

        <p
          style={{
            marginTop: "15px",
            color: "#666",
          }}
        >
          🚚 Estimated Delivery: 3–5 business days - ( {formattedDate} 2026 )
        </p>
        <br />
        <ProductDetailsAccordion description={productData.description} />
      </div>
    </div>
  );
}
