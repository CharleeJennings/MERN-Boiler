import express from 'express';
import {renderToString} from 'react-dom/server';
import {matchPath , StaticRouter } from 'react-router-dom';
import routes from '../shared/routes'
import App from '../shared/App';
import React from 'react'



const app = express()

app.use(express.static('public'))

app.get('*', (req, res ,next) => {

const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

const markup = renderToString(
	<StaticRouter location= {req.url} context= {{}}>
		<App/>
	</StaticRouter>
	)

	res.send (`
		<!DOCTYPE html>
		<html>
			<head>
			<title> User Mern-Stack </title>
			<script src = '/bundle.js' defer> </script>
			</head>

			<body>
				<div id = 'app'> ${markup}</div>
			</body>
		</html>`)
});

app.listen (3000 , () => console.log('Listening to port 3000'))