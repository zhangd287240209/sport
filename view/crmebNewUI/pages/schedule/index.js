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
    weekdaysDetail:[],
    times:["05:00","07:00","09:00","11:00","13:00","15:00","17:00","19:00","21:00"],
    days: {
      col:[
        {
          row: [{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }, { name: '5' }, { name: '6' }, { name: '7' }, { name: '8' }, { name: '9' }]
        },
        {
          row: [{ name: '15' }, { name: '25' }, { name: '35' }, { name: '45' }, { name: '55' }, { name: '65' }, { name: '75' }, { name: '85' }, { name: '95' }]
        },
        { row: [{ name: '10' }, { name: '20' }, { name: '30' }, { name: '40' }, { name: '50' }, { name: '60' }, { name: '70' }, { name: '80' }, { name: '90' }] },
        { row: [{ name: '11' }, { name: '21' }, { name: '31' }, { name: '41' }, { name: '51' }, { name: '61' }, { name: '71' }, { name: '81' }, { name: '91' }] },
        { row: [{ name: '12' }, { name: '22' }, { name: '32' }, { name: '42' }, { name: '52' }, { name: '62' }, { name: '72' }, { name: '82' }, { name: '92' }]},
        { row: [{ name: '13' }, { name: '23' }, { name: '33' }, { name: '43' }, { name: '53' }, { name: '63' }, { name: '73' }, { name: '83' }, { name: '93' }]},
        { row: [{ name: '14' }, { name: '24' }, { name: '34' }, { name: '44' }, { name: '54' }, { name: '64' }, { name: '74' }, { name: '84' }, { name: '94' }] }
      ]
    },
    currentIndex:0,
    preIndex:300,
    height:0,
    aa:{}
  },

  setDays:function(){
    var classs = { items: [{ date: '2019-07-31', startTime: '09:00', endTime: '10:00', classType: '1' }, { date: '2019-07-31', startTime: '15:30', endTime: '17:30', classType: '1' }] };
    var week = this.data.weekdaysDetail;
    //var day = this.data.days.col;
    var items = classs.items;
    var times = this.data.times;
    var that = this;
    var arrView = new Array();
    for (var i = 0; i < week.length; i++) {
      for (var j = 0; j < items.length; j++) {
        //获取日期的Day部分
        var itemsDay = that.formatTime(new Date(items[j]['date']));
        var startTime = items[j]['startTime'];
        var endTime = items[j]['endTime'];
        var classType = items[j]['classType'];
        //如果日期相等，说明这天有课
        var thisweekDay = that.formatTime(new Date(week[i]));
        if (thisweekDay == itemsDay) {
          //循环每个时间段去判断
          for (var k = 0; k < times.length; k++) {
            var time = times[k].split(':')[0];
            //开始时间相同，说明这一格里有数据
            if (startTime.split(':')[0] == time) {
              //当前时间
              var thisDate = new Date(week[i] + ' ' + times[k]);
              var classStartDate = new Date(itemsDay + ' ' + startTime);
              var classEndDate = new Date(itemsDay + ' ' + endTime);
              //相差的分钟数
              var startsjc = parseInt(classStartDate - thisDate) / 1000 / 60;
              //计算占总格子的比例,一格子2小时120分钟
              var topbl = startsjc/120*100;
              var viewStyle = "background-color:black;margin-top:" + topbl+"%;";

              //结束时间判断
              var thisEndDate = new Date(thisDate);
              thisEndDate.setHours(thisEndDate.getHours() + 2);
              var endsjc = parseInt(thisEndDate-classEndDate) / 1000 / 60;
              //如果大于0，说明结束时间在格子内
              if (endsjc>0){
                var bottombl = endsjc / 120 * 100;
                viewStyle = viewStyle + "margin-bottom:" + bottombl + "%;";

                //计算高度,如果在格子内，则课程的时间差即百分比
                var heightbl = parseInt(classEndDate - classStartDate) / 1000 / 60/120*100;
                viewStyle = viewStyle + "height:" + heightbl + "%;";
              }
              else//计算高度，如果不在格子内
              {
                var heightbl = parseInt(thisEndDate - classStartDate) / 1000 / 60 / 120 * 100;
                viewStyle = viewStyle + "height:" + heightbl + "%;";
              }
              console.log(i.toString() +' '+ k.toString()+' '+ viewStyle);
              
            }
            //结束时间再格子内的情况
            if (endTime.split(':')[0] == time) {
              //当前时间
              var thisDate = new Date(week[i] + ' ' + times[k]);
              var thisEndDate = new Date(thisDate);
              thisEndDate.setHours(thisEndDate.getHours() + 2);
              var classEndDate = new Date(itemsDay + ' ' + endTime);
              //相差的分钟数
              var endsjc = parseInt(thisEndDate - classEndDate) / 1000 / 60;
              //计算占总格子的比例,一格子2小时120分钟
              var bottombl = endsjc / 120 * 100;
              var viewStyle = "background-color:black;margin-bottom:" + bottombl + "%;";

              var heightbl = parseInt(classEndDate - thisDate) / 1000 / 60 / 120 * 100;
              viewStyle = viewStyle + "height:" + heightbl + "%;";
              console.log(i.toString() + ' ' + k.toString() + ' ' + viewStyle);
            }
          }

        }
      }
    }

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
    this.getDays(0);
    var that = this;
    wx.createSelectorQuery().selectAll('#canderid').boundingClientRect(function (rect) {
      //console.log(rect[0].height)
      //console.log(rect[0].width)
      that.setData({
        height: rect[0].height
      })
    }).exec()  
    
    var a ="2019-07-31 07:00";
    var b ="2019-07-31 09:30";
    var aa=new Date(a);
    var bb = new Date(b);
    //console.log(parseInt(bb - aa) / 1000 / 60);
    var date1 = this.formatTime(new Date());
    //console.log(date1);
    this.setDays();
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

  getDays: function (index){
    var date = new Date();
    // 本周一的日期
    date.setDate(date.getDate() - date.getDay() + 1 + index * 7);
    var days = new Array();
    var daysDetail = new Array();
    var day = date.getDate();
    days.push(day);
    daysDetail.push(this.formatTime(date));
    for(var i=0;i<6;i++)
    {
      date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      days.push(date.getDate());
      daysDetail.push(this.formatTime(date));
    }
    //console.log(days);
    this.setData({ weekdays: days });
    this.setData({ weekdaysDetail: daysDetail });
  
  },
  itemChange:function(event){
    var swiperindex = event.detail.current;
    var current = this.data.currentIndex;
    var preIndex = this.data.preIndex;
    //console.log(swiperindex + '|' + this.data.preIndex);

    //没有上一页，说明是进去第一次滑动
    if (preIndex==300)
    {
      //向后滑动
      if (swiperindex==1)
      {
        this.setData({
          currentIndex: current + 1
        })
      }
      //向前滑动
      if (swiperindex == 2)
      {
        this.setData({
          currentIndex: current - 1
        })
      }
    }

    if (preIndex==0)
    {
      //向后滑动
      if (swiperindex == 1) {
        this.setData({
          currentIndex: current + 1
        })
      }
      //向前滑动
      if (swiperindex == 2) {
        this.setData({
          currentIndex: current - 1
        })
      }
    }
    else if (preIndex == 1)
    {
      //向后滑动
      if (swiperindex == 2) {
        this.setData({
          currentIndex: current + 1
        })
      }
      //向前滑动
      if (swiperindex == 0) {
        this.setData({
          currentIndex: current - 1
        })
      }
    }
    else if (preIndex == 2) {
      //向后滑动
      if (swiperindex == 0) {
        this.setData({
          currentIndex: current + 1
        })
      }
      //向前滑动
      if (swiperindex == 1) {
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
    this.getDays(this.data.currentIndex);
  },
  get_wxml: function (className, callback) {
    wx.createSelectorQuery().selectAll(className).boundingClientRect(callback).exec()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  formatTime: function (date) {
    var date = new Date(date); //返回当前时间对象
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].join('-')
  }

})