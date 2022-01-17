import React,{useEffect,useState,Fragment} from 'react';
import styles from './DakotahPettry.module.css';
import TerminalWriter from './TerminalWriter';
import TerminalText from './terminaldata';

import Button from './Button'

const DakotahPettry = (props) => {
    const [order, setOrder] = useState([false,false,false,false,false,
                                        false,false,false,false,false,
                                        false,false,false])
    // const delay = [500,1250,0,0,0,0,0,0,0,0,10000,1750,1000]
    const delay = [0,0,0,0,0,0,0,0,0,0,0,0,0]

    const setTerminalCursor = (currentController,nextController) => {
        // Changes cursor location pass setState
        currentController(false)
        nextController(true)
    }

    useEffect(()=>{
        async function startWriting(){
            let temp = [...order]
            temp[0] = true
            setOrder(temp)
        }
        setTimeout(async ()=>{
            startWriting()
        },1000)
    },[])

	return(
        <div className={styles.container}>
            <div className={styles.terminal}>
                {
                    order.map((item, i) => {
                        return(
                            <Fragment key={i}>
                                <TerminalWriter
                                    order={order}
                                    setOrder={setOrder}
                                    index={i}
                                    text={TerminalText[i]}
                                    delay={delay} />
                                    <br />
                            </Fragment>
                            )
                    })
                }
                <div className={styles.buttons}>
                    <Button> Work History </Button>
                    <Button> Interests </Button>
                    <Button> Course Work </Button>
                </div>
            </div>
        </div>
	)
}

export default DakotahPettry;
