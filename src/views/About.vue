<template>
	<div>  
    <ul>
	<li class="vanaz_station"><a href=""><span class="vanaz">Vanaz</span></a></li>
	<li class="ideal_station"><a href=""><span class="ideal">Ideal-Colony</span></a></li>
	<li class="nal-stop_station"><a href=""><span class="nal-stop">Nal-Stop</span></a></li>
	<li class="garware_station"><a href=""><span class="garware">Garware</span></a></li>
	<li class="deccan_station"><a href=""><span class="deccan">Deccan</span></a></li>
    </ul>
 <div class="columns" style="margin-top:10%">
  <div class="column is-one-fifth">
	  <div class="box content">
		<h4>Card Holders</h4>
		<span v-for="chp in chpList" class="tag is-light">{{chp.firstname}} {{chp.lastname}}</span>
	  </div>	  
  </div>
  <div class="column">
      <h2>Message Received</h2>
    <p>{{ received_messages }}</p>
  </div>
  <div class="column">{{ de41 }}</div>
</div> 
  </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export default {
  props: {
    msg: String
  },
  data(){
	return {
		blinkFlag : false,
		chpList : '',
		baseUrl : '',
		received_messages: [],
	        send_message: null,
	        connected: false,
		isoMsg : '',
		genData : '',
		dataElements : '',
		de41 : ''
	}
  },
  computed: {
    blink: function () {
	    let self = this;
//	setInterval(console.log("yes blinking") }, 3000);
setTimeout(function(){ self.blinkFlag = true;  }, 3000);

	this.blinkFlag = false;
	return this.blinkFlag;
    }
  },
	methods : {
		getscorefortxnid() {
           		 console.log('txn id - '+this.txnid);
			 axios.get('/api/score/id/'+this.txnid)
			  .then(response => this.response1 = response.data)
//			  .then(function (response) {
//			    console.log(response);
//			  })
			  .catch(error => this.response1 = error.response.data);
//			  .catch(function (error) {
//			    console.log(error.response);
//  			});
		},
		getscoreforhexmsg() {
			 axios.get('/api/score/msg/'+this.aggid+'/'+this.clid+'/'+this.hexmsg)
			  .then(response => this.response2 = response.data)
			  .catch(error => this.response2 = error.response.data);
		},
		setupConsumer(){

		const axios = require('axios');
		let self = this;


			axios({
			  method: 'post',
			  url: 'http://localhost:8082/consumers/my_json_consumer',
			  headers: {'Content-Type': 'application/vnd.kafka.v2+json','Accept': 'application/vnd.kafka.v2+json'},
			  data: {
//			    'name': 'simulator_instance',
			    'format': 'json',
			    'auto.offset.reset': 'earliest',
			  }
			})
		  	.then(function (response) {
			    // always executed
			    console.log("first call");
			    console.log(response.data.base_uri);
			    self.baseUrl = response.data.base_uri;

			    return  
				axios({
				  method: 'post',
				  url: self.baseUrl + '/subscription',
				  headers: {'Content-Type': 'application/vnd.kafka.v2+json'},
				  data: {
				    'topics': '["topic-generated-data1"]',
				  }
				});
  	      		});

		},
		setupSubscription(){

	console.log("inside setup subscription")
		const axios = require('axios');
		let self = this;
				axios({
				  method: 'post',
				  url: self.baseUrl + '/subscription',
				  headers: {'Content-Type': 'application/vnd.kafka.v2+json'},
				  data: {
				    'topics': '["topic-generated-data1"]',
				  }
				})
		  		.then(function () {
		    // always executed
		    console.log("second call");
//	return self.getRecords();
//	console.log("calling get records");

		  	      });

		},
		getRecords(){

		const axios = require('axios');
		let self = this;
					
		    			axios({
					  method: 'get',
					  url: self.baseUrl + '/records',
					  headers: {'Accept': 'application/vnd.kafka.json.v2+json'},
					})
			  		.then(function () {
					    // always executed
					    console.log("finally ending");
				        });// end of third axios

		},
	   connect () {

		   let self = this;
      this.socket = new SockJS('http://localhost:48400/ws')
      this.stompClient = Stomp.over(this.socket)
      this.stompClient.connect({}, (frame) => {
        this.connected = true
        this.stompClient.subscribe('/topic/generated-data', (message) => {
        console.log("printing message")
          console.log(message);
	  	self.genData = JSON.parse(message.body);
        console.log("printing situation")
          console.log(self.genData.situation);
	//	self.dataElements = self.genData.dataElements;
	self.de41 = self.genData.dataElements.filter(function(item) { return item.id === 41; })[0].value;
          this.received_messages.push(self.de41)
        })
      }, (error) => {
        console.log(error)
        this.connected = false
      })
    },
	},
	mounted()
	{
            console.log('Transit Component mounted.');
	    this.connect();
	}
/*	
        async mounted() {
            console.log('Transit Component mounted.');
		const axios = require('axios');
		let self = this;
	console.log("calling setup consumer");
	
	let consumer_config = {
		headers: {'Content-Type': 'application/vnd.kafka.v2+json','Accept': 'application/vnd.kafka.v2+json'},
	};

	let consumer_data = {
//			    'name': 'simulator_instance',
			    'format': 'json',
			    'auto.offset.reset': 'latest',
	};

	let subscription_config = {
		headers: {'Content-Type': 'application/vnd.kafka.v2+json'},
	};

	let subscription_data = {
		"topics" : ["topic-amod-new"]
	};

	let records_config = {
		headers: {'Accept': 'application/vnd.kafka.json.v2+json'},
	};

	let records_data = {
	};

	let consumer_response = await axios.post('http://localhost:8082/consumers/my_json_consumer', consumer_data, consumer_config)
					.then(function (response) { 
					self.baseUrl = response.data.base_uri; 
//					return 	axios.post( self.baseUrl + '/subscription', subscription_data, consumer_config);
			     });

	let subscription_response = await axios.post( self.baseUrl + '/subscription', subscription_data, subscription_config);
	 axios.get( self.baseUrl + '/records',{
		headers: {'Accept': 'application/vnd.kafka.json.v2+json'},
	});
	     

		axios.get(process.env.VUE_APP_FORTIATE_RUPAY_GENERATOR_URL  + '/chp')
		     .then(function (response) {
		     // handle success
		      console.log(response.data);  
		      self.chpList = response.data;

		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .then(function () {
		    // always executed
		    console.log("calling chp");
  	      });


	}
	*/
}
</script>

