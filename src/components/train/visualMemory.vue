<template>
  <div class="visual">
    <span>{{surplusTime}}</span>
    <div class="container">
      <div class="list" v-for="(item,index) in itemList" @click="selectResult(index)">
        <!-- {{itemList[index].value}} -->
        <div class="tip" v-show="itemList[index].status&&itemList[index].isItem&&itemList[index].isAnswerRight===null">
          <div>
            <img v-for="(data,i) in sourceItem" :key="i" :src="data.img" @click="checkItem(data,index)">
          </div>
        </div>
        <img class="errorImg" src="../../assets/visual2/error.png" v-show="itemList[index].isShowIncorrectImg" />
        <div class="itemImg">
          <img style="width: 100%;height: 100%;" :src="item.img" v-show="(isShowMoment&&itemList[index].isItem)||(itemList[index].status&&itemList[index].isItem&&itemList[index].isAnswerRight===true)" />
          <img v-show="itemList[index].isShowCorrectImg" src="../../assets/visual2/correct.png" style="width:60%;height: 60%;position: absolute;top:20%;left:22%;opacity:.8;">
        </div>

      </div>

    </div>
    <img class="progress" :style="{width:surplusProglength+'%'}" src="../../assets/visual2/progranbar.png" />
    <img class="readyImg" src="../../assets/visual2/ready.png" v-if="isReady" />
    <div class="divResult" v-show="isFinish">
      <span style="position: absolute;left: 19%;top: 42.5%;color: #357dd3;">{{totalCorrectNumber}}个</span>
      <span style="position: absolute;left: 19%;top: 51%;color:#357dd3;">{{accuracy}}%</span>
      <span style="position: absolute;left: 10%;top: 60%;color:#d7112f;font-size:50px;font-weight:900;">{{Math.round(totalCorrectNumber*10.5)}}</span>
      <img style="position: absolute;left: 45%;bottom: 8%;width: 12.5%;height: 10%;" src="../../assets/visual2/btnContinu.png" @click="continu()" />
    </div>
    <div class="tipInfo" v-if="isNextQuestion">
      <span v-html="nextTitle"></span>
    </div>
    <img style="position:absolute;right:4%;top:10%;width: 12.5%;height: 10%;" src="../../assets/star.png" @click="timerStar" />
    <div v-show="surplusTime!=totalDuration&&!isFinish" style="width: 12.5%;height: 10%;background-color: #808080;opacity:.7;border-radius:7px;position:absolute;right:4%;top:10%;z-index: 999;"></div>
    <img style="position:absolute;right:38.5%;top:5%;" src="../../assets/visual2/title.png" />

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
        totalDuration: 20, //计时器总时长
        surplusTime: 20, //当前剩余时长
        totalProgLength: 38.5, //进度条总长度
        surplusProglength: 38.5, //进度条总长度
        intervalProgress: null, //进度条计时器
        progressStep: 3, //进度条1秒减去多少
        progressSpan: 1000, //进度条多久减一次（毫秒）
        intervalTime: null, //答题剩余时间计时器
        isReady: false, //是否准备开始
        readyTime: 2000, //准备时长，即从显示准备开始图标到隐藏图标的时间（毫秒）
        isNextQuestion: false, //是否下一题
        nextQuestionTime: 2000, //进入下一题提示语显示时间（毫秒）
        isShowMoment: false, //进度条没走完前可见，记题时间
        itemsCount: 24, //循环生成栅格个数
        itemList: [], //每项栅格数据项
        level: [5, 8, 10], //数组个数为有效时间内的答题数，数组值为该次需要记住的选项个数
        currentLevel: 0, //当前答题，即level数组的index
        isStart: false, //答题是否已经开始(进度条走完才算开始)
        correctNumber: 0, //本次答对次数
        inCorrectNumber: 0, //本次答错次数
        isFinish: false, //本轮答题是否已全部结束
        totalCorrectNumber:0,//总答对数
        totalIncorrectNumber:0,//总错误数
      }
    },
    computed: {
      nextTitle: function() {
        return '下一组：<span style="color:red;">' + this.level[this.currentLevel] + '个</span>';
      },
      accuracy:function(){
       var sum= eval(this.level.join("+"));
       return (this.totalCorrectNumber/sum).toFixed(2)*100;
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      timerStar() {

        //this.itemList.map(n => n.status = false);
        this.isReady = true;
        //this.initData();
        this.loadData();
        setTimeout(() => {
          this.isReady = false;
          this.isShowMoment = true;
          this.intervalTimer();
          this.intervalPro();
        }, this.readyTime)

      },
      nextQuestion() {
        this.isStart = false;
        this.correctNumber = 0;
        this.inCorrectNumber = 0;
        this.itemList.map(n => n.status = false);
        this.isNextQuestion = true;
        this.surplusProglength = this.totalProgLength;
        this.currentLevel = this.currentLevel + 1;
        setTimeout(() => {
          this.isNextQuestion = false;
          this.isShowMoment = true;
          this.loadData();
          this.intervalPro();
        }, this.nextQuestionTime)
      },
      intervalPro() {
        if (this.intervalProgress != null) return
        this.intervalProgress = setInterval(() => {
          if (this.surplusProglength > 0) {
            var span = this.surplusProglength - this.progressStep;
            this.surplusProglength = span < 0 ? 0 : span;
          } else {
            clearInterval(this.intervalProgress);
            this.intervalProgress = null;
            this.isShowMoment = false;
            this.isStart = true;
          }
        }, this.progressSpan);
      },
      intervalTimer() {
        // 计时器为空，操作
        this.intervalTime = setInterval(() => {
          if (this.surplusTime > 0) {
            this.surplusTime = this.surplusTime - 1;
          } else {
            this.isFinish = true;
          }
        }, 1000)
      },
      selectResult(index) {
        if (!this.isStart) return;
        //this.itemList.map(n => n.status = false);
        var itmeObj = this.itemList[index];
        this.itemList[index].status = true;
        if (itmeObj.status && !itmeObj.isItem) {
          this.playAudio(false);
          this.showAnswerIncorrectImg(index);
        }

      },
      checkItem(item, index) {
        var val = this.itemList[index].value;
        if (val == item.value) { //回答正确
          this.playAudio(true);
          this.itemList[index].isAnswerRight = true;
          this.correctNumber += 1;
          this.totalCorrectNumber+=1;
          this.showAnswerCorrectImg(index);
          if (this.correctNumber == this.level[this.currentLevel]) { //如果题目全部答对，进入下一轮
            if (this.currentLevel < this.level.length - 1)
              this.nextQuestion();
            else {
              //alert('已完成所有答题');
              //this.doFinish();
              this.isFinish = true;
            }
          }
        } else {
          this.showAnswerIncorrectImg(index);
          this.playAudio(false);
          this.itemList[index].isAnswerRight = false;
          this.inCorrectNumber += 1;
          this.totalCorrectNumber+=1;
          if (this.currentLevel < this.level.length - 1)
            this.nextQuestion();
          else {
            //alert('已完成所有答题');
            //this.doFinish();
            this.isFinish = true;
          }
        }
      },
      loadData() {
        this.surplusTime = this.totalDuration;
        this.surplusProglength = this.totalProgLength;
        var newData = [];
        var list = randomNumBoth(1, 25, this.level[this.currentLevel]);
        list.sort((a, b) => {
          return a - b;
        });
        console.log(list);
        for (var i = 1; i <= this.itemsCount; i++) {
          var isHasItem = false;
          var val = -1;
          for (var j = 0; j < list.length; j++) {
            if (list[j] == i) {
              isHasItem = true;
              val = list[j] % 2 == 0 ? 2 : 1; //偶数则为飞机，奇数为马，无题木则-1
              break;
            }
          }
          if (isHasItem) {
            newData.push({
              status: false, //当前项是否选中
              isItem: true, //点击空格是否有有题目，有则弹出给予选择，无则答题错误
              value: val, //答案项是马还是飞机
              isAnswerRight: null, //此题是否答题正确，默认null，
              img: val === 2 ? airplaneImg : horseImg, //选项图片
              isShowCorrectImg: false, //是否已显示作答正确图片
              isShowIncorrectImg: false, //是否已显示作答错误图片
            });
          } else {
            newData.push({
              status: false,
              isItem: false,
              value: -1,
              isAnswerRight: false,
              img: '',
              isShowCorrectImg: false,
              isShowIncorrectImg: false,
            });
          }
        }
        this.itemList = newData;
      },
      initData() {
        this.itemList=[];
        for (var i = 0; i < this.itemsCount; i++) {
          this.itemList.push({
            status: false,
            isItem: false,
            value: -1,
            isAnswerRight: false,
            img: '',
            isShowCorrectImg: false,
            isShowIncorrectImg: false,
          })
        }
      },
      doFinish() {
        this.currentLevel = 0;
        this.correctNumber = 0;
        this.inCorrectNumber = 0;
        this.isStart = false;
        clearInterval(this.intervalTime)
        clearInterval(this.intervalProgress)
        this.intervalTime = null;
        this.intervalProgress = null;
      },
      showAnswerCorrectImg(index) {
        this.itemList[index].isShowCorrectImg = true;
        if (this.itemList[index].status && this.itemList[index].isItem && this.itemList[index].isAnswerRight === true) {
          setTimeout(() => {
            this.itemList[index].isShowCorrectImg = false;
          }, 2000)
        }
      },
      showAnswerIncorrectImg(index) {
        this.itemList[index].isShowIncorrectImg = true;
        if (this.itemList[index].status && (!this.itemList[index].isItem || this.itemList[index].isItem && this.itemList[
            index].isAnswerRight === false)) {
          setTimeout(() => {
            this.itemList[index].isShowIncorrectImg = false;
          }, 2000)
        }
      },
      continu(){
        this.surplusTime = this.totalDuration;
        this.surplusProglength = this.totalProgLength;
        this.isFinish=false;
        this.totalCorrectNumber=0;
        this.totalIncorrectNumber=0;
        this.doFinish();
        this.initData();
      }

    },
    watch: {}
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
    background-position: center center;
    -moz-background-size: 100% 100%;
  }

  .visual span {
    position: absolute;
    right: 7%;
    top: 0.1%;
    font-weight: bolder;
    font-size: 30px;
  }

  .container {
    width: 50%;
    height: 92%;
    position: absolute;
    left: 25%;
    top: 20.5%;
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
    background-position: center;
    z-index: 99999;
  }

  .tip div {
    width: 95%;
    height: 73%;
    margin: 1% 1% 1% 3.5%;
    border-radius: 10px;
  }

  .tip div img {
    width: 48%;
    height: 95%;
    margin-top: 1.5%;
  }

  .errorImg {
    position: absolute;
    left: 22%;
    top: 20%;
    width: 50%;
    height: 50%;
  }

  .itemImg {
    position: absolute;
    left: 8%;
    top: 8%;
    width: 85%;
    height: 85%;
  }

  .readyImg {
    width: 100%;
    height: 100%;
    z-index: 99999;
    position: absolute;
    top: 0%;
    left: 0%;
  }

  .progress {
    position: absolute;
    left: 34.4%;
    bottom: 4.2%;
    height: 2.2%;
  }

  .tipInfo {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../assets/visual2/info.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 9999;
  }

  .tipInfo span {
    font-size: 25px;
    font-weight: bold;
    position: absolute;
    top: 45%;
    left: 35%;
    width: 30%;
    height: 50px;
    line-height: 50px;
  }
  .divResult{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background-image: url(../../assets/visual2/result.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 9999;
  }
</style>
