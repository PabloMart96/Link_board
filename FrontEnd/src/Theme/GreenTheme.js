import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const GreenTheme = createTheme({
    palette: {
        primary: {
            main: '#222831'
        },
        secondary: {
            main: '#D8D8D8'
        },
        error: {
            main: red.A400
        }
    },
    typography: {
        fontFamily: 'Arimo',
    }
})
