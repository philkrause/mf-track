import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Info from './components/Info'
import Data from './components/Data'
import MapData from './components/MapData'
import Header from './components/Header'
import History from './components/History'
import HistoryMap from './components/HistoryMap'
import About from './components/About'
import auth from './auth'
import axios from 'axios'




export default class App extends Component {
  static displayName = App.name;


  componentWillMount() {
    // if (auth.isAuthenticated()) {
    //   axios.defaults.headers.common = {
    //     Authorization: auth.authorizationHeader()
    //   }
    // }
  }

  render() {
    return (
      <section>

        <Header />
        <Switch>
          <Route path="/login" render={() => auth.login()} />
          <Route
            path="/logout"
            render={() => {
              auth.logout()
              return <p />
            }}
          />
          <Route
            path="/callback"
            render={() => {
              auth.handleAuthentication(() => {
                axios.defaults.headers.common = {
                  Authorization: auth.authorizationHeader()
                }
              })
              return <p />
            }}
          />
          <Route path='/' exact component={Data} />
          <Route path='/flightmap/:flighticao' exact component={MapData} />
          <Route path='/userflighthistory' exact component={History} />
          <Route path='/info' exact component={Info} />
          <Route path='/about' exact component={About} />
          <Route path='/historymap/:icao' exact component={HistoryMap} />

        </Switch>

      </section>

    );
  }
}
