<template>
  <div class="classification">
    <span class="surplusTime">{{surplusTime}}</span>
    <div style="position: absolute;top:18%;left:37.4%;height: 3.7%;width:25.1%;">
      <img src="@/assets/classification/progress.png" :style="{height: '100%',width:progressStep+'%',float: 'left'}">
    </div>
    <div :class="{'leftItem':true}" :style="borderOjbLeft">
      <div :class="{'circle':isCircleLeft,'block':isBlockLeft,'triangle':isTriangleLeft}" :style="styleObjectLeft"></div>
    </div>

    <div :class="{'mainItem':true,'moveLeft':isMoveLeft,'moveRigth':isMoveRight} " :style="borderObject">
      <div :class="{'circle':isCircle,'block':isBlock,'triangle':isTriangle}" :style="styleObject"></div>
    </div>
    <img v-if="isCorrect===true" src="../../../assets/correct.png" style="width: 10%;height: 21%;position:absolute;top:57%;left:57%;" />
    <img v-if="isCorrect===false" src="../../../assets/incorrect.png" style="width: 10%;height: 21%;position:absolute;top:57%;left:57%;" />
    <div :class="{'rightItem':true}" :style="borderObjRight">
      <div :class="{'circle':isCircleRight,'block':isBlockRight,'triangle':isTriangleRight}" :style="styleObjectRight"></div>
    </div>
    <div style="position: relative;top: 80%;left: 20%;height: 15%;width:65%;">
      <img :src="ruleCorrectimg" @mouseover="changeOver('equal')" @mouseout="changeOut('equal')" @click="checkItem(true)"
        style="width: 23%;height: 100%;float: left;margin-left: 10%;" />
      <img :src="ruleIncorrectimg" @mouseover="changeOver('unequal')" @mouseout="changeOut('unequal')" @click="checkItem(false)"
        style="width: 23%;height: 100%;" />

    </div>
    <div v-if="isNewRule" class="info">
      <div style="position: relative;top:40%;left:35%;width:30%;height:10%;">
        <span style="display:block;position: relative;top:50%;transform:translateY(-50%);color: #fe7c04;font-size: 25px;font-weight:bolder;">{{currentRuleItme.name}}</span>
      </div>
    </div>
 <div class="divResult" v-show="isTimeout">
      <span style="position: absolute;left: 52%;top: 35%;color:#357dd3;font-size: 40px;font-weight: bolder;">{{finishRuleNumber}}个</span>
      <span style="position: absolute;left: 52%;top: 43%;color:#357dd3;font-size:40px;font-weight:bolder;">{{accuracy}}次</span>
      <span style="position: absolute;left: 47%;top: 58%;color:#d7112f;font-size:60px;font-weight:700;">{{Math.round(correctNumber*10.5)}}</span>
      <img style="position: absolute;left: 44%;bottom:2%;width: 12.5%;height: 10%;" src="@/assets/btnContinu.png"
        @click="readyGo" />
    </div>
  </div>
</template>

