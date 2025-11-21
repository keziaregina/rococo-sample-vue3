<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn flat round icon="menu" @click="toggleLeftDrawer" /> -->
        <q-toolbar-title>Simple Todo App</q-toolbar-title>
        <q-btn flat round icon="account_circle" @click="toggleUserMenu" />
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-xl q-mt-xl"> <router-view /> </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { onMounted, computed, ref } from 'vue'
</script>
