<template>
  <q-dialog v-model="model">
    <q-card style="width: 50vw">
      <q-card-section class="q-pa-md">
        <div class="text-h6">Edit User</div>
        <q-input v-model="first_name" label="First Name" />
        <q-input v-model="last_name" label="Last Name" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="secondary" @click="closeDialog" />
        <q-btn label="Save" color="primary" @click="submit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import { useAuthStore } from 'stores/auth'
const authStore = useAuthStore()

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

const first_name = ref(authStore.user.first_name)
const last_name = ref(authStore.user.last_name)
const emit = defineEmits(['close'])

const model = computed({
  get: () => props.openDialog,
  set: (value) => {
    if (!value) emit('close')
  },
})

const submit = () => {
  props.onSubmit({
    first_name: first_name.value,
    last_name: last_name.value,
  })
  closeDialog()
}

const closeDialog = () => {
  first_name.value = authStore.user.first_name
  last_name.value = authStore.user.last_name
  emit('close')
}
</script>
