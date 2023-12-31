import { foundations } from './foundations';
import { components } from './components';
import { extendTheme } from '@chakra-ui/react';
export const theme = extendTheme({
    components,
    ...foundations,
});
