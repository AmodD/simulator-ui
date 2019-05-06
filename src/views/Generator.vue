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
			            <option value="balance_enquiry" v-if="network == 'rupay'">Balance Enquiry</option>
			          </select>
			        </div>
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
<div class="field is-horizontal">
  <div class="field-label">
    <a href="http://generator.fortiate.com:8081" target="_blank">Link to API</a>
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
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button class="button is-info is-rounded"  v-on:click="generateTree()">
          Generate Situation Tree *
        </button>
	<div class="content is-small"> * For last 1000 transactions</div>
      </div>
    </div>
  </div>
 </div>
</div>

</div>

</div>

<div class="section">
<div id="wordtree_basic"></div>
</div>	

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

    <div v-if="dataElements"  class="section">
    <div class="content">
        <button class="button is-success is-rounded"  v-on:click="generateMessage()">
          Generate ISO Message
        </button>
    </div>	
<div class="notification content is-small">
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
		"situations":"",
		"dehm" : "",
		"dataElements" : "",
	}
  },
  computed: {
    // a computed getter
    isoMessage: function () {

return "ISO Message - ";
    }
  },
methods : {
	generateTree(){
		if(this.network == '') 
		{
			this.networkNotSelected = true;
			return ;
		}
		const axios = require('axios');
		let self = this ;



     google.charts.load('current', {packages:['wordtree']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

		axios.get(process.env.VUE_APP_DATA_GENERATOR_URL  + '/situations')
		     .then(function (response) {
		     // handle success
		      console.log(response.data);  
			self.situations =  response.data;

		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		    console.log("calling isomessages");
        var data = google.visualization.arrayToDataTable(self.situations);

        var options = {
          wordtree: {
            format: 'implicit',
            word: 'AuthorizationRequest'
          }
        };

        var chart = new google.visualization.WordTree(document.getElementById('wordtree_basic'));
        chart.draw(data, options);
		  });



      }





		//axios.get(process.env.VUE_APP_DATA_GENERATOR_URL  + '/' + this.network + '/' + 'purchase')

	},generateData(){
		if(this.network == '') 
		{
			this.networkNotSelected = true;
			return ;
		}
		const axios = require('axios');
		let self = this ;

		//axios.get(process.env.VUE_APP_DATA_GENERATOR_URL  + '/' + this.network + '/' + 'purchase')
		axios.get(process.env.VUE_APP_DATA_GENERATOR_URL  + '/transaction/' + this.txntype)
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
