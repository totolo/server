import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
const DashBoard = () => <h2>DashBoard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends React.Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header/>
            <Route path="/" exact component={Landing}/>
            <Route path="/surveys" exact component={DashBoard}/>
            <Route path="/surveys/new" exact component={SurveyNew}/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App);