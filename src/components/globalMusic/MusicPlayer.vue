<template>
    <div class="fixed bottom-24 left-10 right-10 h-[650px] bg-black/80 rounded-2xl p-4 z-40 text-white transition-all">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">音乐面板</h2>
            <button @click="$emit('close')" class="text-2xl">✕</button>
        </div>

        <!-- 示例内容 -->
        <div class="grid grid-cols-5 gap-4">
            <div class="bg-white/10 p-4 rounded-lg text-center">热歌榜</div>
            <div class="bg-white/10 p-4 rounded-lg text-center">新歌榜</div>
            <div class="bg-white/10 p-4 rounded-lg text-center">古典榜</div>
        </div>

        <!-- 播放条 -->
        <div class="absolute bottom-0 left-0 right-0 h-16 bg-white/10 flex items-center justify-between px-6">
            <div class="flex items-center space-x-3">
                <img src="https://pic4.zhimg.com/v2-62e7d6f2b9bf997d62bad4fcb237f0a1_r.jpg"
                    class="w-10 h-10 rounded-full" />
                <div>
                    <div class="text-sm">你落泪我情绪零碎</div>
                    <div class="text-xs text-gray-400">周杰伦</div>
                </div>
            </div>
            <div class="flex space-x-4 text-xl">
                <button>⏮</button>
                <button>⏯</button>
                <button>⏭</button>
            </div>
            <div class="text-sm text-gray-300">00:30 / 00:30</div>
        </div>
    </div>
</template>
