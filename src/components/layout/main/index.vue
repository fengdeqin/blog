<script setup>
// import PageHeader from '@/components/page-header/index.vue'
const wideList = ['/home', '/article']

</script>

<template>
    <div class="main-container">
        <ImageHeader />
        <div
            :class="[wideList.includes($route.path) ? 'max-w-[1280px]' : 'max-w-[880px]', 'mx-auto', 'md:p-[40px]', 'px-[10px]', 'pt-[60px]']">
            <router-view></router-view>
        </div>
        <globalMusic />
        </div>
</template>

<style lang="scss" scoped></style>