import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hydrate } from 'react-dom';
import ApolloClient from "apollo-boost";
import App from '../shared/App.js';
import {BrowserRouter} from 'react-router-dom';



const client = new ApolloClient({

	uri: 'localhost:3000'

});



hydrate(
	<BrowserRouter>
	<App/>
	</BrowserRouter>, document.getElementById('app')
)

