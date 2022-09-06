import { Heading } from "@chakra-ui/react";

export function SidebarLabel({ children, ...props }) {
  return (
    <Heading
      as="h3"
      size="xs"
      color="primary.600"
      textTransform="uppercase"
      py={2}
      {...props}
    >
      {children}
    </Heading>
  );
}
