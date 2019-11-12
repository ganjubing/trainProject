<template>
  <div class="addition">
    <span class="surplusTime">{{surplusTime}}</span>
    <div id="divMain" ref="main" style="position: absolute;width:64%;height:88%;left:4%;top:5%;">
      <!-- <div v-if="!isSmash" ref="addboat" :style="{'width':'8.4%','height':' 12.4%','display':'inline-block','margin-top':marginTopH+'px'}">
        <img :src="addboatStatusImg" style="width: 100%;height: 100%;background-color: #00FFFF;" />

      </div> -->
      <!-- <div class="addboat" style="background-color: #00FFFF;">
        <span style="font-size:18px;font-weight:bold;position: absolute;top:20%;left:35%;">1+1</span>
      </div> -->
      <!-- <img ref="smashImg" v-show="isSmash" :src="addboatSmashImg" :style="{'width':'20%','height':'7%','background-color':'#00FFFF','margin-top':'62%'}" /> -->
    </div>
    <div class="addcalc" style="">
      <div style="width: 75%;height: 18.8%;margin: 16.5% 11% 2.5% 11%;">
        <span style="font-size:40px;font-weight: bolder;float: right;margin-right:2%;margin-top:0px;">{{result}}</span>
      </div>
      <div style="width: 75.5%;height: 56.5%;margin: 0% 10.5%;">
        <div style="width: 100%;height: 50%;">
          <div style="width:75%;height: 100%;float: left;">
            <div @click="inputNumber(7)" style="width: 31%;height: 45%;float: left;margin-right:3.5%;">
              <img src="../../../assets/addition/num7.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(8)" style="width: 31%;height: 45%;float: left;margin-right: 3.5%;">
              <img src="../../../assets/addition/num8.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(9)" style="width: 31%;height: 45%;float: left;margin-right: 0%">
              <img src="../../../assets/addition/num9.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(4)" style="width: 31%;height: 45%;float: left;margin:4% 3.5% 0% 0%">
              <img src="../../../assets/addition/num4.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(5)" style="width: 31%;height: 45%; solid;float: left;margin:4% 3.5% 0 0">
              <img src="../../../assets/addition/num5.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(6)" style="width: 31%;height: 45%; solid;float: left;margin-top: 4%">
              <img src="../../../assets/addition/num6.png" style="height: 100%;width: 100%;" />
            </div>
          </div>
          <div @click="doClear" style="width: 23%;height: 97%;float: left;margin-left:2% ;">
            <img src="../../../assets/addition/btnClear.png" style="height: 100%;width: 100%;" />
          </div>
        </div>
        <div style="width:100%;height:49%;margin-top:1% ;">
          <div style="width:75%;height: 100%;float: left;z-index: 9999;position: relative;">
            <div @click="inputNumber(1)" style="width: 31%;height: 45%;float: left;margin-right:3.5%;">
              <img src="../../../assets/addition/num1.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(2)" style="width: 31%;height: 45%;float: left;margin-right: 3.5%;">
              <img src="../../../assets/addition/num2.png" style="height: 100%;width: 100%;" />
            </div>
            <div @click="inputNumber(3)" style="width: 31%;height: 45%;float: left;margin-right: 0%;z-index: 9999;">
              <img src="../../../assets/addition/num3.png" style="height: 100%;width: 100%;z-index: 9999;" />
            </div>
            <div @click="inputNumber(0)" style="width:82%;height: 45%;float: left;margin:4% 3.5% 0% 0%">
              <img src="../../../assets/addition/num0.png" style="height: 100%;width: 100%;" />
            </div>
          </div>
          <div @click="checkItem" style="width: 26%;height: 100%;float: left;margin-left:2%;">
            <img src="../../../assets/addition/btnConfirm.png" style="height: 27%;width:28%; position: absolute;right:14%;bottom:11%;z-index: 1;" />
          </div>
        </div>
      </div>
    </div>
    <img v-if="isReady" src="@/assets/addition/ready.png" style="width: 100%;height: 100%;" />
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 52%;top:42.5%;color: #357dd3;font-size: 40px;font-weight: bolder;">1</span>
      <span style="position: absolute;left: 52%;top: 50%;color:#357dd3;font-size: 40px;font-weight: bolder;">{{correctNumber}}</span>
      <span style="position: absolute;left: 52%;top: 57%;color:#357dd3;font-size:40px;font-weight:bolder;">{{accuracy}}%</span>
      <span style="position: absolute;left: 47%;top: 67%;color:#d7112f;font-size:60px;font-weight:700;">{{Math.round(correctNumber*10.5)}}分</span>
      <img style="position: absolute;left: 44%;bottom:2%;width: 12.5%;height: 10%;" src="@/assets/btnContinu.png"
        @click="readyGo" />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import addboatImg from "@/assets/addition/boat.png"
  import addboatSmash from "@/assets/addition/boatSmash1.png"
  import {
    randonArr,
    randomLimit,
    getRandomArr,
    randomNumBoth,
  } from '../../../utils/common.js'
  export default {
    computed: {
      accuracy: function() {
        if (this.totalAnswerNumber === 0) return 0;
        return (this.correctNumber / this.totalAnswerNumber).toFixed(2) * 100;
      }
    },
    mounted() {
      /* this.addboatHeight=this.$refs.addboat[0].offsetHeight; */
      /* console.log(this.smashImgH)
       this.mainHeight=parseInt(this.mainHeight)-parseInt(this.addboatHeight); */
      this.readyGo();
      //this.intervalTimer();
      //this.startaddboat();
      //his.create();
      /* this.addboatLeft=randomNumBoth(0,91.6,1);
      var dd=getRandomArr(this.addboatColors,1);
      console.log(dd); */
    },
    data() {
      return {
        totalDuration: 200, //计时器总时长(秒)
        surplusTime: 200, //当前剩余时长
        isTimeout: false, //是否时间已到
        isFinish: false, //是否答题结束
        isReady: false, //是否准备开始
        readyTime: 1000, //准备时长毫秒
        totalAnswerNumber: 0,
        correctNumber: 0,
        intervalTime: null,
        interveraddboat: null,
        result: '0',
        mainHeight: 0,
        addboatHeight: 0,
        marginTopH: 0,
        addboatInterval: null,
        addboatStatusImg: addboatImg,
        addboatSmashImg: addboatSmash,
        isSmash: false,
        downSpeed: 2, //下降速度 px
        downSpanTime: 100, //多久下降一次
        addboatLeft: 0,
        results: [],
        addboatColors: ['#32c333', '#ff7aab', '#f2582a', '#fd7bad'], //气球颜色，随机
      }
    },
    methods: {
      intervalTimer() {
        this.surplusTime = this.totalDuration;
        this.isFinish = false;
        this.result = '0';
        this.results = [];
        this.totalAnswerNumber = 0;
        this.correctNumber = 0;
        this.isTimeout = false;
        this.mainHeight = this.$refs.main.offsetHeight;
        clearInterval(this.interveraddboat)
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
            this.removeaddboat();
          }
        }, 1000)
      },
      inputNumber(val) {
        if (this.result.length > 6) return;
        if (parseInt(this.result) <= 0 && val === 0) {
          this.result = "0";
        } else {
          this.result = this.result == '0' ? val : this.result.toString() + val.toString();
        }
      },
      doClear() {
        console.log(this.result)
        this.result = this.result.toString().substring(0, this.result.length - 1)
        if (this.result.length <= 0) {
          this.result = "0";
        }
      },
      createaddboat() {
        var topH = 0;
        var left = randomNumBoth(0, 90, 1)[0];
        var bg = getRandomArr(this.addboatColors, 1)[0];
        var nums = randomNumBoth(1, 30, 2);
        var num1 = nums[0];
        var num2 = nums[1];
        var result = num1 + num2;
        this.results.push(result);
        var divaddboat = document.createElement('div');
        divaddboat.className = "addboat";
        divaddboat.style.left = left + '%';
        divaddboat.style.top = topH + '%';
        divaddboat.style.backgroundColor = bg;
        divaddboat.id = 'divaddboat' + result;
        var spans = document.createElement('span');
        divaddboat.appendChild(spans);
        spans.innerText = num1 + '+' + num2;
        var divSmash = document.createElement('div');
        divSmash.className = "addboatSmash";
        divSmash.style.marginLeft = left + '%';
        divSmash.style.backgroundColor = bg;
        divSmash.style.display = 'none';
        divSmash.id = 'divSmash' + result;
        document.getElementById("divMain").appendChild(divaddboat);
        document.getElementById("divMain").appendChild(divSmash);
        var addboatH = document.getElementsByClassName("addboat")[0].offsetHeight;
        this.interveraddboat = setInterval(() => {
          var currentH = topH + this.downSpeed;
          if (currentH+20 < (this.mainHeight - addboatH)) {
            topH = currentH;
            divaddboat.style.top = topH + 'px';
          } else {
            this.isSmash = true;
            divaddboat.remove();
            divSmash.style.display = 'block';
            this.removeSmash(divSmash);
            for (var i = 0; i < this.results.length; i++) {
              if (this.results[i] == result) {
                this.results.splice(i, 1);
                break;
              }
            }
            clearInterval(this.interveraddboat)
            if (!this.isTimeout)
              this.createaddboat();
          }
        }, this.downSpanTime);
      },
      removeSmash(dom) {
        setTimeout(() => {
          dom.remove();
        }, 500);
      },
      removeaddboat() {
        var addboats = document.querySelector(".addboat");
        if (addboats != null) addboats.remove()

        /* addboats.forEach(function(item){
          item.remove();
        }) */
      },
      create() {
        var that = this;
        var left = randomNumBoth(0, 91.6, 1)[0];
        var bg = getRandomArr(this.addboatColors, 1)[0];
        var MyComponent = Vue.extend({
          template: "<div class='addboat' v-bind:style='{marin-top:marginTopH}'></div>",
          methods: {
            selectResult: function() {
              var interveraddboat = setInterval(() => {
                var currentH = that.marginTopH + 20;
                if (currentH < that.mainHeight) {
                  that.marginTopH = currentH;
                } else {
                  that.isSmash = true;
                  //this.addboatStatusImg=addboatSmash;
                  clearInterval(interveraddboat)
                }
                this.baseStyles = Object.assign({}, this.baseStyles, {
                  marginTop: that.marginTopH
                })
              }, 500);


            }
          },
          mounted() {
            this.selectResult();

          },
          data() {
            return {
              marginTopH: that.marginTopH + '%',
              baseStyles: {
                'margin-top': that.marginTopH + '%',
                backgroundColor: bg,
                left: left + '%',
              },
            }
          },
          watch: {
            baseStyles: {
              deep: true,
              handler: function(val, oldval) {
                console.log(val)
              },
            }
          }
        });
        var component = new MyComponent().$mount();
        document.getElementById('divMain').appendChild(component.$el);

      },
      startaddboat() {
        this.addboatInterval = setInterval(() => {
          var currentH = this.marginTopH + 20;
          if (currentH < this.mainHeight) {
            this.marginTopH = currentH;
          } else {
            this.isSmash = true;
            //this.addboatStatusImg=addboatSmash;
            clearInterval(this.addboatInterval)
          }
        }, 500);
      },
      checkItem() {
        var isCorrect = this.results.indexOf(parseInt(this.result)) > -1;
        this.playAudio(isCorrect)
        this.totalAnswerNumber++;
        if (isCorrect) {
          this.correctNumber++;
          document.getElementById('divaddboat' + this.result).remove();
          document.getElementById('divSmash' + this.result).remove();
          clearInterval(this.interveraddboat);

          if (!this.isTimeout)
            this.createaddboat()
          else
            this.isFinish = true;
        } else {

        }
        this.result = '0';
      },
      readyGo() {
        this.removeaddboat();
        this.isReady = true;
        this.isFinish = false;
        this.isTimeout = false;
        setTimeout(() => {
          this.isReady = false;
          this.intervalTimer();
          this.createaddboat();
        }, this.readyTime);
      },

    },
    beforeDestroy() {
     this.removeaddboat();
     clearInterval(this.interveraddboat)
     this.interveraddboat=null;
    }
  }
</script>

<style>
  .addition {
    width: 100%;
    height: 100vh;
    /* position: fixed; */
    position: relative;
    background-image: url(../../../assets/addition/bg.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    -moz-background-size: 100% 100%;
  }

  .addition .surplusTime {
    position: absolute;
    right: 14%;
    top: 0%;
    height: 100%;
    font-weight: bolder;
    font-size: 25px;
  }

  .addcalc {
    position: absolute;
    width: 20.4%;
    height: 55.9%;
    right: 6%;
    bottom: 22%;
    background-image: url(../../../assets/addition/calculator.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .addboat {
    position: absolute;
    top: 0px;
    /* left:91.6%; */
    width: 8.4%;
    height: 14%;
    background-image: url(../../../assets/addition/boat.png);
    background-size: cover;
  }

  .addboatSmash {
    width: 15%;
    height: 5%;
    margin-top: 60%;
    background-image: url(../../../assets/addition/boatSmash1.png);
    background-size: cover;
  }

  .addboat span {
    font-size: 18px;
    font-weight: bold;
    position: absolute;
    top: 20%;
    left: 25%;
  }

  .divResult {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../../assets/addition/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, center;
    z-index: 9999;
  }
</style>
