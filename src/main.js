import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './../node_modules/bulma/css/bulma.css'
import './../node_modules/bulma-tooltip/dist/css/bulma-tooltip.min.css'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//import { FontAwesome } from '@fortawesome/fontawesome-free'
import './../node_modules/@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

//Vue.component('font-awesome-icon', FontAwesomeIcon)

var isLoggedMixin = {
  methods: {
    checkIfLogged(){
        var vm = this;

	const axios = require('axios');
        
	return new Promise((resolve, reject) => {
          axios.get(process.env.VUE_APP_FORTIATE_DEMO_URL + '/sessionStatus', {withCredentials: true})
             .then(response => {
		     console.log(response.data.user);
                resolve(response.data.user);
             })
             .catch(error => {
                reject(error.response.data);
             });
        })
        
    }
  }
}

export default isLoggedMixin;

new Vue({
  router,
  store,
  mixins:[isLoggedMixin],
  data: {
        user: false
  },
  created(){
        this.checkIfLogged()
            .then(response => {
		    console.log("in check");
                    this.user = response ? response : false;
		    console.log(this.user);
                })
            .catch(error => console.log(error));
    },
//  render: h => h(App)
 render: function (createElement) {
//  if (this.user) {
  if (true) {
      return createElement(App)
  } else {
        console.log('In render else')
//      return createElement('a','NOT LOGGED IN')
//	 return      this.$router.push('http://demode48.fortiate.loc')
//	return this.$router.go('http://demode48.fortiate.loc');
//	 return createElement('window.location.href', 'http://demode48.fortiate.loc');
	
return createElement('a', {
    attrs: {
      href: process.env.VUE_APP_DEMO_DE48_URL
    }
  }, 'Please Sign In')

  }
}
}).$mount('#app')
