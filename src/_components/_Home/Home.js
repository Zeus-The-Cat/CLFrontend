import React,{Fragment} from 'react';
import styles from './styles.module.css';
import tablet from './tablet.module.css';

import useMediaQuery from '@material-ui/core/useMediaQuery';
//Dark Mode
//https://www.pullrequest.com/blog/create-a-persisting-dark-mode-with-react/

import HomepageCard from './homeCard.js';

const Home = () => {
	const compareText = `Compare the voting
	history, committee history, and legislative history of the politicans
	that represent you. This feature is in active development and prone to frequent changes`;
	const billsText = `Search for specific house and senate bills.
	We will provide you with detailed information about their sponsors,
	amendments, and propogation through the legislative process`;
	// const aboutUsText = `Learn more about Clear Legislation.
	// We are committed to creating a world where politicians
	// are held accountable and the legislative process works for all of us`;

	//Media Query Logic---------------------------------------------------------
	const tabletMQ = useMediaQuery('(max-width:768px)');

    //Changing opacity/any css -------------------------------------------------
	// function Text(passedText) {
	//   const [flip, set] = useState(false)
	//   const props = useSpring({
	//     to: { opacity: 1 },
	//     from: { opacity: 0.35 },
    //   delay:300,
	//     reset: true,
	//     reverse: flip,
	//     config: {...config.slow,friction:80},
	//     onRest: () => set(!flip),
	//   })
    //
	//   return <animated.div style={props}>{passedText}</animated.div>
	// }

  return (
    <Fragment>
      <div className={styles.homepage}>
		<div className={styles.explore}>
			Clear <span className={styles.fontA}>Legislation</span>
		</div>
        <div className={styles.title}>
          Your source for public United States legislative data
        </div>
      </div>
      <div className={styles.homepage}>
        <div className={styles.title}>

        </div>
        <div className={tabletMQ?(styles.homepageCardContainer,tablet.homepageCardContainer):styles.homepageCardContainer}>
	        {HomepageCard('Bills','Search Bills',billsText)}
			{HomepageCard('CompareLeg','Legislator v.s. Legislator',compareText)}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
