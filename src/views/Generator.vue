<template>
  <div class="generator">
	<section class="section">
			 <div class="columns">
			  <div class="column"> 
			   <div class="field is-narrow">
			    <div class="control">
			     <div class="select is-fullwidth">
			          <select v-model="network" v-on:change="networkNotSelected = false;" required>
			            <option value="" selected disabled>Select a Network</option>
			            <option value="rupay">Rupay</option>
			            <option value="myfinity">MyFinity Switch</option>
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
			 <span class="help is-danger" v-if="networkNotSelected">Please Select A Network</span>
			</div>
			<div class="column">
	  	         <div class="field is-narrow">
			   <div class="control">
			     <div class="select is-fullwidth">
			          <select v-model="mti" required>
			            <option value="" selected disabled>Select MTI</option>
				    <option value="0200" v-if="network == 'myfinity'">0200 Financial Transaction Request</option>
			            <option value="0210" v-if="network == 'myfinity'">0210 Financial Transaction Response</option>
				    <option value="0220" v-if="network == 'myfinity'">0220 Advice Transaction Request</option>
			            <option value="0230" v-if="network == 'myfinity'">0230 Advice Transaction Response</option>
				    <option value="0320" v-if="network == 'myfinity'">0320 Batch Upload Transaction Request</option>
			            <option value="0330" v-if="network == 'myfinity'">0330 Batch Upload Transaction Response</option>
				    <option value="0500" v-if="network == 'myfinity'">0500 Settlement Transaction Request</option>
			            <option value="0510" v-if="network == 'myfinity'">0510 Settlement Transaction Response</option>
				    <option value="0800" v-if="network == 'myfinity'">0800 Network Management Administration Transaction Request</option>
			            <option value="0810" v-if="network == 'myfinity'">0810 Network Management Administration Transaction Response</option>
				    <option v-if="network == 'rupay'" value="0100">0100</option>
			            <option disabled v-if="network == 'rupay'" value="0110">0110</option>
			            <option disabled v-if="network == 'rupay'" value="0120">0120</option>
			            <option disabled v-if="network == 'rupay'" value="0121">0121</option>
			          </select>
			     </div>
			   </div>
			 </div>
			</div>
			<div class="column">
			 <div class="field is-narrow">
			  <div class="control">
			    <div class="select is-fullwidth">
			          <select v-model="txntype" required>
			            <option value="any" selected disabled>Select Transaction Type</option>
			            <option value="purchase" v-if="network == 'rupay'">Purchase</option>
			            <option value="balance_enquiry" v-if="network == 'rupay'">Balance Enquiry</option>
			            <option value="advise" v-if="network == 'myfinity'">Advise</option>
			            <option value="sale" v-if="network == 'myfinity'">Sale</option>
			            <option value="balance_enquiry" v-if="network == 'myfinity'">Balance Enquiry</option>
			          </select>
			    </div>
			   </div>
			 </div>
			</div>
		     </div>
        	    <button class="button is-warning is-rounded"  v-on:click="generateData()">Generate Data Elements</button>
    
		    <div v-if="dataElements" class="section">
		      <div class="box">	   
	     		<div v-for="de in dataElements" class="field is-horizontal">
			  	<div class="field-label is-normal">
				<span class="content is-small">{{de.shortName}}</span>
		  		</div>
		  	<div class="field-label is-normal">
			<label class="label">DE{{de.id}}</label>
			</div>
		  	<div class="field-body">
		    		<div class="field">
		      		<p class="control is-expanded">
		        	<input class="input" type="text" v-model="de.value" disabled>
		        	<span class="is-small">
				<span class="content is-small">{{de.description}}</span>
		        	</span>
		      		</p>
		    	</div>
		      </div>
	            </div> 
                  </div>	 
                </div>	


           </section>	    
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
		"networkNotSelected" : false,
		"mti" : "",
		"txntype" : "any",
		"isomessages":"",
		"situations":"",
		"dehm" : "",
		"dataElements" : "",
	}
  },
  computed: {
    // a computed getter
    isoMessage: function () {
	return "ISO Message - ";
    },
  },
  methods : {
	generateData(){

		let networkURL = "";

		if(this.network == '') 
		{
			networkURL = "";
			this.networkNotSelected = true;
			return ;
		}
		else if(this.network == 'rupay')
		{
			networkURL = process.env.VUE_APP_FORTIATE_RUPAY_GENERATOR_URL;
		}
		else if(this.network == 'myfinity')
		{
			networkURL = process.env.VUE_APP_FORTIATE_MYFINITY_GENERATOR_URL;
		}

		const axios = require('axios');
		let self = this ;

		axios.get( networkURL  + '/transaction/' +  this.txntype)
		     .then(function (response) {
		     // handle success
		      self.dataElements = response.data.dataElements;
		      console.log(response.data.dataElements);  
		      //self.de2 = response.data.dataElements.filter(function(item) { return item.id === 2; })[0];
		      self.dehm = response.data.deHM;
		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		    console.log("calling isomessages");
		  });


	},
  }
}
</script>
