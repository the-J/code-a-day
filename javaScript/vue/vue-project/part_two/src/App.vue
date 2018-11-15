<template>
  <div id="app">  
    <!-- <button v-on:click='sortList' > Sort {{ sorting ? 'up' : 'down' }}</button> -->
    <Tasks 
      v-for='task in sharedState.tasks' 
      v-bind:key='task.id' 
      v-bind:task='task' 
      :deleteTask='deleteTask'
    />
    <AddTask :addTask='addTask'/>
  </div>
</template>

<script>

import shortid from 'shortid'
import axios from 'axios';

import store from '../store'

import Tasks from './components/Tasks.vue'
import AddTask from './components/AddTask.vue'

export default {
  name: 'app',
  components: {
    Tasks,
    AddTask
  },
  async created() {
    store.fetchProducts()
  },
  data() {
      return {
        sharedState: store.state,
        tasks: [],
        newTask: '',
        sorting: false
      }
  },
  methods: {
        addTask(task) {
          store.addProduct({
              id: shortid.generate(),
              name: task
            })
        },
        deleteTask(id){
          const task = this.tasks.find(task => task.id === id);  
          const index = this.tasks.indexOf(task)
          this.tasks.splice(index, 1)
        },
        sortList() {
          this.tasks.sort(function (a, b) {
            if (a.id> b.id) 1
            if (a.id <= b.id) -1
            return 0
          })
          this.sorting = !this.sorting
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
