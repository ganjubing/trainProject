<template>
  <div class="speed">
    <span>{{timeLength}}</span>
    <img style="position:absolute;right:4%;top:10%;" src="../../assets/star.png" @click="timerStar" />
    <img src="../../assets/speed1/ready.png" style="width:320px;height:240px;position:absolute;top:35%;left:42%;" v-if="isReady" />
    <ul v-else id="ulList">
      <li @click="checkItem(items[0],0)" v-if="items.length>0"><img :src="items[0].img" :id="items[0].value" />
        <img class="statusImg" src="../../assets/speed1/error.png" v-if="isAnswerRight==false&&selectedItem.value===items[0].value" />
        <img class="statusImg" src="../../assets/speed1/right.png" v-if="isAnswerRight&&selectedItem.value===items[0].value" />
      </li>
      <li @click="checkItem(items[1],1)" v-if="items.length>0"><img :src="items[1].img" :id="items[1].value" />
        <img class="statusImg" src="../../assets/speed1/error.png" v-if="isAnswerRight==false&&selectedItem.value===items[1].value" />
        <img class="statusImg" src="../../assets/speed1/right.png" v-if="isAnswerRight&&selectedItem.value===items[1].value" />
      </li>
      <li @click="checkItem(items[2],2)" v-if="items.length>0"><img :src="items[2].img" :id="items[2].value" />
        <img class="statusImg" src="../../assets/speed1/error.png" v-if="isAnswerRight==false&&selectedItem.value===items[2].value" />
        <img class="statusImg" src="../../assets/speed1/right.png" v-if="isAnswerRight&&selectedItem.value===items[2].value" />
      </li>
      <li @click="checkItem(items[3],3)" v-if="items.length>0"><img :src="items[3].img" :id="items[3].value" />
        <img class="statusImg" src="../../assets/speed1/error.png" v-if="isAnswerRight==false&&selectedItem.value===items[3].value" />
        <img class="statusImg" src="../../assets/speed1/right.png" v-if="isAnswerRight&&selectedItem.value===items[3].value" />
      </li>
    </ul>
    <span style="position: absolute;right:49%;bottom:8%;font-weight: bolder;font-size: 30px;color: #F0F0F0;">{{answerItem.name}}</span>
  </div>
</template>

<script>
  import {
    Timer,
    randonArr,
    randomLimit,
    getRandomArr
  } from '../../utils/common.js'
  import unkow from '../../assets/speed1/unknow.png'
  export default {
    name: 'SpeedMathching',
    data() {
      return {
        timeLength: 140,
        intervalTime: null,
        intervalList: null,
        isReady: false,
        isAnswerRight: null,
        answerItem: {
          name: '水果',
          value: 1
        },
        answerRightItem: {}, //正确项
        selectedItem: {}, //用户选着项
        rightItems: [{
          name: '苹果',
          img: require("../../assets/speed1/images/apple.jpg"),
          value: 1
        }, {
          name: '香蕉',
          img: require("../../assets/speed1/images/banana.jpg"),
          value: 1
        }, {
          name: '桃子',
          img: require("../../assets/speed1/images/peach.jpg"),
          value: 1
        }, {
          name: '葡萄',
          img: require("../../assets/speed1/images/grape.jpg"),
          value: 1
        }, {
          name: '橘子',
          img: require("../../assets/speed1/images/orange.jpg"),
          value: 1
        }, {
          name: '西瓜',
          img: require("../../assets/speed1/images/watermelon.jpg"),
          value: 1
        }, ],
        otherItems: [{
          name: '白菜',
          img: require("../../assets/speed1/images/cabbage.jpg"),
          value: 2
        }, {
          name: '番茄',
          img: require("../../assets/speed1/images/tomato.jpg"),
          value: 3
        }, {
          name: '茄子',
          img: require("../../assets/speed1/images/eggplant.jpg"),
          value: 4
        }, {
          name: '黄瓜',
          img: require("../../assets/speed1/images/cucumber.jpg"),
          value: 5
        }, {
          name: '大蒜',
          img: require("../../assets/speed1/images/garlic.jpg"),
          value: 6
        }, {
          name: '辣椒',
          img: require("../../assets/speed1/images/chili.jpg"),
          value: 7
        }, ],
        items: [],
      }
    },
    mounted() {
      //Timer(this.timeLength)
      /* var arr=randonArr(this.items);
      console.log(arr) */

    },
    methods: {
      timerStar() {
        this.changeArr();
        if (this.intervalTime != null)
          return;
        // 计时器为空，操作
        this.intervalTime = setInterval(() => {
          if (this.timeLength > 0) {
            this.timeLength = this.timeLength - 1;
          } else {
            clearInterval(this.intervalTime) //清除计时器

            this.intervalTime = null; //设置为null
            this.intervalList = null;
            this.timeLength = 140;
          }
        }, 1000)
      },
      changeArr() {
        let i = 0;
        this.isReady = true;
        setTimeout(() => {
          this.isReady = false;
        }, 1000);
        var otherArr = getRandomArr(this.otherItems, 3);
        var rightItem = getRandomArr(this.rightItems, 1);
        this.answerRightItem = rightItem[0];
        this.items = [];
        otherArr.map(n => this.items.push(n));
        rightItem.map(n => this.items.push(n));
        randonArr(this.items);
        setTimeout(function() {
          //遮挡图片
          var lis = document.querySelectorAll('#ulList>li>img');
          for (var i = 0; i < lis.length; i++) {
            lis[i].src = unkow;
          }
        }, 2000);

        /* if (this.intervalList != null) return
        this.intervalList = setInterval(() => {
          var otherArr = getRandomArr(this.otherItems, 3);
          var rightItem = getRandomArr(this.rightItems, 1);
          this.items = [];
          otherArr.map(n => this.items.push(n));
          rightItem.map(n => this.items.push(n));
          randonArr(this.items);
        }, 2000);*/
      },
      checkItem(obj, index) {
        this.selectedItem = obj;
        var lis = document.querySelectorAll('#ulList>li>img');
        lis[index].src = obj.img;
        if (this.answerItem.value === obj.value) {
          this.isAnswerRight = true;
        } else {
          this.isAnswerRight = false;
          var id = this.answerRightItem.value;
          console.log(id);
          document.getElementById(id).src = this.answerRightItem.img;
        }
        setTimeout(() => {
          this.changeArr();
          this.isAnswerRight = null;
        }, 2000);
        //this.changeArr();
      },

    },
    /* watch: {
      'timeLength': function(newval) {
        console.log(newval);
      }
    } */
  }
</script>

<style scoped="scoped">
  * {
    margin: 0;
    padding: 0;

  }

  .speed {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../assets/speed1/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0px -5px;
    -moz-background-size: 100% 100%;
  }

  .speed span {
    position: absolute;
    right: 8%;
    top: 1%;
    font-weight: bolder;
    font-size: 30px;
  }

  ul {
    position: absolute;
    top: 25%;
    left: 32%;
    width: 35%;
  }

  ul li {
    list-style-type: none;
    display: inline-block;
    border: 1px dashed #808080;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    border-radius: 25px;
    margin: 10% 15%;
    background-color: #FFFFFF;
    /* background-image: url(../../assets/speed1/images/apple.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    position: relative;
  }

  ul li img {
    heigth: 85%;
    width: 85%;
    vertical-align: middle;
  }

  .statusImg {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 60%;
    right: -15%;
  }
</style>
