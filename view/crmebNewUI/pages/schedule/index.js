// pages/schedule/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '我的日程',
      'color': false
    },
    today: new Date().getMonth()+1 + '月' + new Date().getDate()+'日',
    thisWeek: '',
    weeks: ["一", "二", "三", "四", "五", "六", "日"],
    weekdays:[],
    times:["05","07","09","11","13","15","17","19","21"],
    days: {
      col:[
        {
          row: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }, { name: '8' }, { name: '9' }]
        },
        { row: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }, { name: '8' }, { name: '9' }] },
        { row: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }, { name: '8' }, { name: '9' }] },
        { row: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }, { name: '8' }, { name: '9' }]},
        { row: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }, { name: '8' }, { name: '9' }]},
        { row: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }, { name: '8' }, { name: '9' }] },
        { row: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }, { name: '8' }, { name: '9' }] }
      ]
    },
    currentIndex:0,
    preIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.currentWeek(0);
    this.getDays();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 获取本周日期
   */
  currentWeek: function (index) {
    var date = new Date();
    // 本周一的日期
    date.setDate(date.getDate() - date.getDay() + 1 + index*7);
    var begin = (date.getMonth() + 1) + "月" + date.getDate()+'日';

    // 本周日的日期
    date.setDate(date.getDate() + 6);
    var end = (date.getMonth() + 1) + "月" + date.getDate()+'日';
    console.log(begin + end);

    var str = begin +'--'+ end;
    this.setData({ thisWeek: str});
  },

  getDays: function(){
    var date = new Date();
    // 本周一的日期
    date.setDate(date.getDate() - date.getDay() + 1);
    var days = new Array();
    var day = date.getDate();
    days.push(day);
    for(var i=0;i<6;i++)
    {
      date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      days.push(date.getDate());
    }
    console.log(days);
    this.setData({ weekdays: days });
  
  },
  itemChange:function(event){
    var swiperindex = event.detail.current;
    var current = this.data.currentIndex;
    var preIndex = this.data.preIndex;
    console.log(swiperindex + '|' + this.data.preIndex);

    if (current == 0)
    {
      if (swiperindex == 1)
      {
        this.setData({
          currentIndex: current+1 
        })
      }
      else if (swiperindex == 2){
        this.setData({
          currentIndex: current - 1
        })
      }
    }
    else if (swiperindex == 1){
      if (preIndex == 2) {
        this.setData({
          currentIndex: current + 1
        })
      }
      else if (preIndex == 0) {
        this.setData({
          currentIndex: current - 1
        })
      }
    }
    else if (swiperindex == 2) {
      if (preIndex == 0) {
        this.setData({
          currentIndex: current + 1
        })
      }
      else if (preIndex == 1) {
        this.setData({
          currentIndex: current - 1
        })
      }
    }
    else if (swiperindex == 0) {
      if (preIndex == 1) {
        this.setData({
          currentIndex: current + 1
        })
      }
      else if (preIndex == 2) {
        this.setData({
          currentIndex: current - 1
        })
      }
    }


    this.setData({
      preIndex: swiperindex
    })
    console.log(this.data.currentIndex);
    this.currentWeek(this.data.currentIndex);
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})