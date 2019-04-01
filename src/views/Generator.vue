<template>
  <div class="generator">
    <h1></h1>
    <section class="hero is-primary">
  	<div class="hero-body">
	    <div class="container">
	      <h1 class="title">
	        Transaction Generator
	      </h1>
	      <h2 class="subtitle">
		      Fortiate
	      </h2>
	    </div>
	 </div>
    </section>

    <div class="section">
	 <div class="columns">
		 <div class="column">	 
			 <div class="field is-horizontal">
			  <div class="field-label is-normal">
			    <label class="label">Network</label>
			  </div>
			  <div class="field-body">
			    <div class="field is-narrow">
			      <div class="control">
			        <div class="select is-fullwidth">
			          <select v-on:change="networkSet(network)" v-model="network" required>
			            <option value="" selected disabled>Select a Network</option>
			            <option value="rupay">Rupay</option>
			            <option value="visa">Visa</option>
			            <option value="mastercard">Mastercard</option>
			            <option value="iso8583-87">ISO8583-87</option>
			            <option value="iso8583-93">ISO8583-93</option>
			            <option value="iso8583-2003">ISO8583-2003</option>
			            <option disabled>Amex</option>
			            <option disabled>Diners</option>
			            <option disabled>Cup</option>
			            <option disabled>JCB</option>
			          </select>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
		<div class="column">
		</div>	
	</div>
    </div>

    <div class="section">
      <div class="box">	   
	     <div class="field is-horizontal">
		  <div class="field-label is-normal">
		    <label class="label">DE2</label>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded has-icons-left">
		        <input class="input" type="text" placeholder="PAN" v-model="de2" disabled>
		        <span class="icon is-small is-left">
		          <i class="fas fa-user"></i>
		        </span>
		      </p>
		    </div>
		  </div>
		  <div class="field-label is-normal">
		    <label class="label">DE3</label>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded has-icons-left">
		        <input class="input" type="text" placeholder="Name">
		        <span class="icon is-small is-left">
		          <i class="fas fa-user"></i>
		        </span>
		      </p>
		    </div>
		  </div>
	     </div> 
      </div>	 
    </div>	 


  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  data(){
	return {
		"network" : "",
		"de2" : ""
	}
  },
methods : {
	networkSet(network){
		console.log("selected network - " + network);
		console.log("data generator url - " + process.env.VUE_APP_DATA_GENERATOR_URL);

		const axios = require('axios');
		// Make a request for a user with a given ID
		axios.get(process.env.VUE_APP_DATA_GENERATOR_URL + '/de2', {
			    params: {
			      network: this.network
			    }
		    })
		.then(response => this.de2 = response.data.value)
//  .then(function (response) {
// handle success
//    console.log(response);  
//  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		  });
	}
  }
}
</script>
