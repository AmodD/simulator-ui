<template>
	<div class="modal is-active">
  		<div class="modal-background"></div>
    		<div class="modal-card">
        		<header class="modal-card-head">
				<span class="modal-card-title"> 
					<slot name="modal-title"></slot>
			            	<button class="delete is-pulled-right" @click="$emit('close')" ></button>
				</span>
		        </header>
			<section class="modal-card-body">
				<slot name="modal-body"></slot>
			</section>
	        <button class="modal-close" @click="$emit('close')"></button> <!-- make an anouncement by emmiting an custom event -->
		</div>
	</div>
</template>

<script>

export default {
        mounted() {
            console.log('Modal Component mounted.')
        }
}

</script>
