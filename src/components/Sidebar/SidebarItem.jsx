import {
  Flex,
  Link,
  Menu,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useRouter } from "next/router";
import { SidebarSubItem } from "./SidebarSubItem";
import { useEffect } from "react";

/**
 * Item de Sidebar.
 * @method SidebarItem
 * @memberof module:Sidebar
 * @param {Object} icon ícone do SidebarItem
 * @param {Object} title texto do SidebarItem
 * @param {Object} subItems sub ítens do SidebarItem
 * @param {Object} href caminho referente ao item
 * @param {Object} sidebarClose função ao fechar o SidebarItem
 * @returns {Component} Sidebar Item estilizado
 *
 */
export function SidebarItem({ icon, title, subItems, href, sidebarClose }) {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const linkPath = router.asPath.split("/");
  linkPath.shift();
  const [activeEntity, menu] = linkPath;
  const active = router.asPath === `/${activeEntity}${href}`;

  const handleClick = (e) => {
    e.preventDefault();
    if (!subItems) {
      router.push(`/${activeEntity}${href}`);
      return sidebarClose();
    }
    return subItems && onToggle();
  };

  useEffect(() => {
    if (!isOpen && `/${menu}` === href) {
      onToggle();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      mb={2}
      flexDir="column"
      w="100%"
      alignItems="flex-start"
      boxShadow={active && "lg"}
      rounded="lg"
      bg={isOpen && "primary.100"}
    >
      <Menu placement="right">
        <Link
          bg={active && "primary.500"}
          py={2}
          px={3}
          rounded="lg"
          _hover={{ textDecor: "none", bg: "primary.500", scale: "xl" }}
          w="100%"
          role="group"
          onClick={handleClick}
          shadow={isOpen && "inner"}
        >
          <Flex w="100%">
            <Flex>
              <IconBox
                _groupHover={{
                  bg: "primary.300",
                  color: "white",
                  shadow: "lg",
                }}
                bg={active ? "primary.300" : "white"}
                color={active ? "white" : "primary.400"}
                h="30px"
                w="30px"
                fontSize="xl"
              >
                {icon}
              </IconBox>
              <Text
                ml={3}
                fontWeight="bold"
                fontSize="sm"
                color={active ? "white" : "primary.400"}
                my="auto"
                _groupHover={{ color: "white" }}
              >
                {title}
              </Text>
            </Flex>
            {subItems && (
              <>
                <Spacer />
                <IconBox
                  _groupHover={{
                    color: "white",
                  }}
                  color={active ? "white" : "primary.400"}
                  h="30px"
                  w="30px"
                  fontSize="xl"
                >
                  {isOpen ? FiChevronUp : FiChevronDown}
                </IconBox>
              </>
            )}
          </Flex>
        </Link>
        {subItems &&
          subItems.map((subItem, idx) => (
            <SidebarSubItem
              key={`subItem${subItem.title}_${idx}`}
              icon={subItem.icon}
              title={subItem.title}
              isOpen={isOpen}
              href={`/${activeEntity}${href}${subItem.href}`}
              sidebarClose={sidebarClose}
            />
          ))}
        {/* <Box w="100%" borderBottomRadius={10}>
          <Collapse in={isOpen} animateOpacity>
            <MenuItem p={0} _focus={{ bg: "none" }}>
              <Link
                role="group"
                _hover={{ bg: "primary.500", color: "white", shadow: "lg" }}
                w="100%"
                rounded="md"
                bg={active ? "primary.500" : ""}
              >
                <Flex py={1} ms={7} rounded="md">
                  <IconBox
                    _groupHover={{
                      color: "white",
                    }}
                    color={active ? "white" : "primary.400"}
                    h="30px"
                    w="30px"
                    fontSize="xl"
                  >
                    {icon}
                  </IconBox>
                  <Text
                    ml={2}
                    fontWeight="bold"
                    fontSize="sm"
                    color={active ? "white" : "primary.400"}
                    _groupHover={{ color: "white" }}
                    my="auto"
                  >
                    {title}
                  </Text>
                </Flex>
              </Link>
            </MenuItem>
          </Collapse>
        </Box> */}
      </Menu>
    </Flex>
  );
}
