 <script setup>
 import { computed } from 'vue'
 const props = defineProps({
    // 前缀
     prefix: {
       type: String,
       default: 'icon',
     },
     // icon name
     name: {
         type: String,
         default: 'icon'
     },
     // icon color
     color: {
         type: String,
         default: '#000'
     },
     // icon size
     size: {
         type: Number,
         default: 16
     }
 })
 const symbolId = computed(() => `#${props.prefix}-${props.name}`)
 </script>

<template>
     <i class="icon" :style="{ color: color, fontSize: size + 'px' }">
         <svg aria-hidden="true">
             <use :href="symbolId"></use>
         </svg>
     </i>
 </template>

<style>
 .icon {
     height: 1em;
     width: 1em;
     line-height: 1em;
     display: inline-flex;
     justify-content: center;
     align-items: center;
     position: relative;
     fill: currentColor;
     font-size: inherit;
 }
 </style>