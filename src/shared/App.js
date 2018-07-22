import React from 'react';
import routes from './routes'
import {Route, Switch} from 'react-router-dom'

export default class App extends React.Component
{
	render()
	{
		return( 
		<div> 
		<Switch>
		          {routes.map(({ path, exact, component: Component, ...rest }) => (
            		<Route key={path} path={path} exact={exact} render={(props) => (
              		<Component {...props} {...rest} />
            			)} />
          ))}
		</Switch>
		 </div> ); 
	}
}