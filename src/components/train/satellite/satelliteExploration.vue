<template>
  <div class="satellite">
    <span class="surplusTime">{{surplusTime}}</span>
    <div style="width:75%;height: 60%;border: #0040D0 solid 1px;margin:7% auto;">
      <div v-for="n in cellNumber" style="border: #000000 solid 1px;width: 10%;height: 20%;float: left;">
        <img v-if="showIndexs.indexOf(n)>-1" src="../../../assets/satellite/ufo.png" :style="{'width':'48px','height':'48px','transform':'rotate('+n*3+'deg)'}" />
      </div>

    </div>
    <div style="position: absolute;left:36.4%;bottom:3.5%;width:24%;height:14%;border: #00FFFF solid 1px;">
      <div v-for="(item,index) in options" style="position: relative;width: 25%;height: 100%;float: left;display: table-cell;vertical-align: middle;">
        <img :src="btnimg" style="width: 100%;height: 100%;" @mouseover="changeOver(index)" @mouseout="changeOut(index)" />
        <span style="position: absolute;left:42%;top:30%;font-size: 18px;font-weight: bold;">{{item}}</span>
        <img v-if="isCorrect===true" src="@/assets/correct.png" style="position: absolute;left:10%;top:40%;width:80%;height: 80%;" />
        <img v-if="isCorrect===false" src="@/assets/incorrect.png" style="position: absolute;left:10%;top:40%;width:80%;height: 80%;" />
      </div>
    </div>
    <!-- <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 53%;top: 37%;color: #357dd3;font-size: 30px;">{{Math.round(totalUseTime/totalAnswerNumber)}}毫秒</span>
      <span style="position: absolute;left: 53%;top: 45.5%;color:#357dd3;font-size: 30px;">{{accuracy}}%</span>
      <span style="position: absolute;left: 53%;top: 53.5%;color:#357dd3;font-size:30px;">{{correctNumber}}</span>
      <span style="position: absolute;left: 47%;top: 65%;color:#d7112f;font-size:50px;font-weight:700;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom:3.5%;width: 12.5%;height: 10%;" src="@/assets/btnContinu.png"
       @click="continu" /> -->
  </div>
  </div>
</template>

<script>
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '../../../utils/common.js'
  import btnImgHover from '@/assets/satellite/btnHover.png';
  import btnImg from '@/assets/satellite/btn.png';
  export default {
    data() {
      return {
        totalDuration: 50, //计时器总时长(秒)
        surplusTime: 50, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        nextQuestionTime: 500, //隔多久进入下一题
        intervalTime: null,
        isCorrect:null,
        cellNumber: 50,
        showMin: 3,
        showMax: 10,
        randomNum: 0,
        showIndexs: [],
        options: [],
        btnimg:btnImg,
      }
    },
    mounted() {
      this.intervalTimer();
      this.initData();
    },
    methods: {
      intervalTimer() {
        this.totalAnswerNumber0;
        this.correctNumber = 0;
        this.totalUseTime = 0;
        this.isTimeout = false;
        // 计时器为空，操作
        if (this.intervalTime != null) return;
        this.intervalTime = setInterval(() => {
          if (this.surplusTime > 0) {
            this.surplusTime = this.surplusTime - 1;
          } else {
            this.isTimeout = true;
          }
        }, 1000)
      },
      initData() {
        this.randomNum = randomNumBoth(this.showMin, this.showMax, 1)[0];
        this.showIndexs = randomNumBoth(0, this.cellNumber - 1, this.randomNum);
        if (this.randomNum % 2 == 0) {
          this.options = this.generateArray(this.randomNum - 1, this.randomNum + 2);
        } else {
          this.options = this.generateArray(this.randomNum - 2, this.randomNum + 1);
        }
      },
      generateArray(start, end) {
        return Array.from(new Array(end + 1).keys()).slice(start)
      },
      changeOver(val) {
        this.btnimg=btnImgHover;
      },
      changeOut(val) {
        this.btnimg=btnImg;
      },

    },
  }
</script>

<style scoped="scoped">
  .satellite {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../../assets/satellite/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .satellite .surplusTime {
    position: absolute;
    right: 13.5%;
    top: -1%;
    color: white;
    font-weight: bolder;
    font-size: 30px;
  }

  .divResult {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../../assets/satellite/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;
    z-index: 9999;
  }
</style>
