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
			          <select v-model="network" v-on:change="networkNotSelected = false;" required>
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
			    <span class="help is-danger" v-if="networkNotSelected">Please Select A Network</span>
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
			            <option disabled value="0110">0110</option>
			            <option disabled value="0120">0120</option>
			            <option disabled value="0121">0121</option>
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
			            <option disabled value="balance_enquiry" v-if="network == 'rupay'">Balance Enquiry</option>
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
        <button class="button is-warning is-rounded"  v-on:click="generateData()">
          Generate Data Elements
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
</div>

</div>

</div>

    <div class="section">
      <div class="box">	   
	     <div class="field is-horizontal">
		  <div class="field-label is-normal">
		    <label class="label">DE2</label>
		    <span class="content is-small">{{de2.shortName}}</span>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded">
		        <input class="input" type="text" placeholder="PAN" v-model="de2.value" disabled>
		      </p>
		    </div>
		  </div>
		  <div class="field-label is-normal">
		    <label class="label">DE3</label>
		    <span class="content is-small">{{de3.shortName}}</span>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded">
		        <input class="input" type="text" placeholder="Processing Code" v-model="de3.value" disabled>
		        <span class="content is-small">{{de3.description}}</span>
		      </p>
		    </div>
		  </div>
	     </div> 
	     <div class="field is-horizontal">
		  <div class="field-label is-normal">
		    <label class="label">DE4</label>
		    <span class="content is-small">{{de4.shortName}}</span>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded">
		        <input class="input" type="text" placeholder="Transaction Amount" v-model="de4.value" disabled>
		      </p>
		    </div>
		  </div>
		  <div class="field-label is-normal">
		    <label class="label">DE18</label>
		    <span class="content is-small">{{de18.shortName}}</span>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded">
		        <input class="input" type="text" placeholder="Merchant Category Code" v-model="de18.value" disabled>
		        <span class="content is-small">{{de18.description}}</span>
		      </p>
		    </div>
		  </div>
	     </div> 
	     <div class="field is-horizontal">
		  <div class="field-label is-normal">
		    <label class="label">DE22</label>
		    <span class="content is-small">{{de22.shortName}}</span>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded">
		        <input class="input" type="text" placeholder="Point Of Service Entry Mode" v-model="de22.value" disabled>
		        <span class="content is-small">{{de22.description}}</span>
		      </p>
		    </div>
		  </div>
		  <div class="field-label is-normal">
		    <label class="label">DE41</label>
		    <span class="content is-small">{{de41.shortName}}</span>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded">
		        <input class="input" type="text" placeholder="Card Acceptor Terminal ID" v-model="de41.value" disabled>
		        <span class="content is-small">{{de41.description}}</span>
		      </p>
		    </div>
		  </div>
	     </div> 
	     <div class="field is-horizontal">
		  <div class="field-label is-normal">
		    <label class="label">DE42</label>
		    <span class="content is-small">{{de42.shortName}}</span>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded">
		        <input class="input" type="text" placeholder="Merchant Identifier - Card Acceptor ID" v-model="de42.value" disabled>
		        <span class="content is-small">{{de42.description}}</span>
		      </p>
		    </div>
		  </div>
		  <div class="field-label is-normal">
		    <label class="label">DE43</label>
		    <span class="content is-small">{{de43.shortName}}</span>
		  </div>
		  <div class="field-body">
		    <div class="field">
		      <p class="control is-expanded">
		        <input class="input" type="text" placeholder="Card Acceptor Name and Location" v-model="de43.value" disabled>
		        <span class="content is-small">{{de43.description}}</span>
		      </p>
		    </div>
		  </div>
	     </div> 
      </div>	 
    </div>	 

    <div class="section">
    <div class="content">
        <button class="button is-success is-rounded"  v-on:click="generateMessage()">
          Generate ISO Message
        </button>
    </div>	
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
		"networkNotSelected" : false,
		"mti" : "",
		"txntype" : "",
		"isomessages":"",
		"dehm" : "",
		"de2" : "",
		"de3" : "",
		"de4" : "",
		"de18" : "",
		"de22" : "",
		"de41" : "",
		"de42" : "",
		"de43" : ""
	}
  },
  computed: {
    // a computed getter
    isoMessage: function () {

return "ISO Message - ";
    }
  },
methods : {
	generateData(){
		if(this.network == '') 
		{
			this.networkNotSelected = true;
			return ;
		}
		const axios = require('axios');
		let self = this ;

		axios.get(process.env.VUE_APP_DATA_GENERATOR_URL  + '/' + this.network + '/' + 'purchase')
		     .then(function (response) {
			// handle success
		      console.log(response.data.dataElements);  
		      self.de2 = response.data.dataElements.filter(function(item) { return item.id === 2; })[0];
		      self.de3 = response.data.dataElements.filter(function(item) { return item.id === 3; })[0];
		      self.de4 = response.data.dataElements.filter(function(item) { return item.id === 4; })[0];
		      self.de18 = response.data.dataElements.filter(function(item) { return item.id === 18; })[0];
		      self.de22 = response.data.dataElements.filter(function(item) { return item.id === 22; })[0];
		      self.de41 = response.data.dataElements.filter(function(item) { return item.id === 41; })[0];
		      self.de42 = response.data.dataElements.filter(function(item) { return item.id === 42; })[0];
		      self.de43 = response.data.dataElements.filter(function(item) { return item.id === 43; })[0];
		    //self.de2 = de2.value;
		    //self.de3 = de3.value;
		    //self.de4 = de4.value;
		    //self.de18 = response.data.deHMJson.de18;
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
	generateMessage(){
		//console.log("selected network - " + network);
		//console.log("data generator url - " + process.env.VUE_APP_DATA_GENERATOR_URL);

		let self = this ;

		const axios = require('axios');

		axios.get(process.env.VUE_APP_PARSER_GENERATOR_URL + '/' + 'createmessage',{
			    params: {
			      data: self.dehm
			    }
		    })
		.then(response => self.isomessages = response.data);

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
