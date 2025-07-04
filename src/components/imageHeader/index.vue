<script setup lang="ts">
import dark from '@/assets/images/banner4.jpg'
// import dark from '@/assets/images/banner6.gif'
import light from '@/assets/images/banner2.jpg'
import { configStore, articleStore } from '@/store/index.js'
const { isDark } = storeToRefs(configStore())
import { debounce } from '@/utils/tools'

const { getArticle } = storeToRefs(articleStore())

const route = useRoute()
const homeList = ref([
    'A blog for me, A place to record my life',
    'Most of the time we have to enjoy loneliness'])
// 设置了overflow：hidden，所以document.body.scrollTo监听不到，直接监听window
// -60是因为顶部设置了margin-top:60px，如果样式删除，这里也要删掉 
const scrollToBottom = () => {
    const element = document.getElementById('home')
    if (element) {
        window.scrollTo({
            top: element.offsetHeight - 60,
            behavior: 'smooth'
        })
    }
}


onMounted(() => {
    // 页面增加滚动事件
    window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
});

const handleScroll = debounce(() => {
    const MAX_SCALE = 1.1 // 最大放大倍数 1.1
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scaleFactor = scrollTop <= 60 ? 1 : Math.min(1 + scrollTop / 300, MAX_SCALE)
    const image = document.querySelector('.top-banner .el-image')
    if (image) {
        image.style.transform = `scale(${scaleFactor})`
    }
}, 5);

const isHome = computed(() => route.path === '/home')
const isArticle = computed(() => route.path === '/article')





</script>


<template>
    <div class="w-full">
        <div id="home" v-if="isHome" class="top-banner">
            <el-image class="banner-image" :src="isDark ? dark : light" fit="cover" alt="home banner image" />
            <waves />
            <!-- 中间的文字 -->
            <div class="max-w-[60%] home-text-center">
                <div class="blog-title">
                    Delia's Blog
                </div>
                <div class="mt-[5rem]">
                    <vuetyped :strings="homeList" :showCursor="true" :typeSpeed="80" :loop="true">
                        <span class="typing text-gray-800 dark:text-white"></span>
                    </vuetyped>
                </div>
            </div>
            <!-- up图标 -->
            <MdiChevronDown class="up bounce" @click="scrollToBottom" />
        </div>
        <div v-else-if="isArticle" class="top-banner">
            <el-image class="w-full h-60 overflow-hidden" :src="isDark ? dark : light" fit="cover"
                alt="article banner image" />
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
            <el-image class="w-full h-60 overflow-hidden" :src="isDark ? dark : light" fit="cover"
                alt="top banner image" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.top-banner {
    @apply w-full relative h-[100vh] overflow-hidden font-mono;
}

svg {
    margin-right: 2px;
}

.home-text-center {
    @apply absolute top-1/2 left-1/2 text-center;
    transform: translate(-50%, -50%);
}

.blog-title {
    @apply text-white cursor-pointer;
    font-size: clamp(1em, 4vmin, 20em);
    padding: 0.5rem;

    &:hover {
        animation: anime 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) alternate forwards;
    }
}

.up {
    @apply absolute left-1/2 bottom-24 text-2xl text-white cursor-pointer;
    transform: translateX(-50%);
    animation: bounce-custom 2s infinite;

    @keyframes bounce {

        0%,
        20%,
        50%,
        80%,
        100% {
            transform: translateY(0);
        }
    }
}

@keyframes anime {
    from {
        font-variation-settings:
            "wght" 300,
            "slnt" 15;
        text-shadow: none;
    }

    to {
        font-variation-settings:
            "wght" 800,
            "slnt" 0;
        text-shadow:
            1px 1px 0px #00e6e6,
            2px 2px 0px #01cccc,
            5px 5px 5px #dda121;
    }
}

.banner-image {
    @apply w-full h-full object-cover transition-transform duration-700;
}

// 移动端适配
@media (max-width: 768px) {
    .banner-image {
        @apply scale-100;
        transform: none !important; // 禁用滚动缩放动画
    }
}
</style>