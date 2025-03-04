<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import banner from '@/assets/images/banner2.jpg'
import banner1 from '@/assets/images/banner1.jpg'
import MdiChevronDown from '~icons/mdi/chevron-down'
import { debounce } from '@/utils/tools'
import { articleStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
// import FluentDividerShort20Filled from '~icons/fluent/divider-short-20-filled'
// import MaterialSymbolsDateRange from '~icons/material-symbols/date-range'
// import TablerClockHour2 from '~icons/tabler/clock-hour-2'
// import SolarCardSendLinear from '~icons/solar/card-send-linear'
// import AntDesignLikeOutlined from '~icons/ant-design/like-outlined'
// import IcOutlineRemoveRedEye from '~icons/ic/outline-remove-red-eye'
// import SimpleIconsPinboard from '~icons/simple-icons/pinboard'
// import GravityUiServer from '~icons/gravity-ui/server'
// import MaterialSymbolsMarkChatUnreadOutline from '~icons/material-symbols/mark-chat-unread-outline'

const { getArticle } = storeToRefs(articleStore())

const route = useRoute()
const showScroll = ref(true)

// 设置了overflow：hidden，所以document.body.scrollTo监听不到，直接监听window
// 点击跳文章顶部
const scrollToBottom = () => {
    const element = document.getElementById('home')
    if (element) {
        window.scrollTo({
            top: element.offsetHeight,
            behavior: 'smooth'
        })
    }
}

// 监听事件
const scrollListener = () => {
    if (window.scrollY > 300) {
        showScroll.value = false
    } else {
        showScroll.value = true
    }
}

// 通过防抖包装滚动事件处理函数
const debouncedScrollListener = debounce(scrollListener, 100);


onMounted(() => {
    window.addEventListener('scroll', debouncedScrollListener)
})

onBeforeUnmount(() => {
    // 在组件销毁前，移除滚动事件监听器
    // console.log("组件即将销毁，移除监听");
    // window.removeEventListener("scroll", debouncedScrollListener);
    // window.scrollTo(0, 0); // 手动重置滚动位置
});

</script>


<template>
    <div class="w-full">
        <div id="home" v-if="route.path == '/home'" class="top-banner h-[100vh]">
            <!-- image bg -->
            <el-image class="w-full h-full" :src="banner" fit="cover"></el-image>
            <!-- 中间的文字 -->
            <div v-if="showScroll"
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] text-center text-white">
                <div class="text-4xl font-bold">
                    Blog
                </div>
                <div class="text-2xl">
                    Never put off till tomorrow what you can do today
                </div>
            </div>
            <!-- up图标 -->
            <MdiChevronDown class="animate-bounce absolute left-1/2 bottom-20 -translate-x-1/2 text-4xl text-gray-300"
                @click="scrollToBottom" />
            <!-- 图层遮罩，后面设计好页面再决定要不要这个 -->
            <!-- <div class="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.1)] z-10"></div> -->
        </div>
        <div v-else-if="route.path == '/article'" class="top-banner">
            <el-image class="w-full h-60 overflow-hidden" :src="banner" fit="cover"></el-image>
            <div class="absolute h-60 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold text-white">
                <span>{{ getArticle.title }}</span>
                <div class="text-sm flex flex-wrap justify-center text-center">
                    <MaterialSymbolsDateRange />
                    <div>Published in {{ getArticle.date }}</div>
                    <FluentDividerShort20Filled />
                    <TablerClockHour2 />
                    <div>Updated On {{ getArticle.update }}</div>
                    <FluentDividerShort20Filled />
                    <GravityUiServer />
                    <div>{{ getArticle.category }}</div>
                    <FluentDividerShort20Filled />
                    <SolarCardSendLinear />
                    <div>{{ getArticle.tags.join('、') }}</div>
                    <FluentDividerShort20Filled />
                    <AntDesignLikeOutlined />
                    <div>{{ getArticle.likes }}</div>
                    <FluentDividerShort20Filled />
                    <IcOutlineRemoveRedEye />
                    <div>{{ getArticle.views }}</div>
                    <FluentDividerShort20Filled />
                    <MaterialSymbolsMarkChatUnreadOutline />
                    <div>{{ getArticle.readDuration }}</div>
                </div>
            </div>
        </div>
        <div v-else class="top-banner">
            <el-image class="w-full h-60 overflow-hidden" :src="banner1" fit="cover">2333</el-image>
        </div>
    </div>
</template>

<style lang="postcss" scoped>
.top-banner {
    @apply w-full relative;
}
svg{
    margin-right: 2px;
}
</style>