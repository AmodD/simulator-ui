<template>
	<div class="content">  
	<h1>Station Accountancy And Control Unit</h1>	
	    <ul>
		    <li v-for="station in stations" :class="station.id"><a href="">{{station.name}}</a></li>    
	    </ul>	    
<div class="columns is-variable is-1-mobile is-0-tablet is-1-desktop is-8-widescreen is-2-fullhd content is-multiline" style="margin-top:10%">
  <div v-for="station in stations" class="column is-two-fifths" :class="offset(station.no)">
	  <Station 
		   :details="station"		   
		   :total="totalCount"		   
		   :card="obfuscatedCard" 
		   :terminal="de41" 
		   :merchant="de42" 
	></Station>
  </div>
</div>

	<modal v-if="showModal" @close="showModal = false"> 
		<template slot="modal-title">Details</template>
		<template slot="modal-body">
		</template>
	</modal>

	  <div class="content">
		<h4>Card Holders</h4>
		<div class="field is-grouped is-grouped-multiline">
			<!--		<span v-for="chp in chpList" class="tag is-light">{{chp.firstname}} {{chp.lastname}}</span> -->
		  <div v-for="chp in chpList"  class="control">
		    <div class="tags has-addons">
		      <a  @click="showModal = true;" class="tag is-light">{{chp.firstname}} {{chp.lastname}}</a>
		      <a v-if="de2 == chp.card_number" class="tag is-link"></a>
		    </div>
		  </div>
		</div>
	  </div>	  
  </div>
</template>

<script>
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

import Modal from '@/components/Modal.vue'
import Station from '@/components/Station.vue'

