<template>
 <div class="column is-half is-offset-one-quarter">

	<form class="login" @submit.prevent="login">
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
		<button class="button is-success">Login</button>
  		</p>
	</div>
	</form>

<!--   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>Email</label>
     <input required v-model="email" type="email" placeholder="Name"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
</form> -->
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

