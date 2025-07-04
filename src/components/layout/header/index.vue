<script setup>
import LineMdMoonTwotoneAltLoop from '~icons/line-md/moon-twotone-alt-loop'
import LineMdMoonToSunnyOutlineLoopTransition from '~icons/line-md/moon-to-sunny-outline-loop-transition'
import { configStore } from '@/store/index.js'
import { debounce } from '@/utils/tools'
import { reactive } from 'vue'
// 直接从 Pinia store 中获取 getIsDark
const { isDark } = storeToRefs(configStore())

const router = useRouter()
const route = useRoute();

const menuList = shallowRef([
    {
        title: 'Home',
        icon: defineAsyncComponent(() => import('~icons/meteor-icons/home')),
        path: '/home',
        children: []
    },
    {
        title: 'Archive',
        icon: defineAsyncComponent(() => import('~icons/qlementine-icons/clock-16')),
        path: '/archive',
        children: []
    },
    {
        title: 'Talk',
        icon: defineAsyncComponent(() => import('~icons/fluent-emoji-high-contrast/left-speech-bubble')),
        path: '/talk',
        children: []
    },
    {
        title: 'More',
        icon: defineAsyncComponent(() => import('~icons/icon-park-outline/more')),
        path: '/more',
        children: [
            {
                title: 'About Me',
                icon: defineAsyncComponent(() => import('~icons/qlementine-icons/accessibility-16')),
                path: '/aboutMe',
                children: []
            },
        ]
    },
])

const handleSelect = (path) => {
    if (path) {
        router.push(path)
    }
}

const headerInfo = reactive({})

// 顶部导航固定
const scroll = debounce(() => {
    headerInfo.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    headerInfo.headerClass = headerInfo.scrollTop <= 50 ? "fixed-header" : "hide-header";
}, 5);

onMounted(() => {
    // 页面增加滚动事件
    window.addEventListener("scroll", scroll);
});

onBeforeUnmount(() => {
    window.removeEventListener("scroll", scroll);
});

</script>

<template>
    <div :class="['header-container', headerInfo.headerClass]" 
    :style="{
      background: headerInfo.scrollTop > 50 ? `var(--header-${isDark ? 'dark' : 'light'})` : 'transparent',
    }">
        <div class="flex">
            <el-avatar class="transition-transform duration-[1200ms] hover:rotate-180"
                src="https://wx3.sinaimg.cn/mw690/008wGrFlly1hvy65qa520j30t80t8wgi.jpg" />
            <!-- <MdiAbjadHebrew class="text-white text-4xl transition-all transition-duration-300 hover:rotate-180" /> -->
        </div>
        <div class="flex items-center text-center">
            <el-menu :default-active="route.path || '/home'" :ellipsis="false" mode="horizontal" @select="handleSelect">
                <el-menu-item v-for="item in menuList" :key="item.path">
                    <el-sub-menu v-if="item.children.length" :index="item.path">
                        <template #title>
                            <component class="text-xl px-1" :is="item.icon" />
                            {{ item.title }}
                        </template>
                        <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.path">
                            <component class="text-xl px-1" :is="subItem.icon" />
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-sub-menu>
                    <el-menu-item v-else :index="item.path">
                        <component class="text-xl px-1" :is="item.icon" />
                        {{ item.title }}
                    </el-menu-item>
                </el-menu-item>
            </el-menu>
            <!-- 头像 -->
            <!-- <el-avatar src="https://wx3.sinaimg.cn/mw690/008wGrFlly1hvy65qa520j30t80t8wgi.jpg" /> -->
            <!-- 主题切换 -->
            <el-switch v-model="isDark" @change="configStore().SetThemeColor()" class="mx-[2rem]" inline-prompt
                :active-icon="LineMdMoonToSunnyOutlineLoopTransition" :inactive-icon="LineMdMoonTwotoneAltLoop"
                style="--el-switch-on-color: #e7f0eb; --el-switch-off-color: #444343" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.header-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
}
.hide-header {
    animation-name: hideHeader;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
}

.fixed-header {
    animation-name: header;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;
}

@keyframes header {
    0% {
        transform: translateY(-52px);
    }

    100% {
        transform: translateY(0px);
    }
}

@keyframes hideHeader {
    0% {
        transform: translateY(0px);
    }

    100% {
        transform: translateY(-52px);
    }
}
</style>