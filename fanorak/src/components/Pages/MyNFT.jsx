import React, { useState,useEffect } from 'react';
import { Image,Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../../AuthService';
import axios from 'axios'
import { BackendURL } from '../../config';
import BuyNFT from './BuyNFT'
export const MyNFT = () => {
  const navigate = useNavigate();
  const [isLoading,setLoading] = useState(true);
  const [nft,setNft] = useState(null);
  const [email,setEmail] = useState(null);
  useEffect(()=>{
    const token = getAuthToken(); // Retrieve the JWT token from the cookie
    if (!token)    navigate('/signin');
    if(token == '') navigate('/signin');

    setLoading(true)
    axios.post(BackendURL+'/users/me',{token}).then((res)=>{
        console.log(res);
        if('token' in res){
          setNft(res.token);
        }else{
          setEmail(res.email)
          setNft(null);
        }
        setLoading(false)

    }).catch((err)=>{
      setLoading(false)
      if(err.response){
        if(err.response.status==403){
          navigate('/signin');
        }
      }
    })
  },[])



  if(isLoading){
    return (
      <Flex p="4" maxWidth="400px" margin="0 auto" justifyContent={'center'} flexDir='column'>
        <Button isLoading={isLoading} variant={'ghost'}/>
        </Flex>
    )
  }
  if(nft == null){
    return  (
      <Flex
       p="4" maxWidth="400px" margin="0 auto" 
       justifyContent={'center'}  alignItems={'center'} 
       flexDir='column'
       overflow="hidden" 
      >
        <BuyNFT />
      </Flex>
    )
  }
  return (
    <></>

  );
};