export default {
	components: {
		Station,
		Modal
	},
	props: {
		msg: String
  	},
  	computed: {
	    totalCount: function () {
		if(this.de42 == 'MAHAMETROSTATION1') this.stations[0].total++;
		if(this.de42 == 'MAHAMETROSTATION2') this.stations[1].total++;
		if(this.de42 == 'MAHAMETROSTATION3') this.stations[2].total++;
		if(this.de42 == 'MAHAMETROSTATION4') this.stations[3].total++;
		if(this.de42 == 'MAHAMETROSTATION5') this.stations[4].total++;
		if(this.de42 == 'MAHAMETROSTATION6') this.stations[5].total++;
		if(this.de42 == 'MAHAMETROSTATION7') this.stations[6].total++;


		if(this.de41 == 'MMS01T01'){ this.stations[0].In_Ts[0].total++;this.stations[0].inCount++;}
		if(this.de41 == 'MMS01T02'){ this.stations[0].In_Ts[1].total++;this.stations[0].inCount++;}
		if(this.de41 == 'MMS01T03'){ this.stations[0].In_Ts[2].total++;this.stations[0].inCount++;}
		if(this.de41 == 'MMS01T04'){ this.stations[0].In_Ts[3].total++;this.stations[0].inCount++;}
		if(this.de41 == 'MMS01T05'){ this.stations[0].Out_Ts[0].total++;this.stations[0].outCount++;}
		if(this.de41 == 'MMS01T06'){ this.stations[0].Out_Ts[1].total++;this.stations[0].outCount++;}
		if(this.de41 == 'MMS01T07'){ this.stations[0].Out_Ts[2].total++;this.stations[0].outCount++;}
		if(this.de41 == 'MMS01T08'){ this.stations[0].Out_Ts[3].total++;this.stations[0].outCount++;}

		if(this.de41 == 'MMS02T01'){ this.stations[1].In_Ts[0].total++;this.stations[1].inCount++;}
		if(this.de41 == 'MMS02T02'){ this.stations[1].In_Ts[1].total++;this.stations[1].inCount++;}
		if(this.de41 == 'MMS02T03'){ this.stations[1].Out_Ts[0].total++;this.stations[1].outCount++;}
		if(this.de41 == 'MMS02T04'){this.stations[1].Out_Ts[1].total++;this.stations[1].outCount++;}
		if(this.de41 == 'MMS02T05'){ this.stations[1].Out_Ts[2].total++;this.stations[1].outCount++;}

		if(this.de41 == 'MMS03T01'){ this.stations[2].In_Ts[0].total++;this.stations[2].inCount++;}
		if(this.de41 == 'MMS03T02'){ this.stations[2].In_Ts[1].total++;this.stations[2].inCount++;}
		if(this.de41 == 'MMS03T03'){ this.stations[2].In_Ts[2].total++;this.stations[2].inCount++;}
		if(this.de41 == 'MMS03T04'){ this.stations[2].In_Ts[3].total++;this.stations[2].inCount++;}
		if(this.de41 == 'MMS03T05'){ this.stations[2].In_Ts[4].total++;this.stations[2].inCount++;}
		if(this.de41 == 'MMS03T06'){ this.stations[2].In_Ts[5].total++;this.stations[2].inCount++;}
		if(this.de41 == 'MMS03T07'){ this.stations[2].Out_Ts[0].total++;this.stations[2].outCount++;}
		if(this.de41 == 'MMS03T08'){ this.stations[2].Out_Ts[1].total++;this.stations[2].outCount++;}

		if(this.de41 == 'MMS04T01'){ this.stations[3].In_Ts[0].total++;this.stations[3].inCount++;}
		if(this.de41 == 'MMS04T02'){ this.stations[3].In_Ts[1].total++;this.stations[3].inCount++;}
		if(this.de41 == 'MMS04T03'){ this.stations[3].Out_Ts[0].total++;this.stations[3].outCount++;}
		if(this.de41 == 'MMS04T04'){ this.stations[3].Out_Ts[1].total++;this.stations[3].outCount++;}
		if(this.de41 == 'MMS04T05'){ this.stations[3].Out_Ts[2].total++;this.stations[3].outCount++;}

		if(this.de41 == 'MMS05T01'){ this.stations[4].In_Ts[0].total++;this.stations[4].inCount++;}
		if(this.de41 == 'MMS05T02'){ this.stations[4].In_Ts[1].total++;this.stations[4].inCount++;}
		if(this.de41 == 'MMS05T03'){ this.stations[4].In_Ts[2].total++;this.stations[4].inCount++;}
		if(this.de41 == 'MMS05T04'){ this.stations[4].Out_Ts[0].total++;this.stations[4].outCount++;}
		if(this.de41 == 'MMS05T05'){ this.stations[4].Out_Ts[1].total++;this.stations[4].outCount++;}
		if(this.de41 == 'MMS05T06'){ this.stations[4].Out_Ts[2].total++;this.stations[4].outCount++;}

		if(this.de41 == 'MMS06T01'){ this.stations[5].In_Ts[0].total++;this.stations[5].inCount++;}
		if(this.de41 == 'MMS06T02'){ this.stations[5].In_Ts[1].total++;this.stations[5].inCount++;}
		if(this.de41 == 'MMS06T03'){ this.stations[5].Out_Ts[0].total++;this.stations[5].outCount++;}
		if(this.de41 == 'MMS06T04'){ this.stations[5].Out_Ts[1].total++;this.stations[5].outCount++;}
		if(this.de41 == 'MMS06T05'){ this.stations[5].Out_Ts[2].total++;this.stations[5].outCount++;}

		if(this.de41 == 'MMS07T01'){ this.stations[6].In_Ts[0].total++;this.stations[6].inCount++;}
		if(this.de41 == 'MMS07T02'){ this.stations[6].In_Ts[1].total++;this.stations[6].inCount++;}
		if(this.de41 == 'MMS07T03'){ this.stations[6].In_Ts[2].total++;this.stations[6].inCount++;}
		if(this.de41 == 'MMS07T04'){ this.stations[6].In_Ts[3].total++;this.stations[6].inCount++;}
		if(this.de41 == 'MMS07T05'){ this.stations[6].Out_Ts[0].total++;this.stations[6].outCount++;}
		if(this.de41 == 'MMS07T06'){this.stations[6].Out_Ts[1].total++;this.stations[6].outCount++;}


		return this.stations[2].total;
	    },
	    obfuscatedCard: function () {
	    let self = this;
	    var last4 = self.de2.slice(-4);	
	return "...xxx" + last4;
    }
  },
	data(){
		return {
			blinkFlag : false,
			chpList : '',
		        connected: false,
			de41 : '',
			de42 : '',
			de2 : '',
			show : true,
			showModal : false,
			stations : [
					{ 'id':'station1', 
					  'no':'1', 
					  'name':'Vanaz', 
					  'In_Ts' : [
						  {'id':'MMS01T01','total':'0'},
						  {'id':'MMS01T02','total':'0'},
						  {'id':'MMS01T03','total':'0'},
						  {'id':'MMS01T04','total':'0'},
					  	],
					  'Out_Ts' : [
						  {'id':'MMS01T05','total':'0'},
						  {'id':'MMS01T06','total':'0'},
						  {'id':'MMS01T07','total':'0'},
						  {'id':'MMS01T08','total':'0'},
					  	],
					  'total' : '0',
					  'inCount' : '0',
					  'outCount' : '0',
					},
					{ 'id':'station2', 
					  'name':'IdealColony', 
					  'no':'2', 
					  'In_Ts' : [
						  {'id':'MMS02T01','total':'0'},
						  {'id':'MMS02T02','total':'0'},
					  	],
					  'Out_Ts' : [ 
						  {'id':'MMS02T03','total':'0'},
						  {'id':'MMS02T04','total':'0'},
						  {'id':'MMS02T05','total':'0'},
					  	],
					  'total' : '0',
					  'inCount' : '0',
					  'outCount' : '0',
					},
					{ 'id':'station3', 
					  'no':'3', 
					  'name':'NalStop', 
					  'In_Ts' : [
						  {'id':'MMS03T01','total':'0'},
						  {'id':'MMS03T02','total':'0'},
						  {'id':'MMS03T03','total':'0'},
						  {'id':'MMS03T04','total':'0'},
						  {'id':'MMS03T05','total':'0'},
						  {'id':'MMS03T06','total':'0'},
					  	],
					  'Out_Ts' : [
						  {'id':'MMS03T07','total':'0'},
						  {'id':'MMS03T08','total':'0'},
					  	],
					  'total' : '0',
					  'inCount' : '0',
					  'outCount' : '0',
					},
					{ 'id':'station4', 
					  'no':'4', 
					  'name':'Garware', 
					  'In_Ts' : [
						  {'id':'MMS04T01','total':'0'},
						  {'id':'MMS04T02','total':'0'},
					  	],
					  'Out_Ts' : [ 
						  {'id':'MMS04T03','total':'0'},
						  {'id':'MMS04T04','total':'0'},
						  {'id':'MMS04T05','total':'0'},
					  	],
					  'total' : '0',
					  'inCount' : '0',
					  'outCount' : '0',
					},
					{ 'id':'station5', 
					  'no':'5', 
					  'name':'Deccan', 
					  'In_Ts' : [
						  {'id':'MMS05T01','total':'0'},
						  {'id':'MMS05T02','total':'0'},
						  {'id':'MMS05T03','total':'0'},
					  	],
					  'Out_Ts' : [ 
						  {'id':'MMS05T04','total':'0'},
						  {'id':'MMS05T05','total':'0'},
						  {'id':'MMS05T06','total':'0'},
					  	],
					  'total' : '0',
					  'inCount' : '0',
					  'outCount' : '0',
					},
					{ 'id':'station6', 
					  'no':'6', 
					  'name':'PMC', 
					  'In_Ts' : [
						  {'id':'MMS06T01','total':'0'},
						  {'id':'MMS06T02','total':'0'},
					  	],
					  'Out_Ts' : [ 
						  {'id':'MMS06T04','total':'0'},
						  {'id':'MMS06T05','total':'0'},
						  {'id':'MMS06T05','total':'0'},
					  	],
					  'total' : '0',
					  'inCount' : '0',
					  'outCount' : '0',
					},
					{ 'id':'station7', 
					  'no':'7', 
					  'name':'Camp', 
					  'In_Ts' : [
						  {'id':'MMS07T01','total':'0'},
						  {'id':'MMS07T02','total':'0'},
						  {'id':'MMS07T03','total':'0'},
						  {'id':'MMS07T04','total':'0'},
					  	],
					  'Out_Ts' : [
						  {'id':'MMS07T05','total':'0'},
						  {'id':'MMS07T06','total':'0'},
					  	],
					  'total' : '0',
					  'inCount' : '0',
					  'outCount' : '0',
					},
				]
		}
	},
	methods : {
		offset(no){
			var finalno = no;
			return "is-offset-" + finalno ;
		},
		chps(){

		const axios = require('axios');
		let self = this ;

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

		},
		connect () {
			let self = this;
		        this.socket = new SockJS('http://localhost:48400/ws')
      			this.stompClient = Stomp.over(this.socket)
		        this.stompClient.connect({}, (frame) => {
 	       			this.connected = true
			        this.stompClient.subscribe('/topic/generated-data', (message) => {
					var data = JSON.parse(message.body);	
					self.de41 = data.dataElements.filter(function(item) { return item.id === 41; })[0].value;
					self.de42 = data.dataElements.filter(function(item) { return item.id === 42; })[0].value;
					self.de2 = data.dataElements.filter(function(item) { return item.id === 2; })[0].value;
        			})
      			}, (error) => {
			        console.log(error)
			        this.connected = false
      			})
		},
		generate() {

		const axios = require('axios');
		let self = this ;

		axios.get(process.env.VUE_APP_FORTIATE_RUPAY_GENERATOR_URL  + '/transit_demo_in')
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
		  //  console.log("calling isomessages");
		  });


		axios.get(process.env.VUE_APP_FORTIATE_RUPAY_GENERATOR_URL  + '/transit_demo_out')
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
		  //  console.log("calling isomessages");
		  });

		}
	},
	mounted()
	{
            console.log('Transit Component mounted.');
//	    this.chps();
//	    this.connect();
//	    this.generate();


	}
}
</script>

