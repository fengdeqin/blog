<script setup>
import PageHeader from '@/components/page-header/index.vue'
</script>

<template>
    <div class="main-container">
        <PageHeader />
        <div class="max-w-[1280px] mx-auto p-[40px]">
            <router-view></router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>