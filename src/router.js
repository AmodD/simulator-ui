import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'
import Login from './components/Login.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
//      name: 'generator',
//      component: () => import(/* webpackChunkName: "generator" */ './views/Generator.vue')
    },
    {
      path: '/sso',
      name: 'login',
      component: Login,
            beforeEnter: (to, from, next) => {
		store.dispatch("sso",to.query.token);
		store.dispatch("verify");
		if (store.getters.isLoggedIn && store.getters.authStatus == 'success') 
		{
      			next('/')
      			return
    		}
    		else
		{
			next('/403')
			return
    		}
	next('/login')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/transit',
      name: 'transit',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Transit.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/generator',
      name: 'generator',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "generator" */ './views/Generator.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})



router.beforeEach((to, from, next) => {
	//alert("just checking - " + store.getters.authStatus );
	
	if(to.matched.some(record => record.meta.requiresAuth))
	{
		store.dispatch("verify");
		if (store.getters.isLoggedIn && store.getters.authStatus == 'success') 
		{
      			next()
      			return
    		}
    		else
		{
			next('/403')
			return
    		}
	next('/login')
  	} 
	else 
	{
    		next()
  	}
})


export default router
