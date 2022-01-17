import { createMuiTheme } from '@material-ui/core/styles'

const Theme = createMuiTheme({
    props:{
        MuiButtonBase:{
            disableRipple:true,
        }
    },
    transitions: {
        duration:{
            shortest:150,
            shorter:200,
            short:250,
            standard:300,
            complex:375,
            enteringScreen:225,
            leavingScreen:195,
        },
        easing:{
            // This is the most common easing curve.
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            // Objects enter the screen at full velocity from off-screen and
            // slowly decelerate to a resting point.
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            // Objects leave the screen at full velocity. They do not decelerate when off-screen.
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            // The sharp curve is used by objects that may return to the screen at any time.
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)', 
        }
    },
    palette:{
        background:{
            paper:'#fff',
            main:'#BAD4DE'
        },
        primary:{
            main:'#1976d2',
        },
        secondary:{
            main:'#33312E'
        },
        warning:{
            main:'#D56062'
        },
    },
});

export default Theme;