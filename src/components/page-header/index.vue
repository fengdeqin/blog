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
    const element = document.getElementById('home')
    if (element) {
        window.scrollTo({
            top: element.offsetHeight,
            behavior: 'smooth'
        })
    }
}


const fullText = 'Welcome to my blog, Thank you for visiting!'
const displayedText = ref(""); // 当前显示的文本
const isTyping = ref(true); // 控制光标显示与否
let index = 0; // 当前字符的索引

// 模拟打字效果
const typeText = () => {
    if (index < fullText.length) {
        displayedText.value += fullText[index];
        index++;
        setTimeout(typeText, 200); // 控制打字速度
    } else {
        setTimeout(resetText, 2000); // 等待一秒后清空文本并重新开始
        isTyping.value = false; // 打字完成后开始闪烁光标
    }
};

// 清空文本并重新开始打字
const resetText = () => {
    displayedText.value = "";
    index = 0;
    isTyping.value = true; // 在打字时，光标停止闪烁
    typeText(); // 重新开始打字
};

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
    typeText(); // 页面加载后开始打字效果
})

onBeforeUnmount(() => {
    // 在组件销毁前，移除滚动事件监听器
    console.log("组件即将销毁，移除监听");
    window.removeEventListener("scroll", debouncedScrollListener);
    window.scrollTo(0, 0); // 手动重置滚动位置
});

</script>


<template>
    <div class="w-full">
        <div id="home" v-if="route.path == '/home'" class="top-banner h-[100vh] font-mono">
            <!-- image bg -->
            <el-image class="w-full h-full" :src="banner6" fit="cover"></el-image>
            <!-- 中间的文字 -->
            <div v-if="showScroll"
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[60%] text-center text-white">
                <div class="text-4xl font-bold">
                    Feng's Blog
                </div>
                <div class="text-2xl text-white relative mt-5 flex items-center justify-center">
                    <span>{{ displayedText }}</span>
                    <span v-if="isTyping" class="animate-blink">|</span> <!-- 只有在没有输入时，光标才闪烁 -->
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
            <div
                class="absolute h-60 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-3xl font-bold text-white">
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