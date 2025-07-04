<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

type Track = {
    title: string
    artist: string
    cover: string
}

// 响应式状态
const hover = ref(false)
const track = reactive<Track>({
    title: '你落泪我情绪零碎',
    artist: '周杰伦',
    cover: 'https://pic4.zhimg.com/v2-62e7d6f2b9bf997d62bad4fcb237f0a1_r.jpg'
})

// 事件定义
const emit = defineEmits<{
    togglePanel: []
}>()

// 类名计算
const wrapperClass = computed(() =>
    `fixed bottom-20 z-50 transition-all duration-300 cursor-pointer ${hover.value ? 'left-0' : '-left-5'
    }`
)

const containerClass = computed(() =>
    `bg-black/80 text-white flex items-center transition-all duration-300 overflow-hidden ${hover.value
        ? 'w-[230px] pl-3 pr-2 py-2 rounded-full'
        : 'w-[50px] pl-2 py-2 justify-start rounded-l-full'
    }`
)
</script>

<template>
    <div :class="wrapperClass" @mouseenter="hover = true" @mouseleave="hover = false" @click="emit('togglePanel')">
        <div :class="containerClass">
            <img :src="track.cover" class="w-8 h-8 rounded-full object-cover">
            <transition name="fade">
                <div v-if="hover" class="ml-2 overflow-hidden whitespace-nowrap">
                    <div class="text-sm">{{ track.title }}</div>
                    <div class="text-xs text-gray-300">{{ track.artist }}</div>
                </div>
            </transition>
            <button v-if="hover" class="ml-auto bg-white/20 hover:bg-white/30 p-1 rounded-full" aria-label="Play">
                ▶
            </button>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>