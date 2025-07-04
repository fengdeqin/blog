<script setup lang="ts">
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'

defineProps<{
    articleElement: string
    staticArticleDetail: {
        author: string
        type: string
        link: string
        statement: string
    }
    isDark: boolean
    id: string
}>()

onMounted(() => {
    console.log(999999)
})

</script>

<template>
    <el-card class="px-11 pb-16">
        <div>
            <MdPreview :theme="isDark ? 'dark' : 'light'" :id="id" :modelValue="articleElement" />
        </div>
        <div class="p-5 text-sm mt-20 border">
            <div>Article Author: {{ staticArticleDetail.author || '-' }}</div>
            <div>Type: {{ staticArticleDetail.type || '-' }}</div>
            <div>Link: {{ staticArticleDetail.link || '-' }}</div>
            <div>Statement: {{ staticArticleDetail.statement || '-' }}</div>
        </div>
    </el-card>
</template>
