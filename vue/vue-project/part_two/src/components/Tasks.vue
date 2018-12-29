<template>
  <div class='task'>
    <span class='task'> {{ task.name }} </span> 
    <RemoveTask 
      :deleteTask='deleteTask' 
      :taskId='task.id'
    />
  </div>
</template>

<script>
import RemoveTask from './RemoveTask'

export default {
  name: 'Tasks',
  components: {
    RemoveTask
  },
  props: ['task', 'deleteTask']
}
</script>

<style scoped>
.task {
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}
</style>
