import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const NFTCard = ({ pictureUrl,name,description,id,key }) => {
    const navigate = useNavigate();
  return (
    <Flex 
        flexDir={'column'} 
        borderWidth="1px" 
        borderRadius="lg" 
        overflow="hidden" 
        p="4" 
        width='250px' margin={'4'}
        onClick={()=>{
            navigate('/nfts/'+id);
        }}
        key={key}
    >
      <Image src={pictureUrl} alt="Movie Poster" />
      <Text as='h2' mt='5px'> <b>Name</b> : {name}</Text>
      <Text mt='5px'><b>Description</b>: {description}</Text>
    </Flex>
  );
};
export default NFTCard