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

			  <div class="field-label is-normal">
			    <label class="label">MTI</label>
			  </div>
			  <div class="field-body">
			    <div class="field is-narrow">
			      <div class="control">
			        <div class="select is-fullwidth">
			          <select v-on:change="networkSet(network)" v-model="mti" required>
			            <option value="" selected disabled>Select MTI</option>
			            <option value="0100">0100</option>
			            <option value="0110">0110</option>
			            <option value="0120">0120</option>
			            <option value="0121">0121</option>
			          </select>
			        </div>
			      </div>
			    </div>
			  </div>


			  <div class="field-label is-normal">
			    <label class="label">Transaction_Type</label>
			  </div>
			  <div class="field-body">
			    <div class="field is-narrow">
			      <div class="control">
			        <div class="select is-fullwidth">
			          <select v-on:change="onSubmit(txntype)" v-model="txntype" required>
			            <option value="" selected disabled>Random</option>
			            <option value="purchase" v-if="network == 'rupay'">Purchase</option>
			            <option value="balance_enquiry" v-if="network == 'rupay'">Balance Enquiry</option>
			          </select>
			        </div>
			      </div>
			    </div>
			  </div>

			  <div class="field-label is-normal">
			    <label class="label">TCP_Header</label>
			  </div>
			  <div class="field-body">
      <p class="control is-expanded has-icons-left">
        <input class="input" type="text" placeholder="e.g. 324.121.34.85">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
		</div>



  <div class="field-label is-normal">
    <label class="label">IP</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control is-expanded has-icons-left">
        <input class="input" type="text" placeholder="e.g. 324.121.34.85">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>
  <div class="field-label is-normal">
    <label class="label">Port</label>
  </div>
    <div class="field">
      <p class="control is-expanded has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="e.g. 8080">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
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
		        <input class="input" type="text" placeholder="Processing Code" v-model="de3">
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
		"mti" : "",
		"txntype" : "",
		"de2" : "",
		"de3" : ""
	}
  },
methods : {
	onSubmit(txntype){

		const axios = require('axios');

		axios.get(process.env.VUE_APP_DATA_GENERATOR_URL + '/' + this.network + '/' + txntype)
		     .then(function (response) {
			// handle success
		      console.log(response);  
		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		  });


	},
	networkSet(network){
		//console.log("selected network - " + network);
		//console.log("data generator url - " + process.env.VUE_APP_DATA_GENERATOR_URL);

		let self = this ;

		const axios = require('axios');

		axios.all([
			 axios.get(process.env.VUE_APP_DATA_GENERATOR_URL + '/de2?network=' + this.network),
			 axios.get(process.env.VUE_APP_DATA_GENERATOR_URL + '/de3?network=' + this.network)
			])
		  .then(axios.spread(function (de2, de3) {
		    // Both requests are now complete
		    //console.log(de3.data.value);
		    self.de2 = de2.data.value;
		    self.de3 = de3.data.value;
		  }));



		// Make a request for a user with a given ID
		//axios.get(process.env.VUE_APP_DATA_GENERATOR_URL + '/de2', {
		//	    params: {
		//	      network: this.network
		//	    }
		//    })
		//.then(response => this.de2 = response.data.value)
//  .then(function (response) {
// handle success
//    console.log(response);  
//  })
		 // .catch(function (error) {
		    // handle error
		 //   console.log(error);
		 // })
		 // .then(function () {
		    // always executed
		 // });
	}
  }
}
</script>
