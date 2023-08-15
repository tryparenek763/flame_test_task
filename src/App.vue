<template>
   <router-view />
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { INITIALIZE_STORE } from './store/actions'

const store = useStore()

store.dispatch(INITIALIZE_STORE)
</script>
