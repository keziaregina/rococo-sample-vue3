<template>
  <q-dialog v-model="model">
    <q-card style="width: 50vw">
      <q-card-section class="q-pa-md">
        <div class="text-h6">Add Task</div>
        <q-input v-model="title" label="Title" />
        <q-input v-model="description" label="Description" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="secondary" @click="closeDialog" />
        <q-btn label="Add" color="primary" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  openDialog: {
    type: Boolean,
    required: true,
  },
  onSubmit: {
    type: Function,
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

const submit = () => {
  props.onSubmit({
    title: title.value,
    description: description.value,
  })
  closeDialog()
}

const closeDialog = () => {
  title.value = ''
  description.value = ''
  emit('close')
}
</script>
