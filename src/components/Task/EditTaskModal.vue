<template>
  <q-dialog v-model="model">
    <q-card style="width: 50vw">
      <q-card-section class="q-pa-md">
        <div class="text-h6">Edit Task</div>
        <q-input v-model="title" label="Title" />
        <q-input v-model="description" label="Description" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="secondary" @click="closeDialog" />
        <q-btn label="Submit" color="primary" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, watch } from 'vue'

const props = defineProps({
  openDialog: {
    type: Boolean,
    required: true,
  },
  onSubmit: {
    type: Function,
    required: true,
  },
  task: {
    type: Object,
    required: true,
  },
})

const title = ref('')
const description = ref('')
const emit = defineEmits(['close'])

const model = computed({
  get: () => props.openDialog,
  set: (value) => {
    if (!value) emit('close')
  },
})

watch(
  () => props.task,
  (task) => {
    title.value = task?.title || ''
    description.value = task?.description || ''
  },
  { immediate: true },
)

const submit = () => {
  props.onSubmit({
    title: title.value,
    description: description.value,
  })
  closeDialog()
  title.value = ''
  description.value = ''
}

const closeDialog = () => {
  console.log(props.task)
  emit('close')
}
</script>
