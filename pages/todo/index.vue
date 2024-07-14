<script>
definePageMeta({
  middleware: "auth"
})
import { ref } from "vue"
// const client = useSupabaseClient()
// const user = useSupabaseUser()

// Adjusted to select 'description' instead of 'title'
// const { data: tasks } = await useAsyncData("tasks", async () => {
//   const { data } = await client
//     .from("tasks")
//     .select("id, description, completed")
//     .order("created_at")
//   return data
// })

export default {
  setup() {
    const newTodo = ref("")
    const todos = ref([])

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({ id: Date.now(), text: newTodo.value, completed: false })
        newTodo.value = "" // Clear input after adding
      }
    }

    const removeTodo = (id) => {
      todos.value = todos.value.filter((todo) => todo.id !== id)
    }

    const editTodo = (id) => {
      const todoIndex = todos.value.findIndex((todo) => todo.id === id)
      if (todoIndex !== -1) {
        const updatedText = window.prompt("Edit your todo:", todos.value[todoIndex].text)
        if (updatedText !== null && updatedText.trim() !== "") {
          todos.value[todoIndex].text = updatedText.trim()
        }
      }
    }
    const toggleCompleted = (id) => {
      const todoIndex = todos.value.findIndex((todo) => todo.id === id)
      if (todoIndex !== -1) {
        todos.value[todoIndex].completed = !todos.value[todoIndex].completed
      }
    }

    return { newTodo, todos, addTodo, removeTodo, editTodo, toggleCompleted }
  }
}
</script>

<template>
  <h1 class="text-xl text-center font-bold mb-10">Todo App</h1>
  <div class="flex flex-row justify-center items-center gap-4">
    <input
      type="text"
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="write a todo..."
      class="input input-bordered w-full max-w-xs"
    />
    <button @click="addTodo" class="btn btn-circle btn-outline flex items-center justify-center">
      <Icon name="uil:plus" />
    </button>
  </div>

  <ul class="flex flex-col gap-4 pt-16">
    <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="todo.completed" />
        <!-- Add @click handler to toggle completed status -->
        <span
          :class="{ 'line-through': todo.completed, 'cursor-pointer': true }"
          @click="toggleCompleted(todo.id)"
        >
          {{ todo.text }}
        </span>
      </div>
      <div class="flex gap-2">
        <button
          @click="removeTodo(todo.id)"
          class="flex items-center justify-center p-2 bg-red-500 text-white rounded-full"
        >
          <Icon name="uil:trash" />
        </button>
        <button
          @click="editTodo(todo.id)"
          class="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full"
        >
          <Icon name="uil:edit" />
        </button>
      </div>
    </li>
  </ul>
</template>
