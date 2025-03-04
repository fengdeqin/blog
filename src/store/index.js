import { defineStore } from 'pinia'
// import banner2 from '@/assets/images/banner2.jpg'

export const userStore = defineStore('user', {
    state: () => {
        return {
            userId: 0,
        }
    },
    getters:{
        getUserId() {
            return this.userId
        }
    },
    actions:{
        setUerId(){
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