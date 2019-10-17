<template>
  <div class="visual">
    <span>{{timeLength}}</span>
    <div class="container">
      <div class="list" v-for="(item,index) in itemList" @click="selectResult(index)">
        <!-- {{itemList[index].value}} -->
        <div class="tip" v-show="itemList[index].status&&itemList[index].isItem&&itemList[index].isAnswerRight===null">
          <div style="background-color: #FFFFFF;width: 95%;height:73%;margin:1% 1% 1% 3.5%;border-radius:10px;">
            <img v-for="(data,i) in sourceItem" :key="i" :src="data.img" @click="checkItem(data,index)" style="width: 48%;height:95%;margin-top: 1.5%;">
          </div>
        </div>
        <img src="../../assets/visual2/error.png" style="position: absolute;left:22%;top:20%; width:50%;height:50%;"
          v-show="(itemList[index].status&&!itemList[index].isItem)||(itemList[index].status&&(itemList[index].isItem&&itemList[index].isAnswerRight===false))">

      <img :src="item.img" style="position: absolute;left:8%;top:8%; width:85%;height:85%;"
        v-show="(isShowMoment&&itemList[index].isItem)||(itemList[index].status&&itemList[index].isItem&&itemList[index].isAnswerRight===true)">
      </div>

    </div>
    <img class="progress" :style="{width:progLength+'%'}" src="../../assets/visual2/progranbar.png" />
    <img src="../../assets/visual2/ready.png" style="width:100%;height:100%;z-index:99999;position:absolute;top:0%;left:0%;"
      v-if="isReady" />
    <img style="position:absolute;right:4%;top:10%;" src="../../assets/star.png" @click="timerStar" />
    <img style="position:absolute;right:35%;top:5%;" src="../../assets/visual2/title.png" />
  </div>
</template>

<script>
  import {
    randomNumBoth
  } from '../../utils/common.js'
  import errorImg from '../../assets/visual2/error.png'
  import horseImg from '../../assets/visual2/horse.png'
  import airplaneImg from '../../assets/visual2/airplane.png'
  export default {
    data() {
      return {
        sourceItem: [{
          name: 'horse',
          value: 1,
          img: require("../../assets/visual2/horse.png")
        }, {
          name: 'airplane',
          value: 2,
          img: require("../../assets/visual2/airplane.png")
        }],
        timeLength: 299,
        progLength: 38.5,
        intervalProgress: null,
        intervalTime: null,
        isReady: false,
        isShowMoment: false,//进度条没走完前可见
        itemsCount: 24,
        itemList: [],
        steps: [5, 8, 10],
        currentStep: 0,

      }
    },
    mounted() {
      var list = randomNumBoth(0, 25, this.steps[this.currentStep]);
      for (var i = 0; i < this.itemsCount; i++) {
        var isHasItem = false;
        var val = -1;
        for (var j = 0; j < list.length; j++) {
          if (list[j] == i) {
            isHasItem = true;
            val = list[j] % 2 == 0 ? 2 : 1; //偶数则为飞机，奇数为马，无题木则-1
          }
        }
        if (isHasItem)
          this.itemList.push({
            status: false, //当前项是否选中
            isItem: true, //点击空格是否有有题目，有则弹出给予选择，无则答题错误
            value: val, //答案项是马还是飞机
            isAnswerRight: null, //此题是否答题正确，默认null，
            img:val===2?airplaneImg:horseImg,//选项图片
          });
        else
          this.itemList.push({
            status: false,
            isItem: false,
            value: -1,
            isAnswerRight: false,
            img:'',
          });
      }

      //var items=randomNumBoth(1,2,5);
      console.log(this.itemsCount)
    },
    methods: {
      timerStar() {
        this.isReady = true;
        this.intervalTimer();
        setTimeout(() => {
          this.isReady = false;
          this.isShowMoment=true;
          this.intervalPro();
        }, 2000)

      },
      intervalPro() {
        if (this.intervalProgress != null) return
        this.intervalProgress = setInterval(() => {
          if (this.progLength > 0) {
            var span = this.progLength - 3;
            this.progLength = span < 0 ? 0 : span;
          } else {
            clearInterval(this.intervalProgress);
            this.intervalProgress = null;
            this.isShowMoment=false;
          }
        }, 1000);
      },
      intervalTimer() {
        // 计时器为空，操作
        this.intervalTime = setInterval(() => {
          if (this.timeLength > 0) {
            this.timeLength = this.timeLength - 1;
          } else {
            clearInterval(this.intervalTime) //清除计时器
            this.intervalTime = null; //设置为null
            //this.intervalList = null;
            this.timeLength = 299;
          }
        }, 1000)
      },
      selectResult(index) {
        //this.itemList.map(n => n.status = false);
        this.itemList[index].status = true;
      },
      checkItem(item, index) {
        var val = this.itemList[index].value;
        if (val == item.value) { //回答正确
          this.itemList[index].isAnswerRight = true;
        } else {
          this.itemList[index].isAnswerRight = false;
        }
        console.log(this.itemList[index])
      }

    }
  }
</script>

<style scoped="scoped">
  .visual {
    width: 100%;
    height: 100%;
    position: fixed;
    /* background: url(../../assets/visual2/bg.png) no-repeat center 0; */
    background-image: url(../../assets/visual2/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0px -5px;
    -moz-background-size: 100% 100%;
  }

  .visual span {
    position: absolute;
    right: 7%;
    top: 0.1%;
    font-weight: bolder;
    font-size: 30px;
  }

  ul {
    padding: 0px;
    margin: 0px;
    position: absolute;
    top: 18%;
    left: 27.5%;
    width: 45%;
  }

  ul li {
    list-style-type: none;
    display: inline-block;
    border: 1px dashed #808080;
    width: 90px;
    height: 90px;
    text-align: center;
    line-height: 90px;
    border-radius: 25px;
    margin: 0.2% 0.2%;
    background-color: #FFFFFF;
    background-image: url(../../assets/visual2/container.png);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }

  .container {
    width: 50%;
    height: 92%;
    position: absolute;
    left: 25%;
    top: 21%;
  }

  .container .list {
    width: 15%;
    height: 15%;
    display: inline-block;
    margin: 0.3%;
    border-radius: 15px;
    background-image: url(../../assets/visual2/container.png);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    /* background-position: 5px 5px 5px 5px; */
  }

  .tip {
    position: absolute;
    width: 200%;
    left: -50%;
    top: -90%;
    height: 150%;
    background-image: url(../../assets/visual2/tip.png);
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 99999;
  }

  .progress {
    position: absolute;
    left: 34.5%;
    bottom: 4.8%;
    height: 16px;
  }
</style>
