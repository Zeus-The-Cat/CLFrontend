import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	helpContent:{
		flexGrow:1,
	},modal:{
	  position: 'fixed',
	  zIndex: 1,
	  top:0,
	  width: '100%',
	  height: '100%',
	  background: 'rgba(0, 0, 0, 0.25)',
  	},modal_content:{
	  position: 'absolute',
	  top: '20%',
	  left: '30%',
	  width: '40%',
	  padding: '20px',
	  borderRadius: '5px',
	  background:theme.palette.background.default,
	  textAlign:'center',
    },close:{
	  fontSize:'small',
	  float: 'right',
	  '&:hover':{
	  cursor: 'pointer',
  	  }
  }
}));
const ExampleModal = (toggle) => {
	const classes = useStyles();
	const closeModal = (toggle) => {
		toggle();
	}
	return (
	    <div className={classes.modal}>
	     	<div className={classes.modal_content}>
				<IconButton
			 	   onClick={()=>{closeModal(toggle)}}
			 	   aria-label="Close Modal"
			 	   className={classes.close}
			 	>
			 		<CloseIcon fontSize="small"></CloseIcon>
			 	</IconButton>
				<h3> This is an example modal! <br />
				Click the close button to close this screen
				</h3>
	    	</div>
	    </div>
  	);
}
export default ExampleModal;
