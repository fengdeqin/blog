<script setup>
import MusicWidget from '@/components/globalMusic/index.vue'
</script>

<template>
  <router-view></router-view>
  <MusicWidget /> <!-- 永远在最外层，不会因页面切换而被销毁 -->
</template>

