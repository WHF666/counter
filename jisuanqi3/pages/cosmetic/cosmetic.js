// pages/cosmetic/cosmetic.js
Page({
  data: {
    arr: ['input1', 'input2'],
    arr2: ['input4', 'input5'],
    arr1: ['质量(g或ml):', '价格:'],
    huobi: ["人民币", "日元", "美元", "英镑", "欧元", "韩元", "澳元", "港币", "加元", "泰铢", "新台币", "瑞士法郎"],
    huilv: [1, 0.06071, 6.7134, 8.795, 7.5866, 0.005927, 4.7617, 0.8555, 5.02139, 0.2118, 0.2178, 6.7355],
    input1: 1,
    input4: 1,
    hidden: true,
    hb: "选择货币",
    hb1: "选择货币",
    img: "../image/down.png",
    img1: "../image/down.png",
    hbhidden: false,
    hbhidden1: false
  },
  onLoad: function () {
    console.log(this.data.huobi.length)
  },
  input1: function (e) {
    this.setData({
      input1: Number(e.detail.value)
    })
  },
  input2: function (e) {
    this.setData({
      input2: Number(e.detail.value)
    })
  },
  input3: function (e) {
    this.setData({
      input3: Number(e.detail.value)
    })
  },
  input4: function (e) {
    this.setData({
      input4: Number(e.detail.value)
    })
  },
  input5: function (e) {
    this.setData({
      input5: Number(e.detail.value)
    })
  },
  input6: function (e) {
    this.setData({
      input6: Number(e.detail.value)
    })
  },

  select: function () {
    this.setData({
      hbhidden: !this.data.hbhidden
    })
  },
  hb: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    this.setData({
      hb: this.data.huobi[id],
      hl: this.data.huilv[id]
    })
  },
  select1: function () {
    this.setData({
      hbhidden1: !this.data.hbhidden1
    })
  },
  hb1: function (e) {
    console.log(e)
    var id = e.currentTarget.id
    this.setData({
      hb1: this.data.huobi[id],
      hl1: this.data.huilv[id]
    })
  },
  bd: function () {
    var input1 = this.data.input1, input2 = this.data.input2, input4 = this.data.input4, input5 = this.data.input5
    var hl1 = this.data.hl
    var hl2 = this.data.hl1
    var result1 = (input2 * hl1 / input1).toFixed(2)
    var result2 = (input5 * hl2 / input4).toFixed(2)
    var r1 = parseFloat(result1)
    var r2 = parseFloat(result2)
    if (isNaN(r1) || isNaN(r2)) {
      this.setData({
        result:"请确认输入值无误",
        hidden:false
      })
    } else if (r1 == r2) {
      this.setData({
        result: `对比结果:
        产品1单位质量价格为:${r1}
        产品2单位质量价格为:${r2}
        二者性价比相同`,
        hidden: false
      })
    } else if (r1 > r2) {
      this.setData({
        result: `对比结果：
        产品1单位质量价格为：${r1}
        产品2单位质量价格为：${r2}
        产品2性价比更高`,
        hidden:false
      })
    } else {
      this.setData({
        result: `对比结果:
        产品1单位质量价格为:${r1}
        产品2单位质量价格为:${r2}
        产品1性价比更高`,
        hidden: false
      })
    }
  }
})
