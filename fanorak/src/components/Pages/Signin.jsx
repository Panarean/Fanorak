import React, { useState,useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

import { getAuthToken, setAuthToken } from '../../AuthService';
import { BackendURL } from '../../config';
export const Signin = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [isLoading,setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = getAuthToken(); // Retrieve the JWT token from the cookie

    if (token) {
      if(token != '')
      {
        navigate('/');
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign-in or form submission logic here
    axios.post(BackendURL+'/users/signin',formValues).then((res) => {
      setAuthToken(res.data.token);
      setLoading(false);
      navigate('/');
    }).catch((err) => {
      if(err.response){
        if(err.response.data){
          console.log(err.response.data)
          alert(err.response.data);
        }else{
          alert(err)
        }
        setLoading(false)
      }
    })
  };

  return (
    <Flex flex={1} padding={['8px','30px','30px']}  alignItems="center" justify="center" width="100wh" >

    <Card>
        <CardHeader>
            <Heading size='md'>Sign In</Heading>
        </CardHeader>
        <CardBody>
            <Box p={'8px'}  justifyContent={'center'} width='400px' >
            <VStack align="stretch" spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </FormControl>

              <Button isLoading={ isLoading } colorScheme="blue" type="submit" onClick={handleSubmit}>
                Sign In
              </Button>

              <Text fontSize="sm" textAlign="center">
                Don't you have an account?{' '}
                <Button as='a' onClick={()=>{navigate('/signup')}} variant="link" colorScheme="blue">
                    Sign Up
                </Button>
                </Text>

            </VStack>
            </Box>
            </CardBody>
    </Card>
    </Flex>
  );
};