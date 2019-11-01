<template>
	<div>
		<nav class="navbar is-dark">
		  <!-- navbar brand, navbar menu... -->
		      <div class="navbar-end">
		      <div id="logout" class="navbar-item">
			<a @click="storeAction('logout')">
				<span class="icon has-text-danger"><i class="fas fa-sign-out-alt"></i></span>
			</a>
		      </div>
	     	      </div>	      
		</nav>
	<div class="section">	
	<div class="column is-1">
	    <aside class="menu is-pulled-left">
		<p class="menu-label">
			<a @click="storeAction('access_home')">
				<div class="box has-background-dark tooltip" data-tooltip="Dashboard" >
					<span class="icon has-text-white"><i class="fas fa-2x fa-home"></i></span>
				</div>
			</a>
			<hr>
		</p>
		<p class="menu-label">
			<a @click="storeAction('access_care')">
				<div class="box has-background-dark tooltip" data-tooltip="CARE" >
					<span class="icon has-text-white"><i class="fas fa-2x fa-suitcase"></i></span>
				</div>
			</a>
			<hr>
		</p>
		<p class="menu-label">
			<a @click="storeAction('access_alarm')">
				<div class="box has-background-dark tooltip" data-tooltip="ALARM" >
					<span class="icon has-text-white"><i class="fas fa-2x fa-users"></i></span>
				</div>
			</a>
			<hr>
		</p>
		<p class="menu-label">
			<a @click="storeAction('access_aim')">
				<div class="box has-background-dark tooltip" data-tooltip="AIM" >
					<span class="icon has-text-white"><i class="fas fa-2x fa-code-branch"></i></span>
				</div>
			</a>
			<hr>
		</p>
		<p class="menu-label">
			<a @click="storeAction('access_sats')">
				<div class="box has-background-dark tooltip" data-tooltip="SATS">
					<span class="icon has-text-white"><i class="fas fa-2x fa-atom"></i></span>
				</div>
			</a>	
			<hr>
		</p>
		<p class="menu-label">
			<a @click="storeAction('access_metl')">
				<div class="box has-background-dark tooltip" data-tooltip="METL">
					<span class="icon has-text-white"><i class="fab fa-2x fa-hubspot"></i></span>
				</div>
			</a>	
			<hr>
		</p>
	    </aside>	
	</div>	   
	</div>	
<header class="navbar is-fixed-bottom  has-background-dark">
  <div class="container">

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    </div>
  </div>

  </div>
</header>
</div>
</template>

<script>
export default {
  name: 'Menus',
  data() {
    return {
      token: "",
    };
  },
  methods: {
    storeAction: function(action) {
      this.$store
        .dispatch(action)
	.then(() => { })
	.catch(err => console.log(err));
    }
  },
  computed: {
    satsurl: function() {
      return "http://localhost:48100/sso?token=" + this.$store.getters.tokenValue ;
    },
  },
}
</script>
