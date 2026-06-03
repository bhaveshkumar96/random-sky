import { Accordion, Box, Card, Text } from "@chakra-ui/react";

export default function ProductDetailsAccordion({ description }) {
  return (
    <Accordion.Root collapsible multiple defaultValue={["description"]}>
      <Accordion.Item
        value="description"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        mb={2}
      >
        <Accordion.ItemTrigger px={4} py={3}>
          <Box flex="1" textAlign="left">
            Description 📜
          </Box>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>

        <Accordion.ItemContent>
          <Box px={4} pb={4}>
            {description}
          </Box>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item
        value="specifications"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        mb={2}
      >
        <Accordion.ItemTrigger px={4} py={3}>
          <Box flex="1" textAlign="left">
            Specifications 📄
          </Box>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>

        <Accordion.ItemContent>
          <Box px={4} pb={4}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <tbody>
                <tr>
                  <td>
                    <strong>Material</strong>
                  </td>
                  <td>100% Cotton</td>
                </tr>
                <tr>
                  <td>
                    <strong>Color</strong>
                  </td>
                  <td>Black</td>
                </tr>
                <tr>
                  <td>
                    <strong>Fit</strong>
                  </td>
                  <td>Regular</td>
                </tr>
                <tr>
                  <td>
                    <strong>Weight</strong>
                  </td>
                  <td>250g</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Accordion.ItemContent>
      </Accordion.Item>

      <Accordion.Item
        value="reviews"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Accordion.ItemTrigger px={4} py={3}>
          <Box flex="1" textAlign="left">
            Reviews ⭐
          </Box>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>

        <Accordion.ItemContent>
          <Box px={4} pb={4} display="flex" flexDirection="column" gap="12px">
            <Card.Root>
              <Card.Body>
                <Text fontWeight="bold">John D.</Text>
                <Text>⭐⭐⭐⭐⭐ Great quality product.</Text>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <Text fontWeight="bold">Sarah M.</Text>
                <Text>⭐⭐⭐⭐ Very comfortable and fits well.</Text>
              </Card.Body>
            </Card.Root>

            <Card.Root>
              <Card.Body>
                <Text fontWeight="bold">Michael K.</Text>
                <Text>⭐⭐⭐⭐⭐ Worth the price.</Text>
              </Card.Body>
            </Card.Root>
          </Box>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
}
