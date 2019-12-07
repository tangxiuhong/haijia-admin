<template>
  <div class="flex_menu" :style="{height:mainHeight}">
    <div class="left_menu">
      <div class="in_left_menu">
        <div @click="onMenu(item,index)" v-for="(item,index) in menuTitle"
             :class='{checkedStyle:index===menuIndex}'>{{title?item[title]:item.name}}
          <span class="circle-num" v-if="(number? item[number]: item.num)<1 ? false:true">{{number? item[number]: item.num}}</span>
        </div>
      </div>
    </div>
    <div class="right_menu">
      <slot name="right_menu"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    menuTitle: {
      type: Array,
      default: []
    },
    menuIndex: {
      type: Number,
      default:null
    },
    number:{
      type: String,
      default:''
    },
    title:{
      type: String,
      default:''
    }
  },
  data() {
    return {
      mainHeight: document.documentElement.clientHeight - 115+'px'
    }
  },
  methods: {
   onMenu(item,index){
     this.$emit('on-menu',item,index)
   }
  }
}
</script>

<style scoped>
  .flex_menu{
    width: 100%;
    display: flex;
    border: 1px solid #ddd;
    /*height: 830px;*/
  }
  .left_menu {
    width: 180px;
    height: 100%;
    border-right:1px solid #ddd;
    text-align: left;
    background: #f8f8f8;
    position: relative;
  }

  .in_left_menu {
    width: 100%;
    position: absolute;
    right: -1px;
    top: 0px;
    z-index: 9;
  }
  .in_left_menu > div {
    cursor: pointer;
    padding: 5px 20px;
    line-height: 2em;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    color: #999;
    background: #f8f8f8;
    position: relative;
  }
  .circle-num{
    background: #e40000;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
    color: #fff;
    font-size: 12px;
    padding: 0px;
    width: 30px;
    display: inline-block;
    text-align: center;
    line-height: 18px;
    position: absolute;
    right: 25px;
    z-index: 10;
    top: 12px;
  }
  .right_menu{
    width: calc(100% - 195px);
    padding-top: 15px;
    padding-left: 15px;
  }
  .checkedStyle {
    border-right: 0px !important;
    color: #000 !important;
    background: #fff !important;
  }
</style>
