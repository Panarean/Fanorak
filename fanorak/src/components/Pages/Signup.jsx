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
    
    

    // Reset form values
    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      passportOrNationalID: '',
      address: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Flex flex={1} padding={['4px','30px','30px']} align="center" justify="center" width="100wh">

    <Card>
        <CardHeader>
            <Heading size='md'>Sign Up</Heading>
        </CardHeader>
        <CardBody>
            <Box p={'8px'}  justifyContent={'center'} width='400px' >
            <VStack align="stretch" spacing={4}>
                <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                />
                </FormControl>

                <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                />
                </FormControl>

                <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
                </FormControl>

                <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                    type="tel"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
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

                <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                    />
                </FormControl>
                    
                <FormControl id="passportOrNationalID" isRequired>
                <FormLabel>Passport or National ID</FormLabel>
                <Input
                    type="text"
                    name="passportOrNationalID"
                    value={formValues.passportOrNationalID}
                    onChange={handleChange}
                />
                </FormControl>

                <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Textarea
                    name="address"
                    value={formValues.address}
                    onChange={handleChange}
                />
                </FormControl>

                <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
                    Sign Up
                </Button>

                <Text fontSize="sm" textAlign="center">
                Do you already have an account?{' '}
                <Button as='a' onClick={()=>{navigate('/signin')}} variant="link" colorScheme="blue">
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
