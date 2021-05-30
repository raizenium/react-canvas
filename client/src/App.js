import React, { useState } from "react";
import Canvas from "./components/canvas";
import Setting from "./components/settingbar";
import Toolbar from "./components/toolbar";
import "./assets/bar.scss";
import "./assets/app.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  BrowserRouter,
  Redirect
} from "react-router-dom";

const App = () => {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:id">
          <div className="app">
            <Toolbar />
            <Setting />
            
            <Canvas />
          </div>
        </Route>
        <Redirect to={`f${(+new Date).toString(16)}`} />
      </Switch>
    </BrowserRouter>
  )
}
export default App;