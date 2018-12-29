<template>
    <div class='add-task'>
        <input 
            type='text' 
            placeholder='Add task' 
            v-model='newTask'
        />
        <button 
            class='blue-button' 
            v-on:click='addNewTask'
        >
            Add task
        </button>
    </div>
</template>

<script>
export default {
    name: 'AddTask',
    data() {
        return{
            newTask: 'Add task'
        }
    },
    props: ['addTask'],
    methods: {
        addNewTask() {
            this.addTask(this.newTask);
            this.newTasko = 'Add another task'
        }
    }
}
</script>

<style scoped>

input {
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  background-color: lightblue;
}

.blue-button {
  background-color: rgb(17, 0, 255);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
