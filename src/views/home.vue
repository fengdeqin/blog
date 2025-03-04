<script setup>
// import { onMounted, reactive, ref } from 'vue'
// import { useRouter } from 'vue-router'
import banner1 from '@/assets/images/banner1.jpg'
// import FluentDividerShort20Filled from '~icons/fluent/divider-short-20-filled'
// import MaterialSymbolsDateRange from '~icons/material-symbols/date-range'
// import TablerClockHour2 from '~icons/tabler/clock-hour-2'
// import SolarCardSendLinear from '~icons/solar/card-send-linear'
// import AntDesignLikeOutlined from '~icons/ant-design/like-outlined'
// import IcOutlineRemoveRedEye from '~icons/ic/outline-remove-red-eye'
// import SimpleIconsPinboard from '~icons/simple-icons/pinboard'
// import GravityUiServer from '~icons/gravity-ui/server'
// import GrommetIconsGithub from '~icons/grommet-icons/github'
// import FaBrandsWeixin from '~icons/fa-brands/weixin'
// import FaWeibo from '~icons/fa/weibo'
// import FaQq from '~icons/fa/qq'
// import FluentEmojiFlatHandWithIndexFingerAndThumbCrossedMediumLight from '~icons/fluent-emoji-flat/hand-with-index-finger-and-thumb-crossed-medium-light'
// import Fa6RegularBookmark from '~icons/fa6-regular/bookmark'
// import MaterialSymbolsAndroidChat from '~icons/material-symbols/android-chat'
// import MaterialSymbolsMarkChatUnreadOutline from '~icons/material-symbols/mark-chat-unread-outline'

const router = useRouter()
const goArticlePage = (id)=>{
    router.push({ path: '/article', query: { id }})
}

const params = reactive({
    page: 1,
    pageSize: 5
})
const articleList = ref([])
const staticArticleList = [
    {
        id: 1,
        title: 'Personal blog deployment',
        desc: 'Blog deployment, record it',
        date: '2023-05-19 19:47:44',
        update: '2025-02-22 19:47:44',
        tags: ['Vue', 'Js', 'Element-plus'],
        likes: 93,
        views: 9000,
        category: 'Blog deployment',
        readDuration: '100hours',
    },
    {
        id: 2,
        title: 'Blog deployment',
        desc: 'Blog deployment, record it',
        date: '2023-05-19 19:47:44',
        update: '2025-02-22 19:47:44',
        tags: ['linux', 'Alibaba Cloud Lightweight Server', 'Pagoda panel'],
        likes: 23,
        views: 7000,
        category: 'Blog deployment',
        readDuration: '100hours'
    },
    {
        id: 3,
        title: 'Personal blog deployment',
        desc: 'Blog deployment, record it',
        date: '2023-05-19 19:47:44',
        update: '2025-02-22 19:47:44',
        tags: ['linux', 'Alibaba Cloud Lightweight Server', 'Pagoda panel'],
        likes: 23,
        views: 7000,
        category: 'Blog deployment',
        readDuration: '100hours'
    },
    {
        id: 4,
        title: 'Personal blog deployment',
        desc: 'Blog deployment, record it',
        date: '2023-05-19 19:47:44',
        update: '2025-02-22 19:47:44',
        tags: ['linux', 'Alibaba Cloud Lightweight Server', 'Pagoda panel'],
        likes: 23,
        views: 7000,
        category: 'Blog deployment',
        readDuration: '100hours'
    },
    {
        id: 5,
        title: 'Personal blog deployment',
        desc: 'Blog deployment, record it',
        date: '2023-05-19 19:47:44',
        update: '2025-02-22 19:47:44',
        tags: ['linux', 'Alibaba Cloud Lightweight Server', 'Pagoda panel'],
        likes: 23,
        views: 7000,
        category: 'Blog deployment',
        readDuration: '100hours'
    },
    {
        id: 6,
        title: 'Personal blog deployment',
        desc: 'Blog deployment, record it',
        date: '2023-05-19 19:47:44',
        update: '2025-02-22 19:47:44',
        tags: ['linux', 'Alibaba Cloud Lightweight Server', 'Pagoda panel'],
        likes: 23,
        views: 7000,
        category: 'Blog deployment',
        readDuration: '100hours'
    },

]
const getArticleList = () => {
    const currentPage = (params.page - 1) * params.pageSize
    const currentPageSize = currentPage + params.pageSize
    articleList.value = staticArticleList.slice(currentPage, currentPageSize)
}

const personBlogInfo = ref([])
const getPersonBlogInfo = () => {
    // 调接口
    personBlogInfo.value = {
        title: "Feng's Personal Blog",
        desc: "Why can't I sleep for 25 hours every day",
        avatar: "https://wx3.sinaimg.cn/mw690/008wGrFlly1hvy65qa520j30t80t8wgi.jpg",
        articleNumber: 20,
        categoryNumber: 4,
        tagNumber: 21
    }
}

const tagList = ref([])
const getTagList = () => {
    tagList.value = ["Vue", "Js", "React", "Next", "Node", 'Npm', 'Pnpm', 'Python']
}

