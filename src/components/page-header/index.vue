<script setup>
import banner6 from '@/assets/images/banner6.gif'
import banner5 from '@/assets/images/banner5.gif'

import { debounce } from '@/utils/tools'
import { articleStore } from '@/store/index.js'

const { getArticle } = storeToRefs(articleStore())

const route = useRoute()
const showScroll = ref(true)

// 设置了overflow：hidden，所以document.body.scrollTo监听不到，直接监听window
// 点击跳文章顶部
const scrollToBottom = () => {
    console.log(199, route.path)
    const element = document.getElementById('home')
    if (element) {
        window.scrollTo({
            top: element.offsetHeight - 60,
            behavior: 'smooth'
        })
    }
}

// 监听事件
const scrollListener = () => {
    if (window.scrollY > 200) {
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

const resetPageSet = () => {
    window.removeEventListener("scroll", debouncedScrollListener);
    window.scrollTo(0, 0); // 手动重置滚动位置
}

onBeforeUnmount(() => {
    // 在组件销毁前，移除滚动事件监听器
    console.log("组件即将销毁，移除监听");
    resetPageSet()
});

</script>


<template>
    <div class="w-full">
        <div id="home" v-if="route.path == '/home'" class="top-banner h-[100vh] font-mono text-white">
            <!-- image bg -->
            <el-image class="w-full h-full" :src="banner6" fit="cover"></el-image>
            <!-- 中间的文字 -->
            <div v-if="showScroll" class="max-w-[60%] home-text-center">
                <div class="text-4xl font-bold">
                    Blog
                </div>
                <div class="text-white mt-5">
                    <vuetyped :strings="['Most of the time we have to enjoy loneliness']" :showCursor="true"
                        :typeSpeed="80" :loop="true">
                        <span class="typing"></span>
                    </vuetyped>
                </div>
            </div>
            <!-- up图标 -->
            <MdiChevronDown class="animate-bounce absolute left-1/2 bottom-20 -translate-x-1/2 text-3xl"
                @click="scrollToBottom" />
            <!-- 图层遮罩，后面设计好页面再决定要不要这个 -->
            <!-- <div class="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.1)] z-10"></div> -->
        </div>
        <div v-else-if="route.path == '/article'" class="top-banner">
            <el-image class="w-full h-60 overflow-hidden" :src="banner6" fit="cover"></el-image>
            <div class="my-5 text-3xl font-bold text-white home-text-center">
                <span>{{ getArticle.title }}</span>
                <div class="text-sm flex flex-wrap justify-center text-center mt-3">
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
            <el-image class="w-full h-60 overflow-hidden" :src="banner6" fit="cover">2333</el-image>
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
.home-text-center{
    @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center;
}
</style>