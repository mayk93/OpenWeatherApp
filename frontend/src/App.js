import React, {Component} from 'react';
import logo from './assets/sun_and_cloud.png';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainApp from './containers/MainApp'
import Footer from './components/Footer'

import './App.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Open Weather App</h2>
                    </div>
                    <MainApp />
                    <Footer />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
