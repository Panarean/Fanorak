import { useState } from 'react';
import { Box, Flex, Button, IconButton, Collapse, VStack } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export const AppHeader = () => {
  const navigate= useNavigate();

  const [showLinks, setShowLinks] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  
  const nav_items = [
    {
      "label":"home",
      "link":'/'
    },
  ]
  if(isLoggedIn){
    nav_items.push({"label":"Sign Out","link":"/logout"});
  }
  else{
    nav_items.push({"label":"Sign In","link":"/signin"});
  }
  return (
    <Box as="header" p={4} bg="gray.100">
      <Flex align="center" justify="space-between">
        <Box>
          <img src="logo.png" alt="Logo" width="50px" />
        </Box>
        <Box as="h1" fontSize="24px" m={0} p={0}>
          Title
        </Box>
        <Flex display={['none','flex','flex']} align="center">
          <VStack spacing={4} flexDirection={'row'}>
            {
              nav_items.map(element => (
                <Button as='a' onClick={()=> {navigate(element.link)}} variant="link">
                  {element.label}
                </Button>
              ) )
            }
          </VStack>
        </Flex>
        <IconButton
          display={['block','none','none']}
          aria-label="Toggle Menu"
          variant="ghost"
          icon={<HamburgerIcon />}
          onClick={toggleLinks}
        />
      </Flex>
      <Collapse in={showLinks} animateOpacity>
        <VStack spacing={4} align="center" mt={4}>
            {
              nav_items.map(element => (
                <Button as="a" href={element.link} variant="link">
                  {element.label}
                </Button>
              ) )
            }
        </VStack>
      </Collapse>
    </Box>
  );
};
