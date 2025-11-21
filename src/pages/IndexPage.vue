<template>
  <div>Hi Kezia, ready to work?</div>

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
        <q-btn label="Add Task" color="primary" class="q-mt-md" @click="addTask" />
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-card
          flat
          bordered
          class="q-pa-sm row items-center justify-between gap-y-md"
          v-for="task in taskStore.tasksList"
          :key="task.id"
        >
          <div class="col-auto">
            <q-checkbox
              v-model="task.is_complete"
              v-on:update:model-value="
                task.is_complete
                  ? taskStore.completeTask(task.entity_id)
                  : taskStore.uncompleteTask(task.entity_id)
              "
            />
          </div>

          <div class="col text-left q-pl-md">
            <div class="text-subtitle2">{{ task.title }}</div>
            <div class="text-caption text-grey">{{ task.description }}</div>
          </div>

          <div class="col-auto flex q-gutter-sm">
            <q-btn dense flat round icon="edit" color="primary" @click="editTask(task)" />

            <q-btn
              dense
              flat
              round
              icon="delete"
              color="negative"
              @click="taskStore.deleteTask(task.entity_id)"
            />
          </div>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
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

const taskStore = useTaskStore()
const openAddDialog = ref(false)
const openEditDialog = ref(false)
const selectedTask = ref(null)

onMounted(async () => {
  await taskStore.fetchTasks()
})

const addTask = async () => {
  openAddDialog.value = true
}

const editTask = (task) => {
  selectedTask.value = task
  console.log(selectedTask.value)
  // return
  openEditDialog.value = true
}

const handleSubmitAdd = async (payload) => {
  await taskStore.createTask(payload)
  openAddDialog.value = false
}

const handleSubmitEdit = async (payload) => {
  await taskStore.updateTask(selectedTask.value.entity_id, payload)
  openEditDialog.value = false
}
</script>
