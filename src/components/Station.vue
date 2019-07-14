<template>
<div class="">
<div class="columns is-gapless">
	<div class="column is-5">
      		<p class="has-text-danger">{{details.inCount}}</p>
		<p class="">
			<span v-for="turnstile in details.In_Ts" class="icon is-medium">
				<i v-if="terminal == turnstile.id"  class="fas fa-door-open "></i>
				<i v-else  class="fas fa-door-closed"></i>
			</span>
		</p>
		<p>
			<span class="icon"><i class="fas fa-arrow-up"></i></span>
			<span v-for="turnstile in details.In_Ts"  v-if="terminal == turnstile.id">{{card}}</span>
		</p>
	</div>
	<div class="column is-2">
		<p>{{details.name}}</p>
		<p><span class="icon is-large"><i class="fas fa-2x fa-train"></i></span></p>
		<p></p>
	</div>
	<div class="column is-5">
		<p>
			<span v-for="turnstile in details.Out_Ts"  v-if="terminal == turnstile.id">{{card}}</span>
			<span class="icon"><i class="fas fa-arrow-down"></i></span>
		</p>
		<p>
			<span v-for="turnstile in details.Out_Ts" class="icon is-medium">
			<i v-if="terminal == turnstile.id"  class="fas fa-door-open "></i>
			<i v-else  class="fas fa-door-closed"></i>
			</span>
		</p>
      		<p class="has-text-success">{{details.outCount}}</p>
	</div>
</div>
</div>
</template>

<style scoped>

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<script>

export default {
	props: {
		card : String,
		terminal : String,
		merchant : String,
		details : ''
  	},
	data(){
		return {
		}
	},
        mounted() {
            console.log('Station Component mounted.')
        }
}

</script>
