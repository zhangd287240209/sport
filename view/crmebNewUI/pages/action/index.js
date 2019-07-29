// pages/action/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '选择动作',
      'color': false
    },
    loading: false,
    loadend: false,
    toView: null,
    searchValue: '',
    coursename:"",
    result: {action:[]},
    value:[],
    bodyitems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.coursename != "" || options.coursename != null){
      this.setData({
        coursename: options.coursename
      });
    }
    this.getAllActions();
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
   * 选中多选框时触发的事件
   */
  checkboxChange: function (e){
    var index = e.currentTarget.dataset['index'];
    console.log('这是第一个循环的下标：'+index);
    var items = this.data.bodyitems[index].action;
    var checkArr = e.detail.value;
    var data = this.data.value;
    var jsonarray = data;

    for (var i = 0; i < items.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }

      var param = {};
      var string = "bodyitems[" + index + "].action";
      param[string] = items;
      this.setData(param);
    }
  },

  /**
   * 点击-号的事件
   */
  reduce: function (e){
    //获得对应动作的数量
    var count = e.currentTarget.dataset['num'] - 1;
    if (count < 0){
      count = 0; //如果数量少于0，默认为0
    }
    var index = parseInt(e.currentTarget.dataset['index']);
    var item = parseInt(e.currentTarget.dataset['item']);
    var items = this.data.bodyitems[index].action[item];
    items.num = count;

    var param = {};
    var string = "bodyitems[" + index + "].action["+item+"]";
    param[string] = items;
    this.setData(param);
  },

  /**
   * 点击+号的事件
   */
  plus: function (e){
    // 传递的参数
    var count = parseInt(e.currentTarget.dataset['num']) + 1;

    var index = parseInt(e.currentTarget.dataset['index']);
    var item = parseInt(e.currentTarget.dataset['item']);
    var items = this.data.bodyitems[index].action[item];
    items.num = count;
    var param = {};
    var string = "bodyitems[" + index + "].action[" + item + "]";
    param[string] = items;
    this.setData(param);
  },

/**
 * 获取所有的动作
 */
  getAllActions: function () {
    var that = this;
    app.baseGet(app.U({ c: 'courseaction_api', a: "SelectAction" }), function (res) {
      console.log("获得所有动作",res);
      that.setData({
        'bodyitems': res.data
      });
    });
  },

  /**
   * 模糊搜索动作
   */
  getAction: function (){
    var that = this;
    var msg = { 'search': that.data.searchValue };
    app.basePost(app.U({ c: 'courseaction_api', a: "SelectActionLike" }), msg, function (res) {
      that.setData({ 'bodyitems': res.data });
    });
  },

  /**
   * 锚点连接事件
   */
  tap: function (e){
    console.log("tap");
    var order = ['leg', 'arm', 'chest', 'body'];
    var toview = e.currentTarget.dataset['toview'];
    console.log(toview);
    this.setData({
      toView: toview
    })
  },

/**
 * 光标失去焦点时设置搜索关键词
 */
  setValue: function (event) {
    console.log(event.detail.value);
    this.setData({ searchValue: event.detail.value });
  },

/**
 * 搜索按钮
 */
  searchBut: function () {
    var that = this;
    that.getAction();
  },

  /**
     * 提交动作表单
     * 
    */
  formSubmit: function (e) {
    var data = this.data.bodyitems;
    var value = this.data.value;
    var coursename = this.data.coursename;
    var jsonarray = value;
    for(var i = 0;i < data.length; i++){
      for(var j = 0;j < data[i].action.length; j++){
        if (data[i].action[j].checked == true){
          var arr =
          {
            "actionId": data[i].action[j].id,
            "name": data[i].action[j].name,
            "part": data[i].part,
            "item": [],
          };
          //循环组数，创建每组信息对象
          for (var m = 0; m < data[i].action[j].num; m++){
            var group = {
              "id": m,
              "num":10,
              "weight":10
            };
            arr.item.push(group);
          }
          
          jsonarray.push(arr);
        }
      }
    }
    
    //选中的时候，把已经选中的值放入表单结果
    this.setData({
      "result.action": jsonarray
    });

    var msg = this.data.result;
    console.log("开始同步数据--------", msg);
    wx.setStorage({
      key: 'msg',
      data: msg,
      success: function (res) {
        wx.showToast({
          title: '动作保存成功！',
          icon: 'none',
          duration: 1000,
          mask: true,
          success: function (res) {
            setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '/pages/add_course/add_course?coursename=' + coursename,
              })
            }, 1000)
          }
        })
      }
    });
    console.log('同步保存成功');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log(e)
    this.setData({
      cate: e.currentTarget.dataset.cate // 设置滚动到视图
    })
  }
})