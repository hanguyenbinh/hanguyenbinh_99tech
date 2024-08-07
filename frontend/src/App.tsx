import React from 'react';
import logo from './logo.svg';
import './App.css';
//imoprt Route
import Route from "./routes"
import { ToastContainer } from 'react-toastify';
function App() {
  return (
		<React.Fragment>
			<Route />
			{/* <AlertDialog /> */}
			<ToastContainer></ToastContainer>
		</React.Fragment>
	)
}

export default App;
