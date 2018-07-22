import Home from './Home'
import Login from './Login'




const routes = [

{
	path: '/',
	exact: true,
	component: Home,
},
{
	path: '/Login',
	exact: true,
	component: Login,
}

]



export default routes