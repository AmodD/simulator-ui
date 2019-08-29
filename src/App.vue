<template>
  <div id="app">
<section class="hero is-link is-fullheight-with-navbar">
  <div class="hero-body">
      <router-view/>
  </div>	      
  <div class="hero-foot">
<header class="navbar is-fixed-bottom has-shadow" style="background : black">
  <div class="container">

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item"><router-link to="/">
	<span class="icon"><i class="fas fa-atom fa-spin"></i></span>&nbsp;&nbsp;SATS</router-link>
      </div>
      <div class="navbar-item" v-if="isAuthorized"><router-link to="/">
	<span class="icon has-text-success"><i class="fas fa-sitemap"></i></span>&nbsp;&nbsp;Situation</router-link>
      </div>
      <div class="navbar-item" v-if="isAuthorized"><router-link to="/generator">
	<span class="icon has-text-warning"><i class="fas fa-cog"></i></span>&nbsp;&nbsp;Generator</router-link>
      </div>
      <div class="navbar-item" v-if="isAuthorized"><router-link to="/transit">
	<span class="icon has-text-danger"><i class="fas fa-cogs"></i></span>&nbsp;&nbsp;Simulator</router-link>
      </div>
      <div class="navbar-item" v-if="isAuthorized"><router-link to="/">
	<span class="icon has-text-info"><i class="fas fa-server"></i></span>&nbsp;&nbsp;Transactions</router-link>
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
export default {
  components: {
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
