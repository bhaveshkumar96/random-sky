import { Box, SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../hooks/useCart";
import ProductCard from "../components/ProductCard";
export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart, cartItems } = useCart();
  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://fakestoreapi.com/products`);
      setProducts(data || []);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Box maxW="1400px" mx="auto" px={4} py={8}>
      {loading ? (
        <Center minH="300px">
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
          gap={6}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