<style scoped>
.station1{
animation-name: blink;
animation-duration: 10s;
animation-fill-mode: both;
}

.station2{
animation-name: blink;
animation-duration: 10s;
animation-delay: 15s;
animation-fill-mode: both;
}

.station3{
animation-name: blink;
animation-duration: 10s;
animation-delay: 30s;
animation-fill-mode: both;
}

.station4{
animation-name: blink;
animation-duration: 10s;
animation-delay: 45s;
animation-fill-mode: both;
}	

.station5{
animation-name: blink;
animation-duration: 10s;
animation-delay: 60s;
animation-fill-mode: both;
}	

.station6{
animation-name: blink;
animation-duration: 10s;
animation-delay: 75s;
animation-fill-mode: both;
}	

.station7{
animation-name: blink;
animation-duration: 10s;
animation-delay: 90s;
animation-fill-mode: both;
}	

@keyframes blink {
  0%   {background-color: red;}
  15%  {background-color: yellow;}
  20%  {background-color: red;}
  30%  {background-color: yellow;}
  40%  {background-color: red;}
  50%  {background-color: yellow;}
  60%  {background-color: red;}
  70%  {background-color: yellow;}
  80%  {background-color: red;}
  90%  {background-color: yellow;}
  100% {background-color: green;}
}

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
	color:#4A4A4A;
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
 	top: 15%;
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
	margin-right:auto;
	margin-left:auto;

}
</style>
