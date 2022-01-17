import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import './baseline.css';

// import CssBaseline from '@material-ui/core/CssBaseline';

import Navigation from './_components/_Navigation/Navigation';
import Footer from './_components/_Footer/Footer';
import Theme from './LightTheme'

const Bills = lazy(()=> import('./_components/_Bills/Bills'));
const CompareLeg = lazy(()=> import('./_components/_CompareLeg/CompareLeg'));
const Contact = lazy(()=> import('./_components/_Contact/Contact'));
const About = lazy(()=> import('./_components/_About/About'));
const Home = lazy(()=> import('./_components/_Home/Home'));
const DakotahPettry = lazy(()=> import('./_components/_DakotahPettry/DakotahPettry'));
const PrivacyPolicy = lazy(()=> import('./_components/_PrivacyPolicy/PrivacyPolicy'));

const App = () => {
    return (
        <ThemeProvider theme={Theme}>
          <Suspense fallback={<div>Loading...try refreshing if waiting longer than 5 seconds</div>}>
            <Navigation />
            <Switch>
              <Route exact path ="/" component={Home} />
              <Route path="/Bills" component={Bills}/>
              <Route path="/CompareLeg" component={CompareLeg} />
              <Route path="/Contact" component={Contact} />
              <Route path="/About" component={About} />
              <Route path="/Home" component={Home} />
s              <Route path="/DakotahPettry" component={DakotahPettry} />
			  <Route path="/PrivacyPolicy" component={PrivacyPolicy} />
            </Switch>
			<Footer />
          </Suspense>
        </ThemeProvider>
    );
};

export default App;
