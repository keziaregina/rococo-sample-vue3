<template>
  <div class="text-h6">
    Hi {{ authStore.user?.first_name || '' }} {{ authStore.user?.last_name || '' }}, ready to work?
  </div>

  <div v-if="taskStore.tasksList.length === 0">
    <q-card class="q-mt-md flex flex-center" style="min-height: 200px">
      <q-card-section class="text-center">
        <div class="text-h6">You don't have any tasks yet</div>
        <div class="text-subtitle2">Add a new task to get started</div>
        <q-btn label="Add Task" color="primary" class="q-mt-md" @click="addTask" />
      </q-card-section>
    </q-card>
  </div>

  <div v-else>
    <q-card class="q-mt-md">
      <q-card-section class="flex justify-between items-center">
        <div class="text-h6">Task List</div>
        <div class="flex justify-center q-gutter-sm">
          <q-btn color="primary" label="Add Task" @click="addTask" />
          <q-select
            v-model="selectedFilter"
            :options="filters"
            option-label="label"
            option-value="value"
            dense
            filled
            emit-value
            map-options
            @update:model-value="filterTasks"
            style="min-width: 180px"
          />
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div v-if="tasks.length === 0">
          <div class="text-center">No tasks found</div>
        </div>
        <div v-else>
          <q-card
            flat
            bordered
            class="q-pa-sm row items-center justify-between gap-y-md"
            v-for="task in tasks"
            :key="task.id"
          >
            <div class="col-auto">
              <q-checkbox
                v-model="task.is_complete"
                v-on:update:model-value="
                  task.is_complete == true
                    ? taskStore.completeTask(task.entity_id)
                    : task.is_complete == false
                      ? taskStore.uncompleteTask(task.entity_id)
                      : taskStore.fetchTasks()
                "
              />
            </div>

            <div class="col text-left q-pl-md">
              <div class="text-subtitle2">{{ task.title }}</div>
              <div class="text-caption text-grey">{{ task.description }}</div>
            </div>

            <div class="col-auto flex q-gutter-sm">
              <q-btn dense flat round icon="edit" color="primary" @click="editTask(task)" />

              <q-btn dense flat round icon="delete" color="negative" @click="deleteTask(task)" />
            </div>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <q-dialog v-model="openDeleteDialog">
    <q-card style="width: 50vw">
      <q-card-section class="q-pa-md">
        <div class="text-h6">Delete Task</div>
        <div class="text-subtitle2 q-mt-md">Are you sure you want to delete this task?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="secondary" @click="openDeleteDialog = false" />
        <q-btn label="Delete" color="primary" @click="handleDeleteTask(selectedTask.entity_id)" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <AddTaskModal
    :openDialog="openAddDialog"
    @close="openAddDialog = false"
    :onSubmit="handleSubmitAdd"
  />
  <EditTaskModal
    :openDialog="openEditDialog"
    @close="openEditDialog = false"
    :onSubmit="handleSubmitEdit"
    :task="selectedTask"
  />
</template>

<script setup>
import { useTaskStore } from 'stores/task'
import { ref, onMounted } from 'vue'
import AddTaskModal from 'src/components/Task/AddTaskModal.vue'
import EditTaskModal from 'src/components/Task/EditTaskModal.vue'
import { useAuthStore } from 'src/stores/auth'

const authStore = useAuthStore()
const taskStore = useTaskStore()
const openAddDialog = ref(false)
const openEditDialog = ref(false)
const selectedTask = ref(null)
const openDeleteDialog = ref(false)

const tasks = ref([])

const selectedFilter = ref('all')
const filters = [
  {
    label: 'All Tasks',
    value: 'all',
  },
  {
    label: 'Completed Tasks',
    value: 'completed',
  },
  {
    label: 'Incomplete Tasks',
    value: 'incomplete',
  },
]

onMounted(async () => {
  await taskStore.fetchTasks()
  tasks.value = [...taskStore.tasksList]
})

const addTask = async () => {
  openAddDialog.value = true
}

const editTask = (task) => {
  selectedTask.value = task
  console.log(selectedTask.value)
  openEditDialog.value = true
}

const deleteTask = (task) => {
  selectedTask.value = task
  openDeleteDialog.value = true
}

const handleSubmitAdd = async (payload) => {
  await taskStore.createTask(payload)
  tasks.value = [...taskStore.tasksList]
  openAddDialog.value = false
}

const handleSubmitEdit = async (payload) => {
  await taskStore.updateTask(selectedTask.value.entity_id, payload)
  selectedTask.value = null
  tasks.value = [...taskStore.tasksList]
  openEditDialog.value = false
}

const handleDeleteTask = async (id) => {
  await taskStore.deleteTask(id)
  selectedTask.value = null
  tasks.value = [...taskStore.tasksList]
  openDeleteDialog.value = false
}

const filterTasks = () => {
  if (selectedFilter.value === 'completed') {
    tasks.value = taskStore.tasksList.filter((task) => task.is_complete)
  } else if (selectedFilter.value === 'incomplete') {
    tasks.value = taskStore.tasksList.filter((task) => !task.is_complete)
  } else {
    tasks.value = taskStore.tasksList
  }
}
</script>
