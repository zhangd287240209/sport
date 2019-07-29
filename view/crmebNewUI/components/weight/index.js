var app = getApp();
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    
  },
  data: {
    // 这里是一些组件内部数据
    array: ['美国', '中国', '巴西', '日本']
  },
  methods: {
    // 这里是一个自定义方法
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    }
  }
})