import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Heading, Text, Box } from "@chakra-ui/react";
import { useCart } from "../hooks/useCart";
import ProductDetailsAccordion from "../components/ProductDetailsAccordion";
import { useParams } from "react-router-dom";

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
  console.log("cartItems", cartItems);
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
        display: "grid",
        gridTemplateColumns: "55% 45%",
        gap: "40px",
      }}
    >
      {/* Gallery */}
      <div
        style={{
          overflow: "hidden",
          borderRadius: "12px",
          border: "1px solid #ddd",
        }}
      >
        <img
          src={selectedImage}
          alt="product"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          style={{
            width: "100%",
            display: "block",
            transition: "transform 0.3s ease",
            transform: zoom ? "scale(1.2)" : "scale(1)",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          {images.map((img) => (
            <img
              key={img}
              src={img}
              alt=""
              onClick={() => setSelectedImage(img)}
              style={{
                width: "80px",
                height: "80px",
                cursor: "pointer",
                borderRadius: "8px",
                padding: "2px",
                border:
                  selectedImage === img ? "2px solid black" : "1px solid #ddd",
              }}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <Heading size={"lg"}>{productData.title}</Heading>
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginBottom: "8px",
          }}
        >
          {productData.category}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
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
            $45
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

        {/* Colors */}
        <div style={{ marginBottom: "24px" }}>
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
                  padding: "2px",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: color,
                  cursor: "pointer",
                  border:
                    selectedColor === color
                      ? "3px solid #ff2d55"
                      : "2px solid #ddd",
                }}
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

        {/* Sizes */}
        <div style={{ marginBottom: "24px" }}>
          <h4>Size</h4>

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "10px",
            }}
          >
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

        {/* Quantity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "24px",
          }}
        >
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
          <Button onClick={() => setCount((pre) => pre + 1)}>+</Button>
        </div>

        <Button
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            background: "#111",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => handleAddtoCart(productData)}
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
