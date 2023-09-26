import { Flex,Box,Text,Button } from '@chakra-ui/react'


import backgroundImage from '../../assets/Images/background1.jpg'

export function Home() {
    return (
        <>
            
            <Flex 
                direction={'column'} padding='10px'
                 backgroundImage={`url(${backgroundImage})`}
                 backgroundSize="cover"
                 backgroundPosition="center"
                 width="100wh"
                 height="100vh" // Set the desired height
                 >
                <Text as='h1' p='10px'>
                    We'll Do The SOAP Note
                </Text>
                <Text p='10px'>
                    Freed listens, transcribes, and writes medical documentation for you
                </Text>
                <Flex justifyContent={'center'}>
                    <Button p='10px' variant='outline'>
                        Get Started
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}