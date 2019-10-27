<template>
  <div class="digital">
    <!-- <span class="surplusTime">{{surplusTime}}</span> -->
    <!-- <img style="position:absolute;right:20%;top:0%;width: 12.5%;height: 10%;" src="../../assets/star.png" /> -->
    <div v-show="surplusTime!=totalDuration&&!isFinish" style="width: 12.5%;height:10%;background-color: #808080;
    opacity:.7;border-radius:7px;position:absolute;right:20%;top:0%;z-index: 999;"></div>
    <ul style="margin:0px;padding: 0px;position: absolute;top:35%;left:17%;width: 60%;">
      <li v-for="(item,index) in itemArray.title" :key="index" style="list-style-type: none;display: inline-block;font-size:50px;color: white;font-weight: bold;width: 20%;margin-left:0%;float:left;">
        {{item}}
      </li>

    </ul>
    <ul style="margin:0px;padding: 0px;position: absolute;bottom:25%;left:17%;width: 60%;">
      <li v-for="(number,index) in itemArray.option" :key="index" style="list-style-type: none;display: inline-block;font-size:40px;color:#000000;font-weight: bold;width: 15%;margin:0% 3%;">
        <div style="position:relative; display: table-cell;vertical-align:middle;text-align:center">
          <div v-if="selectedIndex==index">
            <img style="width: 70%;height: 70%;vertical-align: middle;" src="../../assets/digital4/whiteBlock.png" />
            <div v-if="isCorrect===true">
              <img style="width: 70%;height: 100%;vertical-align: middle;position:absolute;left:15%;top:0;" src="../../assets/digital4/correctBlock.png" />
              <img src="../../assets/correct.png" style="width:60%;height:80%;position: absolute;top:35%;left:50%;opacity:.8;" />
            </div>
            <div v-if="isCorrect===false">
              <img style="width: 70%;height: 100%;vertical-align: middle;z-index:9999;position:absolute;left:15%;top:0;" src="../../assets/digital4/incorrectBlock.png" />
              <img src="../../assets/incorrect.png" style="width:60%;height:80%;position: absolute;top:35%;left:50%;opacity:.8;" />
            </div>
            <span style="position: absolute;left:30%;top:20%;z-index: 9999;color:white;">{{number}}</span>
          </div>
          <div v-if="selectedIndex!=index" @click="checkItem(itemArray.answerItem,number,index)">
            <img  style="width: 70%;height: 70%;vertical-align: middle;" src="../../assets/digital4/whiteBlock.png" />
            <span style="position: absolute;left:30%;top:20%;z-index: 9999;">{{number}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="rightDiv">
      <img class="progress" ref="imgPro" :style="{height:surplusProglength+'%',marginTop:topHeight+'px'}" src="../../assets/digital4/progranbar.png" />
    </div>
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 50%;top: 37.5%;color: #357dd3;font-size: 40px;font-weight: bolder;">{{correctNumber}}</span>
      <span style="position: absolute;left: 50%;top: 44.5%;color:#357dd3;font-size: 40px;font-weight: bolder;">{{accuracy}}%</span>
      <span style="position: absolute;left: 50%;top: 52%;color:#357dd3;font-size:40px;font-weight:bolder;">23</span>
      <span style="position: absolute;left: 47%;top: 60%;color:#d7112f;font-size:50px;font-weight:700;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom:5%;width: 12.5%;height: 10%;" src="../../assets/btnContinu.png"
        @click="start()" />
    </div>
  </div>
</template>

<script>
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '../../utils/common.js'
  export default {
    data() {
      return {
        totalDuration: 200, //计时器总时长(秒)
        totalProgLength: 38.5, //进度条总长度
        surplusTime: 200, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        surplusProglength: 100,
        progressSpan: 1000, //进度条多久减一次（毫秒）
        progressStep:10,
        intervalProgress: null,
        topHeight:0,
        arrayLength: 5,
        itemArray: [],
        selectedIndex:null,
        isCorrect:null,
        totalAnswerNumber: 0, //总答题数
        correctNumber: 0, //答对数量
        selectArry: [{
            title: ['25', '？', '28', '31', '35'],
            option: [25, 28, 27, 26],
            answerItem: 26
          },
          {
            title: ['23', '25', '？', '32', '37'],
            option: [26, 27, 28, 29],
            answerItem: 28
          },
          {
            title: ['48', '45', '41', '？', '30'],
            option: [38, 37, 36, 35],
            answerItem: 36
          },
          {
            title: ['20', '21', '23', '26', '？'],
            option: [28, 30, 34, 36],
            answerItem: 30
          },
          {
            title: ['3', '6', '10', '？', '21'],
            option: [12, 13, 14, 15],
            answerItem: 15
          },
          {
            title: ['7', '14', '21', '28', '？'],
            option: [30, 32, 35, 36],
            answerItem: 35
          },
          {
            title: ['？', '17', '23', '30', '38'],
            option: [10, 12, 13, 15],
            answerItem: 12
          }
        ],
      }
    },
    computed:{
      accuracy: function() {
        return (this.correctNumber / this.totalAnswerNumber).toFixed(2) * 100;
      }
    },
    mounted() {
      this.start();
    },
    methods: {
      start(){
        this.topHeight=0;
        this.isTimeout=false;
        this.isFinish=false;
        this.correctNumber=0;
        this.totalAnswerNumber=0;
        this.totalProgLength = this.$refs.imgPro.offsetHeight;
        this.intervalPro();
        this.initData();
      },
      intervalPro() {
        if (this.intervalProgress != null) return
        this.intervalProgress = setInterval(() => {
          if (this.totalProgLength > this.topHeight) {
            /* var span = this.surplusProglength - this.progressStep;
            this.surplusProglength = span < 0 ? 0 : span; */
            this.topHeight = this.topHeight + this.progressStep;
          } else {
            clearInterval(this.intervalProgress);
            this.intervalProgress = null;
            this.isTimeout=true;
          }
        }, this.progressSpan);
      },
      initData() {
        this.isCorrect=null;
        this.selectedIndex=null;
        this.itemArray = getRandomArr(this.selectArry, 1)[0];
        //this.questionIndex=randomNumBoth(0,this.arrayLength-1,1);
      },
      checkItem(correctItem,num,index) {
        if(this.isCorrect!=null)return;
        this.totalAnswerNumber+=1;
        this.selectedIndex=index;
        this.playAudio(correctItem===num);
        if(correctItem===num){
          this.correctNumber+=1;
          this.isCorrect=true;
        }
        else{
          this.isCorrect=false;
        }
        setTimeout(()=>{
          this.nexStep();
        },1000);

      },
      nexStep(){
        if(this.isTimeout){
          this.isFinish=true;
        }else{
          this.initData();
        }
      },
    }
  }
</script>

<style scoped="scoped">
  .digital {
    width: 100%;
    height: 100%;
    position: fixed;
    background-image: url(../../assets/digital4/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .digital .surplusTime {
    position: absolute;
    right: 11.5%;
    top: 0.7%;
    font-weight: bolder;
    font-size: 30px;
    color: crimson;
  }

  .container {
    position: absolute;
    left: 30%;
    top: 17.5%;
    width: 50%;
    height: 65%;
  }

  .container .list {
    width: 41%;
    height: 17%;
    display: inline-block;
    font-size: 0;
    margin: 5% 3%;
    /* border: 1px solid #42B983; */
    /* background-image: url(../../assets/text/underLine.png);
    background-repeat: no-repeat; */
  }

  .rightDiv {
    height: 60%;
    position: absolute;
    right: 6.2%;
    top: 15.5%;
    width: 6%;
    overflow: hidden;
    /* margin: 0.5% 2%; */
  }

  .rightDiv img {
    width: 25%;
    position: relative;
    top:1%;
    left: 0;
  }

  .divResult {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../assets/digital4/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;
    z-index: 9999;
  }
</style>