<script>
  import ruleCorrectImg from '../../../assets/classification/ruleCorrect.png';
  import ruleCorrectHoverImg from '../../../assets/classification/ruleCorrectHover.png';
  import ruleIncorrectImg from '../../../assets/classification/ruleIncorrect.png';
  import ruleIncorrectHoverImg from '../../../assets/classification/ruleIncorrectHover.png';
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '@/utils/common.js'
  export default {
    computed: {
      accuracy: function() {
        if (this.totalAnswerNumber === 0) return 0;
        return Math.round(this.totalAnswerNumber/this.finishRuleNumber);
      }
    },
    mounted() {
      //this.readyGo();
      this.intervalTimer();
      this.initData();

    },
    data() {
      return {
        totalDuration: 200, //计时器总时长(秒)
        surplusTime: 200, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        totalAnswerNumber: 0,
        correctNumber: 0,
        ruleCorrectimg: ruleCorrectImg,
        ruleIncorrectimg: ruleIncorrectImg,
        isCircle: false,
        isBlock: false,
        isTriangle: false,
        finishRuleNumber:0,
        isCorrect:null,

        isCircleLeft: false,
        isBlockLeft: false,
        isTriangleLeft: false,
        borderOjbLeft: {
          borderColor: '#fff'
        },
        styleObjectLeft: {
          'background-color': '#fff'
        },

        isCircleRight: false,
        isBlockRight: false,
        isTriangleRight: false,
        borderObjRight: {
          borderColor: '#fff'
        },
        styleObjectRight: {
          'background-color': '#fff'
        },

        isMoveLeft: false,
        isMoveRight: false,
        currentShape: '',
        currentColor: {},
        styleObject: {},
        borderObject: {},

        isNewRule:false,
        progressStep:0,
        leftShape: {},
        currentItme: {},
        currentRuleItme: {
          name:'',
          eleName: 'shape',
          color: 'green'
        }, //当前规则
        element: ['border', 'shape'],
        colors: [{
            name: 'blue',
            color: '#1d73e9'
          },
          {
            name: 'red',
            color: '#f43758'
          },
          {
            name: 'green',
            color: '#16c978'
          }
        ],
        shape: ['circle', 'block', 'triangle'],
        rules: [{
            name: '形状颜色等于绿色',
            eleName: 'shape',
            color: 'green'
          },
          {
            name: '形状颜色等于蓝色',
            eleName: 'shape',
            color: 'blue'
          },
          {
            name: '形状颜色等于红色',
            eleName: 'shape',
            color: 'red'
          },
          {
            name: '边框颜色等于绿色',
            eleName: 'border',
            color: 'green'
          },
          {
            name: '边框颜色等于蓝色',
            eleName: 'border',
            color: 'blue'
          },
          {
            name: '边框颜色等于红色',
            eleName: 'border',
            color: 'red'
          },
        ]
      }
    },
    methods: {
      intervalTimer() {
        this.surplusTime = this.totalDuration;
        this.isFinish = false;
        this.finishRuleNumber=0;
        this.totalAnswerNumber = 0;
        this.correctNumber = 0;
        this.isTimeout = false;
        this.progressStep=0;
        // 计时器为空，操作
        if (this.intervalTime != null) return;
        this.intervalTime = setInterval(() => {
          if (this.surplusTime > 0) {
            this.surplusTime = this.surplusTime - 1;
          } else {
            this.isTimeout = true;
            this.isFinish = true;
            clearInterval(this.intervalTime);
            this.intervalTime = null;
          }
        }, 1000)
      },
      initData() {
        this.isBlock=false;
        this.isCircle=false;
        this.isTriangle=false;
        this.isMoveLeft=false;
        this.isMoveRight=false;
        //this.isCorrect=null;
        /* this.isBlockLeft=false;
        this.isCircleLeft=false;
        this.isTriangleLeft=false;
        this.isBlockRight=false;
        this.isCircleRight=false;
        this.isTriangleRight=false;
        this.borderOjbLeft= {
          borderColor: '#fff'
        };
        this.styleObjectLeft={
          'background-color': '#fff'
        };
        this.borderObjRight= {
          borderColor: '#fff'
        };
        this.styleObjectRight={
          'background-color': '#fff'
        }; */

        this.currentShape = getRandomArr(this.shape, 1)[0];
        this.currentColor = getRandomArr(this.colors, 1)[0];
        var item = getRandomArr(this.element, 1)[0];
        var borderColor = getRandomArr(this.colors, 1)[0];
        this.borderObject = {
          borderColor: borderColor.color
        }
        if (this.currentRuleItme.eleName === 'shape') {
          this.currentItme['color'] = this.currentColor.name;
        } else if (this.currentRuleItme.eleName === 'border') {
          this.currentItme['color'] = borderColor.name;
        }
        if (this.currentShape === 'circle') {
          this.isCircle = true;
          this.isBlock = false;
          this.isTriangle = false;
          this.styleObject = {
            'background-color': this.currentColor.color
          };
        } else if (this.currentShape === 'block') {
          this.isBlock = true;
          this.isTriangle = false;
          this.isCircle = false;
          this.styleObject = {
            'background-color': this.currentColor.color
          };
        } else if (this.currentShape === 'triangle') {
          this.isTriangle = true;
          this.isCircle = false;
          this.isBlock = false;
          this.styleObject = {
            'border-color': 'transparent transparent ' + this.currentColor.color
          };
        }
      },
      changeOver(val) {
        if (val === 'equal')
          this.ruleCorrectimg = ruleCorrectHoverImg;
        else
          this.ruleIncorrectimg = ruleIncorrectHoverImg;
      },
      changeOut(val) {
        if (val === 'equal')
          this.ruleCorrectimg = ruleCorrectImg;
        else
          this.ruleIncorrectimg = ruleIncorrectImg;
      },
      checkItem(flg) {
        this.totalAnswerNumber++;
        var status = this.currentRuleItme.color == this.currentItme.color;

        if (flg === status) {
          this.correctNumber++;
          this.isCorrect=true;
          setTimeout(()=>{this.isCorrect=null;},300);
          if(this.progressStep+10<=100){
            this.playAudio(true);
            this.progressStep+=10;
          }
          if(this.progressStep===100){
            this.playAudio(null);
            this.currentRuleItme=getRandomArr(this.rules, 1)[0];
            this.finishRuleNumber++;
            this.isNewRule=true;
            setTimeout(()=>{
              this.progressStep=0;
              this.isNewRule=false;
            },5000)
          }

        } else {
           this.playAudio(false);
          this.isCorrect=false;
          setTimeout(()=>{this.isCorrect=null;},300);
          this.progressStep=0;
        }
        if (flg) {
          this.isMoveLeft = true;
          this.borderOjbLeft = this.borderObject;
          this.isBlockLeft = this.isBlock;
          this.isCircleLeft = this.isCircle;
          this.isTriangleLeft = this.isTriangle;
          this.styleObjectLeft = this.styleObject;
        } else {
          this.isMoveRight = true;
          this.borderObjRight = this.borderObject;
          this.isBlockRight = this.isBlock;
          this.isCircleRight = this.isCircle;
          this.isTriangleRight = this.isTriangle;
          this.styleObjectRight = this.styleObject;
        }
        this.initData()
      },
      readyGo(){
        this.isBlockLeft=false;
        this.isCircleLeft=false;
        this.isTriangleLeft=false;
        this.isBlockRight=false;
        this.isCircleRight=false;
        this.isTriangleRight=false;
        this.borderOjbLeft= {
          borderColor: '#fff'
        };
        this.styleObjectLeft={
          'background-color': '#fff'
        };
        this.borderObjRight= {
          borderColor: '#fff'
        };
        this.styleObjectRight={
          'background-color': '#fff'
        };
        this.intervalTimer();
        this.initData();
      },
    },

  }
