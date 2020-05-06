import { createMuiTheme } from '@material-ui/core/styles';

// const defaultTheme = createMuiTheme();

export default () => {
    return createMuiTheme({
        palette: {
            primary: {
                light: '#338761',
                main: '#01693a',
                dark: '#004928',
                contrastText: '#fff',
            },
            secondary: {
                light: '#741122',
                main: '#a71931',
                dark: '#b8475a',
                contrastText: '#fff',
            }
        }
    })
};