<template>
    <button 
      class='red-button' 
      v-on:click='deleteThisTask'
    >
      Remove task
    </button>
</template>

<script>
export default {
  name: 'RemoveTask',
  props: ['taskId', 'deleteTask'],
  methods: {
    deleteThisTask() {
      this.deleteTask(this.taskId)
    }
  }
}
</script>

<style scoped>
.red-button {
  background-color: rgb(255, 0, 0);
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