onMounted(() => {
    getArticleList()
    getPersonBlogInfo()
    getTagList()
})

</script>

<template>
    <el-row :gutter="20">
        <el-col :span="18">
            <el-card v-for="item in articleList" :key="item.id" class="mb-[1rem] shadow-always" @click="goArticlePage(item.id)">
                <div class="w-[100%] h-[16rem] flex">
                    <div class="w-[45%] h-[100%] overflow-hidden">
                        <el-image class="w-[100%] h-[100%] duration-300 hover:scale-125" :src="banner1"></el-image>
                    </div>
                    <div class="w-[55%] h-[100%] p-[1.2rem] flex flex-col justify-between">
                        <div class="text-2xl">{{ item.title }}</div>
                        <div class="text-sm flex flex-wrap items-center">
                            <SimpleIconsPinboard style="color: red" />
                            <div>Pin</div>
                            <FluentDividerShort20Filled />
                            <MaterialSymbolsDateRange />
                            <div>Published in {{ item.date }}</div>
                            <FluentDividerShort20Filled />
                            <TablerClockHour2 />
                            <div>Updated On {{ item.update }}</div>
                            <FluentDividerShort20Filled />
                            <GravityUiServer />
                            <div>{{ item.category }}</div>
                            <FluentDividerShort20Filled />
                            <SolarCardSendLinear />
                            <div>{{ item.tags.join('、') }}</div>
                            <FluentDividerShort20Filled />
                            <AntDesignLikeOutlined />
                            <div>Number of likes {{ item.likes }}</div>
                            <FluentDividerShort20Filled />
                            <IcOutlineRemoveRedEye />
                            <div>Number of views {{ item.views }}</div>
                            <FluentDividerShort20Filled />
                            <MaterialSymbolsMarkChatUnreadOutline />
                            <div>{{ item.readDuration }}</div>
                        </div>
                        <div class="text-xl w-[100%] text-ellipsis whitespace-nowrap overflow-hidden pt-10">
                            {{ item.category }}
                        </div>
                    </div>
                </div>
            </el-card>
            <div class="flex justify-center items-center">
                <el-pagination v-model:current-page="params.page" :page-size="params.pageSize"
                    layout="prev, pager, next" :total="staticArticleList.length" @change="getArticleList" />
            </div>
        </el-col>
        <el-col :span="6">
            <!-- blog info -->
            <div class="shadow"> <!-- info -->
                <div class="flex items-center p-[5px]">
                    <!-- <el-image style="width: 100px; height: 100px; " :src="banner1" :fit="fit"></el-image> -->
                    <el-avatar class="mr-[5px]" :size="48" :src="personBlogInfo.avatar" />
                    <div>{{ personBlogInfo.title }}</div>
                </div>
                <div class="p-[5px] text-sm">{{ personBlogInfo.desc }}</div>
                <!--  -->
                <div class="py-[30px] flex items-center justify-between">
                    <div>
                        <div>article</div>
                        <div>{{ personBlogInfo.articleNumber }}</div>
                    </div>
                    <div>
                        <div>category</div>
                        <div>{{ personBlogInfo.categoryNumber }}</div>
                    </div>
                    <div>
                        <div>tag</div>
                        <div>{{ personBlogInfo.tagNumber }}</div>
                    </div>
                </div>
                <!-- github -->
                <div class="flex justify-center items-center text-center bg-gray-200 hover:bg-gray-300">
                    <GrommetIconsGithub />
                    <span class="pl-1.5">My Github</span>
                </div>
                <!-- icon link  -->
                <div class="flex justify-between p-5">
                    <FaBrandsWeixin />
                    <FaWeibo />
                    <FaQq />
                </div>
            </div>
            <!-- public notice -->
            <div class="shadow my-9">
                <div class="flex items-center">
                    <FluentEmojiFlatHandWithIndexFingerAndThumbCrossedMediumLight />
                    <span class="pl-1">Announcement</span>
                </div>
                <!-- 地址发布后再修改 -->
                <div>
                    源码github地址:
                    <div>https://github.com/</div>
                    <div class="mt-2">技术没有交流群...</div>
                </div>
            </div>
            <!-- tag -->
            <el-affix style="width: inherit;" :offset="60">
                <div class="shadow">
                    <div class="flex items-center pl-2">
                        <Fa6RegularBookmark class="text-sm" /><span class="pl-2">tags</span>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="p-[0.2rem] bg-slate-300 m-2 rounded-md" v-for="item in tagList" :key="item">{{ item
                            }}
                        </div>
                    </div>
                </div>
            </el-affix>

            <!-- Site News -->
            <div class="shadow mt-9">
                <div class="flex items-center">
                    <MaterialSymbolsAndroidChat /><span class="pl-2">Site News</span>
                </div>
                <div>
                    <div class="site-new">Article Number: 20</div>
                    <div class="site-new">Work Time: 20 days</div>
                    <div class="site-new">Number of visit: 1,999</div>
                </div>
            </div>
        </el-col>
    </el-row>
    <div class="h-[200vh]">home</div>
</template>

<style lang="postcss" scoped>
.site-new {
    @apply my-2;
}

.shadow {
    @apply border shadow-md p-5;
}
</style>