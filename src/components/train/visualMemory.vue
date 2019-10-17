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
        <img class="errorImg" src="../../assets/visual2/error.png" v-show="(itemList[index].status&&!itemList[index].isItem)||(itemList[index].status&&(itemList[index].isItem&&itemList[index].isAnswerRight===false))" />

        <img class="itemImg" :src="item.img" v-show="(isShowMoment&&itemList[index].isItem)||(itemList[index].status&&itemList[index].isItem&&itemList[index].isAnswerRight===true)" />
      </div>

    </div>
    <img class="progress" :style="{width:surplusProglength+'%'}" src="../../assets/visual2/progranbar.png" />
    <img class="readyImg" src="../../assets/visual2/ready.png"  v-if="isReady" />
    <div class="tipInfo" v-if="isNextQuestion">
      <span v-html="nextTitle"></span>
    </div>
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
        totalDuration: 200, //计时器总时长
        surplusTime: 200, //当前剩余时长
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
        level: [1, 2, 3], //数组个数为有效时间内的答题数，数组值为该次需要记住的选项个数
        currentLevel: 0, //当前答题，即level数组的index
        isStart: false, //答题是否已经开始(进度条走完才算开始)
        correctNumber: 0, //本次答对次数
        inCorrectNumber: 0, //本次答错次数
      }
    },
    computed: {
      nextTitle: function() {
        return '下一组：<span style="color:red;">' + this.level[this.currentLevel] + '个</span>';
      },
    },
    mounted() {
      this.initData();
    },
    methods: {
      timerStar() {
        this.surplusTime = this.totalDuration;
        this.surplusProglength = this.totalProgLength;
        this.itemList.map(n => n.status = false);
        this.isReady = true;
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
          this.initData();
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
            clearInterval(this.intervalTime) //清除计时器
            this.intervalTime = null; //设置为null
            //this.intervalList = null;
            this.surplusTime = this.totalDuration;
          }
        }, 1000)
      },
      selectResult(index) {
        if (!this.isStart) return;
        //this.itemList.map(n => n.status = false);
        this.itemList[index].status = true;
      },
      checkItem(item, index) {
        var val = this.itemList[index].value;
        if (val == item.value) { //回答正确
          this.itemList[index].isAnswerRight = true;
          this.correctNumber += 1;
          if (this.correctNumber == this.level[this.currentLevel]) { //如果题目全部答对，进入下一轮
            if (this.currentLevel < this.level.length - 1)
              this.nextQuestion();
            else {
              this.doFinish();
              alert('已完成所有答题');
            }

          }
        } else {
          this.itemList[index].isAnswerRight = false;
          this.inCorrectNumber += 1;
          this.nextQuestion();
        }
      },
      initData() {
        var newData = [];
        var list = randomNumBoth(1, 25, this.level[this.currentLevel]);
        list.sort((a, b) => {
          return a - b;
        });
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
            });
          } else {
            newData.push({
              status: false,
              isItem: false,
              value: -1,
              isAnswerRight: false,
              img: '',
            });
          }
        }
        this.itemList = newData;
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
    left: 34.5%;
    bottom: 4.4%;
    height: 2%;
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
    font-size: 20px;
    font-weight: bold;
    position: absolute;
    top: 45%;
    left: 35%;
    width: 30%;
    height: 50px;
    line-height: 50px;
  }
</style>
