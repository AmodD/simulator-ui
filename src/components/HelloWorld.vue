<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Simulated Use Cases</h3>
    <ul>
      <li><a href="" target="_blank" rel="noopener">SACU</a></li>
      <li><a href="" target="_blank" rel="noopener">ATM</a></li>
    </ul>
    <h3>ISO8583 Networks</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Rupay</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">MasterCard</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Visa</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="" target="_blank" rel="noopener">Demo Website</a></li>
      <li><a href="" target="_blank" rel="noopener">Fortiate.com</a></li>
      <li><a href="" target="_blank" rel="noopener">Simulator</a></li>
      <li><a href="" target="_blank" rel="noopener">Fraud Score API</a></li>
      <li><a href="" target="_blank" rel="noopener">ISO8583 Compliance Check App</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
