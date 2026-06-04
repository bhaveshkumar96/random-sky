import {
  Box,
  SimpleGrid,
  Spinner,
  Center,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../hooks/useCart";
import ProductCard from "../components/ProductCard";
export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const { addToCart, cartItems } = useCart();
  const getProducts = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");

      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://fakestoreapi.com/products/categories",
      );

      setCategories(data || []);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    // console.log("category", category);
    if (category === "all") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) => product.category === category,
    );
    // console.log("filtered", filtered);

    setFilteredProducts(filtered);
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);
  return (
    <Box maxW="1400px" mx="auto" px={4} py={8}>
      {loading ? (
        <Center minH="300px">
          <Spinner size="xl" />
        </Center>
      ) : (
        <>
          <HStack mb={6} gap={3} wrap="wrap">
            <Badge
              cursor="pointer"
              px={3}
              py={2}
              borderRadius="full"
              colorPalette={selectedCategory === "all" ? "blue" : "gray"}
              onClick={() => handleCategoryFilter("all")}
            >
              All
            </Badge>

            {categories.map((category) => (
              <Badge
                key={category}
                cursor="pointer"
                px={3}
                py={2}
                borderRadius="full"
                textTransform="capitalize"
                colorPalette={selectedCategory === category ? "blue" : "gray"}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </HStack>

          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              md: 3,
              lg: 4,
            }}
            gap={6}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}
