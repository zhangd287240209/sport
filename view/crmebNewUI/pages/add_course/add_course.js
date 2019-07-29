var app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '新增备课',
      'color': false
    },
    loading: false,
    loadend: false,
    coursename:null,
    array: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
    content: {
      "courseId": 3,
      "name": "",
      "userid":"",
      "action": []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.coursename != "" || options.coursename != null) {
      console.log("************");
      this.setData({
        'content.name': options.coursename
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
  var that = this;
    //获取缓存动作信息
    wx.getStorage({
      key: 'msg',
      success: function (res) {
        console.log("成功获取缓存数据：", res.data.action);
        that.setData({
          'content.action': res.data.action
        });
        //一旦获取到缓存，就立即删除
        wx.removeStorage({
          key: 'msg',
          success(res) {
            console.log(res)
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 添加动作
   */
  addaction: function (){
    wx.navigateTo({
      url: '/pages/action/index?coursename='+this.data.content.name,
    })
  },

  /**
   * 获取输入框课程名称的值
   */
  searchInput: function (e) {
    this.setData({
      'content.name': e.detail.value
    })
  },

  /**
   * 点击减号事件
   */
  reduce: function (e){
    var index = parseInt(e.currentTarget.dataset['index']);
    console.log("这是动作下标：",index);
    var frequency = parseInt(e.currentTarget.dataset['num']) -1;
    //this.data.action[index].frequency = frequency;
    console.log("这是动作组数：", frequency);
    var param = {};
    var string = "content.action[" + index + "].frequency";
    param[string] = frequency;
    this.setData(param);
  },

  /**
   * 点击加号事件
   */
  plus: function (e){
    var index = parseInt(e.currentTarget.dataset['index']);
    console.log("这是动作下标：", index);
    var frequency = parseInt(e.currentTarget.dataset['num']) + 1;
    //this.data.action[index].frequency = frequency;
    console.log("这是动作组数：", frequency);
    var param = {};
    var string = "content.action[" + index + "].frequency";
    param[string] = frequency;
    this.setData(param);
  },

  /**
   * 点击质量属性
   */
  changeweight: function (e){
    console.log("质量对象",e);
  },

 /**
 * 改变质量
 */
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e);
    var i = parseInt(e.currentTarget.dataset['icount']);
    var j = parseInt(e.currentTarget.dataset['index']);
    console.log(i,j);
    var param = {};
    var string = "content.action[" + i + "].item["+j+"].weight";
    param[string] = e.detail.value;
    this.setData(param);
  },

/**
 * 改变数量
 */
  bindPickerChangenum: function (e){
    console.log('picker发送选择改变，携带值为', e);
    var i = parseInt(e.currentTarget.dataset['icount']);
    var j = parseInt(e.currentTarget.dataset['index']);
    console.log(i, j);
    var param = {};
    var string = "content.action[" + i + "].item[" + j + "].num";
    param[string] = e.detail.value;
    this.setData(param);
  },


  /**
   * 保存课程信息
   */
  save: function (e){
    console.log(this.data.content.name);
    if (this.data.content.name == ""){
      wx.showToast({
        title: '课程名称不能为空！',
        icon: 'none',
        duration: 3000,
        mask: true,
      })
    }else{
      var that = this;
      var returndata = this.data.content;
      if (returndata.action.length == 0){
        wx.showToast({
          title: '动作不能为空！',
          icon: 'none',
          duration: 3000,
          mask: true,
        })
      }
      console.log('返回数据：', returndata);
    }
    
    app.basePost(app.U({ c: 'course_api', a: "addCourse" }), returndata, function(res){
      wx.redirectTo({
        url: '/pages/',
      })
    }, function(res){
      console.log(res);
    });
  }
})