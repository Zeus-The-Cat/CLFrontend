import React,{Fragment} from 'react';
import styles from './subcomponents.module.css';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';


const Info = (modalID,updateModalContent,toggleModal) => {

	const handleInfoClick = () => {
		updateModalContent(modalID);
		toggleModal();
	};
	return(
		<Fragment>
			<div onClick={handleInfoClick} className={styles.infoContainer}>
				<InfoSharpIcon className={styles.info}
				aria-describedby={modalID}
				 />
			<span>Help</span>
			</div>
		</Fragment>
	)
}

export default Info;
