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

            <q-item clickable @click="openLogoutDialog = true">
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
    <q-dialog v-model="openLogoutDialog">
      <q-card style="width: 50vw">
        <q-card-section class="q-pa-md">
          <div class="text-h6">Logout</div>
          <div class="text-subtitle2">Are you sure you want to logout?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="secondary" @click="openLogoutDialog = false" />
          <q-btn label="Logout" color="primary" @click="handleLogout()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
const openLogoutDialog = ref(false)

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

const handleLogout = () => {
  authStore.logout()
  openLogoutDialog.value = false
}
</script>
