<script setup>
import { configStore } from '@/store/index.js'
// 直接从 Pinia store 中获取 getIsDark
const { isDark } = storeToRefs(configStore())

const router = useRouter()
const route = useRoute();

const menuList = shallowRef([
    {
        title: 'Home',
        icon: defineAsyncComponent(() => import('~icons/qlementine-icons/heart-16')),
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
        router.push(path);
    }
}

</script>

<template>
    <div class="header-container flex justify-between backdrop-blur mx-2">
        <div class="flex">
            <MdiAbjadHebrew class="text-white text-4xl transition-all transition-duration-300 hover:rotate-180" />
        </div>
        <div class="flex">
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
            <el-avatar src="https://wx3.sinaimg.cn/mw690/008wGrFlly1hvy65qa520j30t80t8wgi.jpg" />
            <!-- 主题切换 -->
            <el-switch v-model="isDark" @change="configStore().SetThemeColor()" class="mx-[2rem]"
                :active-icon="'line-md:moon-to-sunny-outline-loop-transition'" :inactive-icon="'ic:baseline-close'"
                style="--el-switch-on-color: #e7f0eb; --el-switch-off-color: #444343" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>