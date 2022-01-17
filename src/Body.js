import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navigation from '_components/Navigation';
import Theme from 'Theme'

const Bills = lazy(()=> import('_components/Bills'));
const CompareLeg = lazy(()=> import('_components/CompareLeg'));
const Contact = lazy(()=> import('_components/Contact'));
const About = lazy(()=> import('_components/About'));
const Home = lazy(()=> import('_components/Home'));

const Body = () => {

    return (
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Suspense fallback={<div>Loading...try refreshing if waiting longer than 5 seconds</div>}>
            <Navigation />
            <Switch>
              <Route exact path ="/" component={Home} />
              <Route path="/Bills" component={Bills}/>
              <Route path="/CompareLeg" component={CompareLeg} />
              <Route path="/Contact" component={Contact} />
              <Route path="/About" component={About} />
              <Route path="/Home" component={Home} />
            </Switch>
          </Suspense>
        </ThemeProvider>
    );
};

export default Body;
