<template>
  <div id="app">
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item sub-title" href="#">
    <img alt="Vue logo" src="./assets/fortiate_logo.png">
	    <!--      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item"><router-link to="/">Home</router-link></div>
    <h3>Situation And Transaction Simulator</h3>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
<!--
    <div id="nav" v-if=true>
      <router-link to="/">Home</router-link> |
      <router-link to="/transit">Transit</router-link> | 
      <router-link to="/generator">Generator</router-link>
    </div>
-->    
    <router-view/>

<div class="hero-foot">
<header class="navbar is-fixed-bottom has-shadow" style="background : black">
  <div class="container">

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item"><router-link to="/">Home</router-link></div>
      <div class="navbar-item" v-if="isAuthorized"><router-link to="/transit">Transit</router-link></div>
      <div class="navbar-item" v-if="isAuthorized"><router-link to="/generator">Generator</router-link></div>
      <div class="navbar-item" v-if="isLoggedIn"><a @click="logout">Logout</a></div>
      <div class="navbar-item" v-else><router-link to="/login">Login</router-link></div>
    </div>
  </div>

  </div>
</header>  
</div>	  

</div>
</template>

<script>
export default {
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



<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
