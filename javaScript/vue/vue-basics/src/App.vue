<template>
  <div id="app">
    <img id="logo" src="./assets/logo.png">
    <MainView />
  </div>
</template>

<script>
import MainView from './components/MainView.vue'

export default {
  name: 'app',
  components: {
    MainView
  }
}
</script>

<style>
*{
	margin: 0;
	padding: 0;
	border: 0;
	outline: 0;
	font-size: 100%;
	vertical-align: baseline;
	background: transparent;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
#logo {
  max-width: 20%
}
</style>