<style scoped>
.vanaz_station{
animation-name: blink;
animation-duration: 10s;
animation-fill-mode: both;
}

.ideal_station{
animation-name: blink;
animation-duration: 10s;
animation-delay: 15s;
animation-fill-mode: both;
}



.nal-stop_station{
animation-name: blink;
animation-duration: 10s;
animation-delay: 30s;
animation-fill-mode: both;
}

.garware_station{
animation-name: blink;
animation-duration: 10s;
animation-delay: 45s;
animation-fill-mode: both;
}	

.deccan_station{
animation-name: blink;
animation-duration: 10s;
animation-delay: 60s;
animation-fill-mode: both;
}	

@keyframes blink {
  0%   {background-color: red;}
  15%  {background-color: yellow;}
  20%  {background-color: red;}
  30% {background-color: yellow;}
  40%   {background-color: red;}
  50%  {background-color: yellow;}
  60%  {background-color: red;}
  70% {background-color: yellow;}
  80%   {background-color: red;}
  90%  {background-color: yellow;}
  100%  {background-color: green;}
}

@keyframes reached {
  from {background-color: green;}
  to {background-color: green;}
}

.animation{ color: red; }

ul {
  position: relative;
  display: block;
  margin: 5% auto;
  padding-left: 4px;
  width: 0px;
  height: 4%;
  background: #D3D3D3;
}


li a{
	position:absolute;
	top:-60px;
	color:#000080;
	/* Safari */
	-webkit-transform: rotate(-45deg);
	
	/* Firefox */
	-moz-transform: rotate(-45deg);
	
	/* IE */
	-ms-transform: rotate(-45deg);
	
	/* Opera */
	-o-transform: rotate(-45deg);
	
	/* Internet Explorer */
	filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
	width:100px;
	text-decoration:none;
	
}

ul{
	position:absolute;
 	top: 35%;
 	transform: translate(0%, -50%);;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	width:100%;
	padding-left:0px;


	
}

li:hover{
	background-color:#fab;
}

li {
	position:relative;
	text-decoration:none;
	list-style-type:none;
	width:30px;
	height:30px;
	border:5px solid #900;
	border-radius: 100%;
	display:inline-block;
	margin-right:50px;

}
</style>
