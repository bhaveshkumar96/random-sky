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

export default function ProductCard({ product, addToCart }) {
  const navigate = useNavigate();

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
          colorPalette="blackAlpha"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card navigation
            addToCart?.(product);
          }}
        >
          <LuShoppingCart />
          Add to Cart
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
