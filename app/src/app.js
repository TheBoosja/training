import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Components
import StartPage from './pages/Startpage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Training from './pages/Training';

class App extends Component {
	render() {
		return (
			<div>
				<Navbar />

				<Route path='/' exact component={StartPage} />
				<Route path='/login' component={Login} />
				<Route path='/training' component={Training} />
			</div>
		);
	}
}

export default App;
