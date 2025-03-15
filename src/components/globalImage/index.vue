<script setup>
defineProps({
    src: {
        type: String,
        default: null
    },
    // is lazy load
    lazy: {
        type: Boolean,
        default: false
    },
    // img fit
    fit: {
        type: String,
        default: 'cover'
    },
    animate: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <el-image :class="['w-[100%], h-[100%]', animate ? 'duration-300 hover:scale-110' : '']" :src="src" :lazy="lazy"
        v-bind="$attrs" :fit="fit">
        <!-- loading -->
        <template #placeholder>
            <div class="w-[100%] h-[100%] grid place-items-center">
                <SvgSpinners3DotsScale class="w-[2rem] h-[2rem]" />
            </div>
        </template>
        <!-- loading error -->
        <template #error>
            <div class="w-[100%] h-[100%] grid place-items-center">
                <MdiErrorOutline class="w-[2rem] h-[2rem]" />
            </div>
        </template>
    </el-image>
</template>

<style scoped></style>