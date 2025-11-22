<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat round icon="menu" @click="toggleLeftDrawer" /> -->
        <q-toolbar-title>Simple Todo App</q-toolbar-title>
        <q-btn flat round icon="account_circle" @click="toggleUserMenu()" />

        <q-menu v-model="userMenu" anchor="bottom right" self="top right">
          <q-list style="min-width: 150px">
            <q-item clickable @click="goToEditUser">
              <q-item-section> Edit User </q-item-section>
            </q-item>

            <q-item clickable @click="authStore.logout()">
              <q-item-section> Logout </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-toolbar>
    </q-header>

    <EditUserModal
      :openDialog="openEditUserModal"
      @close="openEditUserModal = false"
      :onSubmit="handleSubmitEditUser"
    />

    <q-page-container class="q-pa-xl q-mt-xl"> <router-view /> </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { ref } from 'vue'
import EditUserModal from 'src/components/EditUserModal.vue'

const authStore = useAuthStore()
const userMenu = ref(false)
const openEditUserModal = ref(false)

const toggleUserMenu = () => {
  userMenu.value = !!userMenu.value
}

const goToEditUser = () => {
  openEditUserModal.value = true
}

const handleSubmitEditUser = async (payload) => {
  await authStore.updateUser(payload)
  openEditUserModal.value = false
}
</script>
