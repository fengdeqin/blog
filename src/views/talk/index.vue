<script setup>
import banner3 from '@/assets/images/banner3.gif'
import { nextTick, onBeforeMount, ref } from 'vue'


const staticTalkList = [
    {
        id: 1,
        user_id: 1,
        nick_name: 'F',
        content: 'Limited by low-code, the workload is full every day',
        imagesList: [banner3, banner3, banner3, banner3]
    },
    {
        id: 2,
        user_id: 2,
        nick_name: 'D',
        content: 'launch an attack',
        imagesList: [banner3]
    },
    {
        id: 3,
        user_id: 3,
        nick_name: 'Q',
        content: 'a heart attack',
        imagesList: [banner3]
    },
    {
        id: 4,
        user_id: 3,
        nick_name: 'Q',
        content: 'a heart attack',
        imagesList: [banner3]
    },
    {
        id: 5,
        user_id: 5.3,
        nick_name: 'attach',
        content: 'attach a bell to a cat',
        imagesList: [banner3]
    },
    {
        id: 6,
        user_id: 6,
        nick_name: 'Q',
        content: 'a heart attack',
        imagesList: [banner3]
    },
    {
        id: 7,
        user_id: 7,
        nick_name: 'Q',
        content: 'attach sth to...',
        imagesList: [banner3]
    },
    {
        id: 8,
        user_id: 8.3,
        nick_name: 'Qin',
        content: 'attach importance to sth',
        imagesList: [banner3]
    },
]

const talkList = ref([])

const params = reactive({
    page: 1,
    pageSize: 5
})

const loadMore = ref(true)
let observerDom = null, observer = null

const getTalkList = () => {
    let currentPage = (params.page - 1) * params.pageSize
    let currentPageSize = currentPage + params.pageSize
    let sliceList = staticTalkList.slice(currentPage, currentPageSize)
    talkList.value = params.currentPage === 1 ? sliceList : [...talkList.value, ...sliceList ]
    // is load more
    if (talkList.value.length < staticTalkList.length){
        loadMore.value = false
    }
}


const observerTalk = () =>{
    observerDom = document.querySelector('.observer')
    // IntersectionObserver元素集合 监听
    observer = new IntersectionObserver(entries => {
        console.log(entries, 'entries')  //如果数组有多个元素 这里需要改成遍历
        if (entries[0].isIntersecting) {
            params.page++
            getTalkList()
        }
    })
    observerDom && observer.observe(observerDom)
}

const initTalk = () => {
    getTalkList()
    nextTick(() => {
       observerTalk()
    })
}

onMounted(() => {
    initTalk()
})

onBeforeMount(()=>{
    // 清理 IntersectionObserver
    observer && observer.unobserve(observerDom)
    observer = null
})

</script>
<template>
    <el-card>
        <div class="p-[40px]">
            <div class="flex mb-[2rem] border-b pb-[2rem]" v-for="item in talkList" :key="item.id">
                <div class="left mr-[1rem]">
                    <el-avatar :size="64" shape="square">{{ item.nick_name }}</el-avatar>
                </div>
                <div class="right flex flex-col items-start">
                    <div class="text-xl mb-[1.5rem]">{{ item.nick_name }}</div>
                    <div class="text-xl mb-[1rem]">{{ item.content }}</div>
                    <div v-if="item.imagesList.length > 1" class="grid grid-cols-3 gap-1">
                        <div class="w-[100px] h-[100px] overflow-hidden" v-for="img in item.imagesList" :key="img">
                            <el-image :src="img" fit="cover" class="w-[100%] h-[100%]" />
                        </div>
                    </div>
                    <div v-else>
                        <div class="w-[308px] h-[308px] overflow-hidden">
                            <el-image :src="item.imagesList[0]" fit="cover" class="w-[100%] h-[100%]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 滚动到底部，看到这个元素又加载下一页 -->
        <div class="observer text-center mb-[4rem]">
            {{ loadMore ? 'Pull down to load more' : 'Already reached the end' }}
        </div>
    </el-card>
</template>