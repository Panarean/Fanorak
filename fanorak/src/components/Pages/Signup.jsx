import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Heading
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'

import { BackendURL } from '../../config';


export const Signup = () => {

    const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    passportOrNationalID: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [formError,setFormError] = useState({});

  const [isLoading,setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login or form submission logic here
    let formData = formValues;
    //formData.password=hash(formValues.password);
    //formData.confirmPassword = hash(formValues.confirmPassword);
    console.log(formData);
    setLoading(true);
    axios.post(BackendURL+'/users/signup',formData).then((res) => {
        setFormError({})
        setLoading(false);
        navigate('/signin');
    }).catch((err) => {
        console.log(err)
        const { data,status } = err.response;
        console.log(data,status)
        if(status == 400){
            if(data.error == 'field error'){
                setFormError(data.data);
            }
        }
        setLoading(false);
    })
    
  };
  useState(()=>{console.log('formError',formError)},[formError])
  return (
    <Flex flex={1} padding={['8px','30px','30px']} align="center" justify="center" width="100wh">

    <Card>
        <CardHeader>
            <Heading size='md'>Sign Up</Heading>
        </CardHeader>
        <CardBody>
            <Box p={'8px'}  justifyContent={'center'} width='400px' >
            <VStack align="stretch" spacing={4}>
                <FormControl id="firstName" isInvalid={formError.firstName} isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formError.firstName}</FormErrorMessage>
                </FormControl>

                <FormControl id="lastName" isInvalid={formError.lastName} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formError.lastname}</FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={formError.email} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formError.email}</FormErrorMessage>
                </FormControl>

                <FormControl id="phoneNumber" isInvalid={formError.phoneNumber} isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                    type="tel"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formError.phoneNumber}</FormErrorMessage>
                </FormControl>

                <FormControl id="password" isInvalid={formError.password} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{formError.password}</FormErrorMessage>
                </FormControl>

                <FormControl id="confirmPassword" isInvalid={formError.confirmPassword} isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{formError.confirmPassword}</FormErrorMessage>
                </FormControl>
                    
                <FormControl id="passportOrNationalID" isInvalid={formError.passportOrNationalID} isRequired>
                <FormLabel>Passport or National ID</FormLabel>
                <Input
                    type="text"
                    name="passportOrNationalID"
                    value={formValues.passportOrNationalID}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formError.passportOrNationalID}</FormErrorMessage>
                </FormControl>

                <FormControl id="address" isInvalid={formError.address} isRequired>
                <FormLabel>Address</FormLabel>
                <Textarea
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                />
                <FormErrorMessage>{formError.address}</FormErrorMessage>
                </FormControl>

                <Button isLoading={isLoading} colorScheme="blue" type="submit" onClick={handleSubmit}>
                    Sign Up
                </Button>

                <Text fontSize="sm" textAlign="center">
                Do you already have an account?{' '}
                <Button  as='a' onClick={()=>{navigate('/signin')}} variant="link" colorScheme="blue">
                    Sign In
                </Button>
                </Text>

            </VStack>
            </Box>
        </CardBody>
    </Card>
    </Flex>
  );
};
