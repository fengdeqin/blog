<script setup>
import archiveBanner from '@/assets/images/banner3.gif'
const archiveList = [
    {
    id: '1',
    title: 'Update Github template',
    cover: archiveBanner,
    createTime: '2018/4/12 20:46'
    },
    {
    id: '2',
    title: 'Update Github template',
    cover: archiveBanner,
    createTime: '2018/4/13 20:46'
    },
    {
    id: '3',
    title: 'Update Github template',
    cover: archiveBanner,
    createTime: '2018/4/15 20:46'
    },
    {
    id: '4',
    title: 'Update Github template',
    cover: archiveBanner,
    createTime: '2018/4/17 20:46'
    }
]

const params = reactive({
    page: 1,
    pageSize: 5
})
const getArchiveList = () => {
    const currentPage = (params.page - 1) * params.pageSize
    const currentPageSize = currentPage + params.pageSize
    articleList.value = archiveList.slice(currentPage, currentPageSize)
}

</script>

<template>
    <el-timeline style="max-width: 600px;color: aliceblue;">
        <el-timeline-item v-for="(item, index) in archiveList" :key="index" center placement="top">
            <!-- {{ item.createTime }} -->
            <div class="flex items-center">
                <div class="cover w-[6rem] h-[6rem] overflow-hidden duration-300 hover:scale-110">
                    <el-image :src="item.cover" class="w-[100%] h-[100%]"></el-image>
                </div>
                <div class="ml-5">
                    <div class="text-xl">{{ item.title }}</div>
                    <div class="title">{{ item.createTime }}</div>
                </div>
            </div>
        </el-timeline-item>
    </el-timeline>
    <div class="flex justify-center items-center">
        <el-pagination v-model:current-page="params.page" :page-size="params.pageSize" layout="prev, pager, next"
            :total="archiveList.length" @change="getArchiveList" />
    </div>
</template>

<style lang="sass" scoped>
</style>