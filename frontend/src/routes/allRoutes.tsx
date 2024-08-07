import React from "react"
import { Navigate } from "react-router-dom"
import Home from "../pages/Home"
import CoinExchange from "../pages/problem02/CoinExchange"
import Problem06 from "../pages/problem06/Problem06"
import Problem03 from "../pages/problem03/Problem03"


const publicRoutes = [

	{ path: "/home", component: Home },	
	{ path: "/coin-exchange", component: CoinExchange },
	{ path: "/problem03", component: Problem03 },
	{ path: "/problem06", component: Problem06 },

	
	{
		path: "/",
		// exact: true,
		component: () => <Navigate to="/home" />
	},
]

export { publicRoutes }