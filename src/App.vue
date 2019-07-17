<template>
  <div id="app">
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item sub-title" href="https://bulma.io">
	    <!--      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
	    <strong> SIMULATOR </strong>
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="/">
        Home
      </a>
      <a class="navbar-item" href="/transit">
        SACU
      </a>
      <a class="navbar-item" href="/generator">
        ISO8583
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">
            Log in
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
  </div>
</template>
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
