<script setup lang="ts">
import { MdCatalog } from 'md-editor-v3'

defineProps<{
    id: string
    scrollElement: HTMLElement | Document | null
}>()

const offsetTop = 80
const scrollElementOffsetTop = 60
</script>

<template>
    <el-affix :offset="60">
        <el-card>
            <div class="w-[100%] max-h-[100vh] p-8">
                <MdCatalog :offsetTop="offsetTop" :scrollElementOffsetTop="scrollElementOffsetTop" :editorId="id"
                    :scrollElement="scrollElement" />
            </div>
        </el-card>
    </el-affix>
</template>
