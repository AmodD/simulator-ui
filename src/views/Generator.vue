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
		      Fortiate Data Solutions
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
			          <select v-model="network" required>
			            <option value="" selected disabled>Select a Network</option>
			            <option value="rupay">Rupay</option>
			            <option disabled value="visa">Visa</option>
			            <option disabled value="mastercard">Mastercard</option>
			            <option disabled value="iso8583-87">ISO8583-87</option>
			            <option disabled value="iso8583-93">ISO8583-93</option>
			            <option disabled value="iso8583-2003">ISO8583-2003</option>
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
			 <div class="field is-horizontal">
			  <div class="field-label is-normal">
			    <label class="label">MTI</label>
			  </div>
			  <div class="field-body">
			    <div class="field is-narrow">
			      <div class="control">
			        <div class="select is-fullwidth">
			          <select v-model="mti" required>
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
			 </div>
			 <div class="field is-horizontal">
			  <div class="field-label is-normal">
			    <label class="label">Transaction Type</label>
			  </div>
			  <div class="field-body">
			    <div class="field is-narrow">
			      <div class="control">
			        <div class="select is-fullwidth">
			          <select v-model="txntype" required>
			            <option value="" selected disabled>Any</option>
			            <option value="purchase" v-if="network == 'rupay'">Purchase</option>
			            <option value="balance_enquiry" v-if="network == 'rupay'">Balance Enquiry</option>
			          </select>
			        </div>
			      </div>
			    </div>
			  </div>
			  </div>
			  <div class="field is-horizontal">
  <div class="field-label">
    <!-- Left empty for spacing -->
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button is-warning is-rounded"  v-on:click="onSubmit()">
          Generate message
        </button>
      </div>
    </div>
  </div>
</div>
		</div>

<div class="column">
<div class="field is-horizontal">
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

<div class="notification">
	{{ isoMessage }}
	{{ isomessages }}
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

    <div class="section">
<div class="notification">
	{{ isoMessage }}
	{{ isomessages }}
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
		"isomessages":"",
		"de2" : "",
		"de3" : ""
	}
  },
  computed: {
    // a computed getter
    isoMessage: function () {

return "ISO Message - ";
    }
  },
methods : {
	onSubmit(){

		const axios = require('axios');
		let self = this ;

		axios.get(process.env.VUE_APP_DATA_GENERATOR_URL + '/' + this.mti  + '/' + this.network + '/' + 'purchase')
		     .then(function (response) {
			// handle success
		      console.log(response.data.deHMJson);  
		    self.de2 = response.data.deHMJson.de2;
		    self.de3 = response.data.deHMJson.de3;
		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		    console.log("calling isomessages");
		axios.get(process.env.VUE_APP_DATA_GENERATOR_URL + '/isomessages')
		.then(response => self.isomessages = response.data)
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
