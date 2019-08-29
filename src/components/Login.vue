<template>
<div class="field is-horizontal">
	<form class="login" @submit.prevent="login">
	<div class="field-body">	
	<div class="field">
  		<div class="control has-icons-left">
    		<input  v-model="email" class="input" id="email" type="email" name="email" placeholder="Email" required autofocus>
    		<span class="icon is-left"><i class="fa fa-envelope"></i></span>
  		</div>
	</div>
	<div class="field">
  		<div class="control has-icons-left">
    		<input v-model="password"  class="input" id="password" type="password" name="password" placeholder="Password" required>
    		<span class="icon is-left"><i class="fa fa-lock"></i></span>
  		</div>
	</div>
	<div class="field">
  		<p class=" has-text-centered">
		<button class="button is-dark">Login</button>
  		</p>
	</div>
	</div>
	</form>
</div>	
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

