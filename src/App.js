import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import ScrollIntoView from "./components/ScrollIntoView";
import Post from './components/Post';
import Recent from './routes/Recent';
import Work from './routes/Work';
import Study from './routes/Study';
import Blog from './routes/Blog';
import Notfound from './routes/Notfound';
import Nav from './components/Nav';
import './css/layout.scss'


function App() {

  return (
    <HashRouter basename="/wp-graphql">
      <ScrollIntoView>
        <div className="wrap">
          <Nav />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Recent} />
              <Route exact path="/work" component={Work} />
              <Route exact path="/study" component={Study} />
              <Route exact path="/blog" component={Blog} />
              <Route path="/work/:id" component={Post} />
              <Route path="/study/:id" component={Post} />
              <Route path="/blog/:id" component={Post} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </div>
      </ScrollIntoView>
    </HashRouter>
  );
}

export default App;
