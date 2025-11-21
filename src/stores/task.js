import { defineStore } from 'pinia'
import axios from 'config/axios'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
  }),

  getters: {
    tasksList: (state) => state.tasks,
  },

  actions: {
    /**
     * Fetch tasks from the API by auth user
     */
    async fetchTasks() {
      try {
        const response = await axios.get('/task/list/1')
        this.tasks = response.data.tasks
      } catch (error) {
        console.error('Error fetching tasks:', error)
        throw error
      }
    },

    /**
     * Create a new task
     */
    async createTask(payload) {
      try {
        await axios.post('/task/create', payload)
        await this.fetchTasks()
      } catch (error) {
        console.error('Error create task:', error)
        throw error
      }
    },

    /**
     * Update a task
     */
    async updateTask(id, payload) {
      try {
        await axios.put(`/task/update/${id}`, payload)
        await this.fetchTasks()
      } catch (error) {
        console.error('Error update task:', error)
        throw error
      }
    },

    /**
     * Delete a task
     */
    async deleteTask(id) {
      try {
        await axios.delete(`/task/delete/${id}`)
        await this.fetchTasks()
      } catch (error) {
        console.error('Error delete task:', error)
        throw error
      }
    },

    /**
     * Complete a task
     */
    async completeTask(id) {
      try {
        await axios.put(`/task/complete/${id}`)
        await this.fetchTasks()
      } catch (error) {
        console.error('Error complete task:', error)
        throw error
      }
    },

    /**
     * Uncomplete a task
     */
    async uncompleteTask(id) {
      try {
        await axios.put(`/task/incomplete/${id}`)
        await this.fetchTasks()
      } catch (error) {
        console.error('Error uncomplete task:', error)
        throw error
      }
    },
  },
})
