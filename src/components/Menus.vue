<template>
	<div>
		<nav class="navbar is-dark">
		  <!-- navbar brand, navbar menu... -->
		</nav>
	<div class="section">	
	<div class="column is-1">
	    <aside class="menu is-pulled-left">
		<p class="menu-label">
			<a @click="createurl('access_home')">
				<div class="box has-background-dark tooltip" data-tooltip="Dashboard" >
					<span class="icon has-text-white"><i class="fas fa-2x fa-home"></i></span>
				</div>
			</a>
			<hr>
		</p>
		<p class="menu-label">
			<a @click="createurl('access_care')">
				<div class="box has-background-dark tooltip" data-tooltip="CARE" >
					<span class="icon has-text-white"><i class="fas fa-2x fa-suitcase"></i></span>
				</div>
			</a>
			<hr>
		</p>
		<p class="menu-label">
			<a @click="createurl('access_alarm')">
				<div class="box has-background-dark tooltip" data-tooltip="ALARM" >
					<span class="icon has-text-white"><i class="fas fa-2x fa-users"></i></span>
				</div>
			</a>
			<hr>
		</p>
		<p class="menu-label">
			<a @click="createurl('access_aim')">
				<div class="box has-background-dark tooltip" data-tooltip="AIM" >
					<span class="icon has-text-white"><i class="fas fa-2x fa-code-branch"></i></span>
				</div>
			</a>
			<hr>
		</p>
		<p class="menu-label">
			<a @click="createurl('access_sats')">
				<div class="box has-background-dark tooltip" data-tooltip="SATS">
					<span class="icon has-text-white"><i class="fas fa-2x fa-atom"></i></span>
				</div>
			</a>	
			<hr>
		</p>
		<p class="menu-label">
			<a @click="createurl('access_metl')">
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
    createurl: function(module) {
      this.$store
        .dispatch(module)
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
