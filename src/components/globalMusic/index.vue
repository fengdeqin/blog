<script setup lang="ts">
import MusicToggle from './MusicToggle.vue'
import MusicPlayer from './MusicPlayer.vue'

const showPanel = ref(false)
</script>

<template>
    <div>
        <MusicToggle @toggle-panel="showPanel = !showPanel" />
        <MusicPlayer v-if="showPanel" @close="showPanel = false" />
    </div>
</template>
