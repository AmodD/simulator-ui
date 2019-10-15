<template>
  <div id="app">
	<Menus v-if="isLoggedIn"/>	  
<section class="hero  is-fullheight-with-navbar">
  <div class="hero-body">
      <router-view/>
  </div>	      
  <div class="hero-foot">
<header class="navbar is-fixed-bottom has-shadow">
  <div class="container">

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start has-text-centered">
      <div class="navbar-item tooltip" data-tooltip="SATS"><router-link to="/">
	<span class="icon has-text-grey"><i class="fas fa-atom "></i></span></router-link>
      </div>
      <div class="navbar-item tooltip" data-tooltip="Situations" v-if="isAuthorized"><router-link to="/">
	<span class="icon has-text-grey"><i class="fas fa-sitemap"></i></span></router-link>
      </div>
      <div class="navbar-item tooltip" data-tooltip="Generator" v-if="isAuthorized"><router-link to="/generator">
	<span class="icon has-text-grey"><i class="fas fa-cog"></i></span></router-link>
      </div>
      <div class="navbar-item tooltip" data-tooltip="Transit Demo" v-if="isAuthorized"><router-link to="/transit">
	<span class="icon has-text-grey"><i class="fas fa-train"></i></span></router-link>
      </div>
      <div class="navbar-item tooltip" data-tooltip="Transactions" v-if="isAuthorized"><router-link to="/">
	<span class="icon has-text-grey"><i class="fas fa-server"></i></span></router-link>
      </div>
      <!-- <div class="navbar-item" v-if="isLoggedIn"><a @click="logout">Logout</a></div> -->
      <div class="navbar-item" v-else><Login /></div>
    </div>
  </div>

  </div>
</header>
</div>
</section>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Menus from '@/components/Menus.vue'
export default {
  components: {
	Menus,
      	Login
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isAuthorized: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
