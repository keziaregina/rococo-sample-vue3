import { defineStore } from 'pinia'
import { Notify } from 'quasar'
import axios from 'config/axios'
import { useAuthStore } from 'stores/auth'

const authStore = useAuthStore()

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
        const response = await axios.get(`/task/list/${authStore.user.entity_id}`)
        if (!response.data.success) {
          throw new Error(response.message)
        }
        this.tasks = response.data.tasks
      } catch (error) {
        Notify.create({
          message: 'Error fetching tasks',
          color: 'negative',
          position: 'top-right',
        })
        throw error
      }
    },

    /**
     * Create a new task
     */
    async createTask(payload) {
      try {
        const response = await axios.post('/task/create', payload)
        if (!response.data.success) {
          throw new Error(response.message)
        }
        Notify.create({
          message: 'Task created successfully',
          color: 'positive',
          position: 'top-right',
        })
        await this.fetchTasks()
      } catch (error) {
        Notify.create({
          message: 'Error creating task',
          color: 'negative',
          position: 'top-right',
        })
        throw error
      }
    },

    /**
     * Update a task
     */
    async updateTask(id, payload) {
      try {
        const response = await axios.put(`/task/update/${id}`, payload)
        if (!response.data.success) {
          throw new Error(response.message)
        }
        Notify.create({
          message: 'Task updated successfully',
          color: 'positive',
          position: 'top-right',
        })
        await this.fetchTasks()
      } catch (error) {
        Notify.create({
          message: 'Error updating task',
          color: 'negative',
          position: 'top-right',
        })
        throw error
      }
    },

    /**
     * Delete a task
     */
    async deleteTask(id) {
      try {
        const response = await axios.delete(`/task/delete/${id}`)
        if (!response.data.success) {
          throw new Error(response.message)
        }
        await this.fetchTasks()
        Notify.create({
          message: 'Task deleted successfully',
          color: 'positive',
          position: 'top-right',
        })
      } catch (error) {
        Notify.create({
          message: 'Error deleting task',
          color: 'negative',
          position: 'top-right',
        })
        throw error
      }
    },

    /**
     * Complete a task
     */
    async completeTask(id) {
      try {
        const response = await axios.put(`/task/complete/${id}`)
        if (!response.data.success) {
          throw new Error(response.message)
        }
        await this.fetchTasks()
        Notify.create({
          message: 'Task completed successfully',
          color: 'positive',
          position: 'top-right',
        })
      } catch (error) {
        Notify.create({
          message: 'Error completing task',
          color: 'negative',
          position: 'top-right',
        })
        throw error
      }
    },

    /**
     * Uncomplete a task
     */
    async uncompleteTask(id) {
      try {
        const response = await axios.put(`/task/incomplete/${id}`)
        if (!response.data.success) {
          throw new Error(response.message)
        }
        await this.fetchTasks()
        Notify.create({
          message: 'Task uncompleted successfully',
          color: 'positive',
          position: 'top-right',
        })
      } catch (error) {
        Notify.create({
          message: 'Error uncompleting task',
          color: 'negative',
          position: 'top-right',
        })
        throw error
      }
    },
  },
})