</script>

<style scoped="scoped">
  .classification {
    width: 100%;
    height: 100vh;
    /* position: fixed; */
    position: relative;
    background-image: url(../../../assets/classification/bg.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .classification .surplusTime {
    position: absolute;
    right: 10%;
    top: 0%;
    font-weight: bolder;
    font-size: 25px;
  }

  .circle {
    width: 23%;
    height: 25%;
    margin: 30% auto;
    position: relative;
    border-radius: 50%;
  }

  .triangle {
    width: 23%;
    height: 25%;
    margin: 30% auto;
    position: relative;
    border-width: 0 30px 30px;
    border-style: solid;
    /* border-color: transparent transparent blue; */
  }

  .block {
    width: 23%;
    height: 25%;
    margin: 30% auto;
    position: relative;
    border-radius: 20%;
  }

  .mainItem {
    position: absolute;
    border-width: 5px;
    border-style: solid;
    height: 18%;
    width: 10.2%;
    border-radius: 10px;
    top: 41%;
    left: 45%;
  }

  .leftItem {
    position: absolute;
    border-width: 5px;
    border-style: solid;
    height: 18%;
    width: 10.2%;
    border-radius: 10px;
    top: 41%;
    left: 21%;
  }

  .rightItem {
    position: absolute;
    border-width: 5px;
    border-style: solid;
    height: 18%;
    width: 10.2%;
    border-radius: 10px;
    top: 41%;
    left: 69.5%;
  }

  .moveRigth {
    animation: moveRight 0.5s infinite;
    -webkit-animation: moveRight 0.5s infinite;
    animation-iteration-count: 1;
  }

  .moveLeft {
    animation: leftAD 0.5s infinite;
    -webkit-animation: leftAD 0.5s infinite;
    animation-iteration-count: 1;
  }

  @keyframes moveRight {
    from {
      left: 45%;
    }

    to {
      left: 69.5%;
    }
  }

  @-webkit-keyframes moveRight {
    from {
      left: 45%;
    }

    to {
      left: 69.5%;
    }
  }

  @keyframes leftAD {
    from {
      left: 45%;
    }

    to {
      left: 21%;
    }
  }

  @-webkit-keyframes leftAD {
    from {
      left: 45%;
    }

    to {
      left: 21%;
    }
  }
  .info{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top:0px;
    background-image: url(../../../assets/classification/ruleInfo.png);
   background-repeat: no-repeat;
   background-size: cover;
   background-position: center, center;
   z-index: 9999;
  }
  .divResult {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../../assets/classification/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;
    z-index: 9999;
  }
</style>
