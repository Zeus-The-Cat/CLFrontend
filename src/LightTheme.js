import { createTheme } from '@material-ui/core/styles'

const LightTheme = createTheme({
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
    overrides: {
        // Name of the component
        MuiFormLabel: {
            // Name of the slot
            root: {
              // Some CSS
              color: '#000000',
            },
        },
    },
    palette:{
		type:'light',
		common:{
			white:'#FFF',
			black:'#000',
		},
		background:{
			default:'#f6f8fa',
			paper:'#fff',
		},
        primary:{
            main:'#77bfe0',
			light: '#b4ffff',
			dark:'#3bacb8',
        },
        secondary:{
            main:'#ffb74d',
			light:'#ffe97d',
			dark:'#c88719',
        },
        warning:{
            main:'#D56062'
        },
		text:{
			primary:'#000000',
			secondary:'#ffffff',
			disabled:'rgba(0, 0, 0, 0.38)'
		}
    },
	spacing:5,
});

export default LightTheme;
