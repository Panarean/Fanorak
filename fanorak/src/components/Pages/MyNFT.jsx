import React, { useState,useEffect } from 'react';
import { Image,Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuthToken } from '../../AuthService';
import axios from 'axios'
import { BackendURL } from '../../config';
import NFTCard from '../NFTCard';

import { CrossmintPayButton, CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";

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

  const onEvent = (e) =>{
    console.log(e)
  }

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
       borderWidth="1px" 
       borderRadius="lg" 
       overflow="hidden" 
      >
        <Image src={BackendURL+'/api/images/collection.jpg'} alt="NFT Collection" mb={5}/>
        <CrossmintPayButton
          projectId="28bb67ed-7209-4923-9a95-93794e1d8ac9"
          collectionId="9adc0145-e8b2-414e-b20f-536c3dcc6c02"
          environment="staging"
          mintConfig={{
            type: "erc-721"
            // your custom minting arguments...
          }}
          className='payButton'
          
        />
        <CrossmintPayButton
          projectId="28bb67ed-7209-4923-9a95-93794e1d8ac9"
          collectionId="9adc0145-e8b2-414e-b20f-536c3dcc6c02"
          environment="staging"
          mintConfig={{
            type: "erc-721"
            // your custom minting arguments...
          }}
          paymentMethod='ETH'
          className='payButton'
        />
        <CrossmintPayButton
          projectId="28bb67ed-7209-4923-9a95-93794e1d8ac9"
          collectionId="9adc0145-e8b2-414e-b20f-536c3dcc6c02"
          environment="staging"
          mintConfig={{
            type: "erc-721"
            // your custom minting arguments...
          }}
          paymentMethod='SOL'
          className='payButton'
        />

      
  </Flex>
    )
  }
  return (
    <></>

  );
};
