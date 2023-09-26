import { defineStyleConfig } from '@chakra-ui/react'
export const Button = defineStyleConfig({
    baseStyle:{
        color:'blue'
    },
    variants: {
        outln: (props) => ({
            color: 'red',
        }),
    },
    
});
