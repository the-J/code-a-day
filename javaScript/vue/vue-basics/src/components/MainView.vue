<template>
  <div class="main-view">
    <span class='name'>{{ name }}</span>

    <div class='inline'>
      <span class="btn-state">
        {{ btnState ? 'Button disabled':'Button active'}}
      </span>

      <button 
        class='button' 
        v-on:click='changeName' 
        v-bind:disabled='btnState'
      >
        click
      </button>
    </div>
    
    <ul>
      <li 
        v-for="(data, index) in colors" 
        :key='index'
      >
        {{ index }}. {{ data.color }}
      </li>
    </ul>

    <p>Your Colors</p>

    <div v-bind:class="{ redBox: showReadBox, 'blue-border': showBluBorder }">Conditional Styling 1</div>
    <div v-bind:class="showYellowBox">Conditional Styling 2</div>
    <div v-bind:style="{backgroundColor: bgColor, width: bgWidth, height: bgHeight, marginLeft: '40%', marginTop: '10px'}">Conditional Styling 3</div>
  </div>
</template>

<script>
export default {
  name: 'MainView',
  data() {
    return {
      name: 'Made By J',
      btnState: true,
      colors: [
        {"color": "white"},
        {"color": "black"},
        {"color": "red"}
      ],
      showReadBox: true,
      showBluBorder: true,
      showYellowBox: {
        yellowBox: true
      },
      bgColor: 'green',
      bgWidth: '20%',
      bgHeight: '2em',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name {
  font-size: 5em
}

.inline {
  width: 100%;
  font-size: 2em;
}

.btn-state {
  font-size: 1em
}

.button{
	text-align:center;
	margin:50px auto;
	padding: 15px 0px;
	height:100px;
	width:175px;
	
	cursor:pointer;
	font-size:25px;
	color:rgb(0, 22, 95);
	border-radius: 10px;
  border-color:rgb(77, 75, 75);
	box-shadow: 3px 3px 3px 3px rgb(161, 161, 161);
	
	-webkit-user-select: none;        
	-moz-user-select: none;
	-ms-user-select: none;
	-o-user-select: none;
	user-select: none;
	
	background: -webkit-linear-gradient(rgb(161, 161, 161), rgb(48, 48, 48));
    background: -o-linear-gradient(rgb(161, 161, 161), rgb(48, 48, 48));
    background: -moz-linear-gradient(rgb(161, 161, 161), rgb(48, 48, 48));
	
	-webkit-transition: background 0.05s linear;  
    -moz-transition: background 0.05s linear;  
    -o-transition: background 0.05s linear;  
    transition: background 0.05s linear;
    background: linear-gradient(rgb(161, 161, 161), rgb(48, 48, 48));
	
	background-size:1px 200px;
	
	transition: all .05s linear;
}

.button:hover{
	background-position:100px;
}

.button:active {
	box-shadow: 2px 2px 2px #777;
	border-bottom:1px solid #0045A6;
	transform: translateY(3px);
}

ul {
  font-size: 2em
}

.redBox {
  margin-top: 10px;
  margin-left: 40%;
  background-color: red;
  width: 20%;
  height: 2em;
  font-size: 1em;
}

.blue-border {
  border: 2px solid blue
}


.yellowBox {
  margin-top: 10px;
  margin-left: 40%;
  background-color: yellow;
  width: 20%;
  height: 2em;
  font-size: 1em;
}
</style>
