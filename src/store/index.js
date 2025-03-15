// 亮色/暗黑模式切换
import { useDark, useToggle } from '@vueuse/core';
// 使用 vueuse 的 useDark 和 useToggle 来管理主题状态
const isDark = useDark();
const toggleDark = useToggle(isDark);

export const configStore = defineStore('config', {
    state: () => {
        return {
            isDark: isDark.value,
        }
    },
    getters: {
        getIsDark: (state) => state.isDark,
    },
    actions: {
        SetThemeColor() {
            toggleDark()
        }
    },
    // 使用插件的配置选项
    persist: {
        key: 'configStore',// 自定义存储的键名
        storage: localStorage // 可以改为sessionStorage
    }
})

export const userStore = defineStore('user', {
    state: () => {
        return {
            userId: 0,
        }
    },
    getters: {
        getUserId() {
            return this.userId
        }
    },
    actions: {
        setUerId() {
            this.userId++
        }
    },
    // 使用插件的配置选项
    persist: {
        key: 'userStore',// 自定义存储的键名
        storage: localStorage // 可以改为sessionStorage
    }
})

export const articleStore = defineStore('article', {
    state: () => {
        return {
            article: {
                id: '',
                title: '',
                desc: '',
                cover: '',
                createTime: '',
                updateTime: '',
                views: '',
                likes: '',
                category: '',
                tags: []
            }
        }
    },
    getters: {
        getArticle() {
            return this.article;
        }
    },
    actions: {
        setArticle(val) {
            // 合并字段
            Object.assign(this.article, val)
        }
    },
})