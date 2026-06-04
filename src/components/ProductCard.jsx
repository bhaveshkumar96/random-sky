import {
  Card,
  Image,
  Text,
  Badge,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import { LuStar, LuShoppingCart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const isAddedToCart = cartItems.some((item) => item.id === product.id);
  return (
    <Card.Root
      h="100%"
      cursor="pointer"
      overflow="hidden"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      transition="all 0.2s"
      onClick={() => navigate(`/product/${product.id}`)}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "md",
      }}
    >
      <Image
        src={product.image}
        alt={product.title}
        h="220px"
        w="100%"
        objectFit="contain"
        p={4}
      />

      <Card.Body flex="1">
        <VStack align="stretch" gap={3}>
          <Badge
            alignSelf="start"
            colorPalette="gray"
            textTransform="capitalize"
          >
            {product.category}
          </Badge>

          <Text fontWeight="semibold" lineClamp={2}>
            {product.title}
          </Text>

          <HStack justify="space-between">
            <Text fontSize="xl" fontWeight="bold">
              ${product.price}
            </Text>

            <HStack gap={1}>
              <LuStar />
              <Text>{product.rating.rate}</Text>
              <Text color="gray.500">({product.rating.count})</Text>
            </HStack>
          </HStack>
        </VStack>
      </Card.Body>

      <Card.Footer>
        <Button
          width="100%"
          colorPalette={isAddedToCart ? "green" : "blackAlpha"}
          onClick={(e) => {
            e.stopPropagation();

            if (!isAddedToCart) {
              addToCart(product);
            }
          }}
        >
          <LuShoppingCart />
          {isAddedToCart ? "Added to Cart ✓" : "Add to Cart"}
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
