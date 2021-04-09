import React from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "./header/header";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import StreamDelete from "./streams/StreamDelete";
import history from "../history";
const App = () => {
  const routes = (
    <Switch>
      <Route path="/" exact component={StreamList} />
      <Route path="/stream/new" exact component={StreamCreate} />
      <Route path="/stream/edit/:id" exact component={StreamEdit} />
      <Route path="/stream/delete/:id" exact component={StreamDelete} />
      <Route path="/stream/:id" exact component={StreamShow} />
      <Redirect to="/" />
    </Switch>
  );
  return (
    <div className="ui container">
      <Router history={history}>
        <Header />
        {routes}
      </Router>
    </div>
  );
};

export default App;
