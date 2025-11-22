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

    <q-page-container class="q-pa-xl q-mt-xl"> <router-view /> </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
const authStore = useAuthStore()
const userMenu = ref(false)

function toggleUserMenu() {
  userMenu.value = !!userMenu.value
}
</script>
