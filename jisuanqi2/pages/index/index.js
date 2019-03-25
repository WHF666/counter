import Toast from '../dist/toast/toast';
const db = wx.cloud.database();
const updateManager = wx.getUpdateManager();
var names = Array();

var names_i = 0;
var names_max = 0;
var isascii = false;
var temaii_str = '';
var temaii_yun = true;
var ischars = true;
var obj;
var zuokuohao_i = 0;
var datalongs = Array();
var datalongs_i = 0;
var hexadecimal = require("../js/Hexadecimal.js");
var test_number;
var ishexad = false;
var isnowrap = true;
var ishou = false;
var isqian = false;
var iswei = false;
updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
});

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success: function (res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
});

updateManager.onUpdateFailed(function () {
  // 新版本下载失败
  wx.showModal({
    title: '新版本下载失败',
    content: '新版本下载失败，是否重启应用？'
  })
});
function setisnowrap() {

  isnowrap = true;
  obj.setData({
    isnowrap: isnowrap
  });

  switch (true) {
    case ishou:
      ishou = !ishou;
      obj.setData({
        ishou: ishou
      });
      break;
    case isqian:
      isqian = !isqian;
      obj.setData({
        isqian: isqian
      });

      break;
    case iswei:
      iswei = !iswei;
      obj.setData({
        iswei: iswei
      });
      break;
  }

}
/**
 * 输入进制
 */
function setHexad(data) {
  if (ishou) {
    hous[housi++] = data;
    var tem = getArrayStr(hous, housi) + 0;
    obj.setData({
      hou: tem
    });
  } else if (isqian) {
    qians[qiansi++] = data;
    var tem = getArrayStr(qians, qiansi) + 0;
    obj.setData({
      qian: tem
    });
  } else if (iswei) {
    weis[weisi++] = data;
    var tem = getArrayStr(weis, weisi) + 0;
    obj.setData({
      wei: tem
    });
  }
}
/**
 * 把数组转换为字符串
 */
function getArrayStr(array, k) {
  var tem = "";
  for (var i = 0; i < k; i++) {
    tem += array[i];
  }
  var tem2 = new Number(tem);
  return tem2;
}
var hous = Array();
var housi = 0;
var qians = Array();
var qiansi = 0;
var weis = Array();
var weisi = 0;
/**
 * 信息提示
 */
var textObj = {
  /**
   * 有错为true
   */
  iserr: false,
  ok: function () {
    return this.iserr;
  },
  set: function (strtem) {
    Toast(strtem);
  },
  err: function (strtem) {
    this.iserr = true;
    Toast(strtem);
  },
  del: function (strtem) {
    this.iserr = false;
  }
}
/**
 * 添加结果
 */
function addRes(temname, data) {
  var tems = Array();
  tems[0] = temname;
  tems[1] = data;
  db.collection('TexstLong').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      datalongs: tems
    },
    success: function (res) {

    }
  });
  addDatalongs(tems);
  setdelesetN(data); /**把数值显示到输入框*/
}
/**
 * 添加结果到数组中
 */
function addDatalongs(tems) {
  datalongs[datalongs_i++] = tems;
}
/**
 * 删除进制
 */
function deleteHexad() {
  if (ishou) {
    if (housi < 1) {
      obj.setData({
        hou: 0
      });
    } else {
      housi--;
      var tem = getArrayStr(hous, housi) + 0;
      obj.setData({
        hou: tem
      });
    }
  } else if (isqian) {
    if (qiansi < 1) {
      obj.setData({
        qian: 0
      });
    } else {
      qiansi--;
      var tem = getArrayStr(qians, qiansi) + 0;
      obj.setData({
        qian: tem
      });
    }
  } else if (iswei) {
    if (weisi < 1) {
      obj.setData({
        wei: 0
      });
    } else {
      weisi--;
      var tem = getArrayStr(weis, weisi) + 0;
      obj.setData({
        wei: tem
      });
    }
  }
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chars: [],
    numbers: [],
    a_A: 'none',
    bottom: 'inline',
    hexad: 'none',
    textResheig: 0,
    bottomheig: 0,
    a_Aname: 'A/a',
    a_Acss: -1,
    numbers_k: -1,
    text_name: '',
    isascii: false,
    scroll1: 0,
    datalongs: [],
    width: 0,
    qian: 10,
    hou: 16,
    wei: 62,
    zhaun: '<转>',
    isnowrap: true,
    ishou: false,
    isqian: false,
    iswei: false

  },
  a_A_item: function (event) {
    var name = event.currentTarget.dataset.name;
    var temk = name.charCodeAt();

    var index = event.currentTarget.dataset.index;
    this.setData({
      a_Acss: index
    });
    if (isnowrap) {
      set_shu_N(name);
    }
  },
  hexad: function (event) {
    ishexad = !ishexad;
    if (ishexad) {
      this.setData({
        hexad: 'inline'
      });
    } else {
      this.setData({
        hexad: 'none'
      });
      setisnowrap();
    }
  },
  numbers_item: function (event) {
    var name = event.currentTarget.dataset.name;
    if (name == 'ASCII') {
      isascii = !isascii;
    }
    var temk = name.charCodeAt();
    var index = event.currentTarget.dataset.index;
    if (name == 'ASCII') {
      this.setData({
        numbers_k: index,
        isascii: isascii
      });
      return;
    }
    if (temk >= 48 && temk <= 57 || isascii) {
      if (isnowrap) {
        set_shu_N(name);
      } else {
        setHexad(name);
      }
    } else if (isnowrap) {
      switch (temk) {
        case 37:
          setquyu(name); /* % */
          break;
        case 38:
          setyi(name); /* & */
          break;
        case 40:
          setzuo(name); /* ( */
          break;
        case 41:
          setyou(name); /* ) */
          break;
        case 42:
          setchen(name); /* * */
          break;
        case 43:
          setjia(name); /* + */
          break;
        case 45:
          setjian(name); /* - */
          break;
        case 46:
          dian(name); /* . */
          break;
        case 47:
          setchu(name); /* / */
          break;
        case 60:
          setzuoyi(name); /* < */
          break;
        case 62:
          setyouyi(name); /* > */
          break;
        case 94:
          setfei(name); /* ^ */
          break;
        case 124:
          sethuo(name); /* | */
          break;
      }
    }

    this.setData({
      numbers_k: index,
      isascii: isascii
    });
  },
  bottomEnt: function (ent) {
    this.setData({
      bottom: 'inline',
      a_A: 'none'
    })
  },
  dengyu: function (ent) {
    if (names_max < 3) {
      return;
    }
    if (!getTest(this.data.text_name, test_number)) {
      var temname = getnamestr();
      var data = setdengyu();
      addRes(temname, data);
    } else {
      var tem = this.data.text_name.charAt(this.data.text_name.search(test_number));
      textObj.set(this.data.text_name + ":\t" + tem);
    }
  },
  a_AEnt: function (ent) {

    if (this.data.a_A == 'inline') {
      var temstr = '';
      ischars = !ischars;
      setChars();
      if (ischars) {
        temstr = '小写';
      } else {
        temstr = '大写';
      }
      this.setData({
        bottom: 'none',
        a_A: 'inline',
        a_Aname: temstr
      })
    } else {
      if (ischars) {
        temstr = '小写';
      } else {
        temstr = '大写';
      }
      this.setData({
        a_Aname: temstr
      })
    }
    this.setData({
      bottom: 'none',
      a_A: 'inline'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    obj = this;
    test_number = RegExp("[a-zA-Z]+");
    var heig = wx.getSystemInfoSync().windowHeight;
    var width = wx.getSystemInfoSync().screenWidth;
    var em = heig / 16;
    var scroll1 = heig;
    var bottomheig = em * 4;
    var textResheig = heig - bottomheig - 3 * em;
    var numbers = Array();
    var k = 0;
    numbers[k++] = '1';
    numbers[k++] = '2';
    numbers[k++] = '3';
    numbers[k++] = '+';
    numbers[k++] = '4';
    numbers[k++] = '5';
    numbers[k++] = '6';
    numbers[k++] = '-';
    numbers[k++] = '7';
    numbers[k++] = '8';
    numbers[k++] = '9';
    numbers[k++] = '*';
    numbers[k++] = '.';
    numbers[k++] = '0';
    numbers[k++] = '&';
    numbers[k++] = '/';
    numbers[k++] = '(';
    numbers[k++] = ')';
    numbers[k++] = '|';
    numbers[k++] = '%';
    numbers[k++] = '<';
    numbers[k++] = '>';
    numbers[k++] = '^';
    numbers[k++] = 'ASCII';

    var texstLong = db.collection('TexstLong');
    texstLong.count({
      success: function (res) {
        texstLong.skip(res.total - 20).get({
          success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
              addDatalongs(res.data[i].datalongs);
            }
            setDatalongs();
            // wx.cloud.callFunction({
            // 	// 云函数名称
            // 	name: 'textlong',
            // 	data:{
            // 		id: res.data[i]._openid
            // 	},
            // 	success: function (res) {
            // 		console.log(res.result) // 3
            // 	},
            // 	fail: console.error
            // });
          }
        });
      }
    });


    this.setData({
      numbers: numbers,
      'textResheig': textResheig.toFixed(0),
      'bottomheig': bottomheig.toFixed(0),
      scroll1: scroll1.toFixed(0),
      width: width
    });
    hexadecimal.Hexadecimal();
    // hexadecimal.test();
    setChars();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setTemText: function (event) {
    var text = event.currentTarget.dataset.text;
    setN(text);
  },
  kong: function () {
    setdele();
  },
  text_name: function () {
    setisnowrap();
  },
  qian: function () {
    isqian = !isqian;
    if (isnowrap) {
      isnowrap = false;
      this.setData({
        isnowrap: isnowrap,
        isqian: isqian
      });
    } else if (ishou) {
      ishou = !ishou;
      this.setData({
        ishou: ishou,
        isqian: isqian
      });
    } else if (iswei) {
      iswei = !iswei;
      this.setData({
        iswei: iswei,
        isqian: isqian
      });
    } else if (isqian) {
      this.setData({
        isqian: isqian
      });
    } else {
      isqian = !isqian;
      setisnowrap();
    }
  },
  zhaun: function () {
    var tem = obj.data.qian;
    var tem2 = obj.data.hou;
    housi = 0;
    qiansi = 0;
    obj.setData({
      qian: tem2,
      hou: tem
    });
  },
  hou: function () {
    ishou = !ishou;
    if (isnowrap) {
      isnowrap = false;
      this.setData({
        isnowrap: isnowrap,
        ishou: ishou
      });
    } else if (isqian) {
      isqian = !isqian;
      this.setData({
        isqian: isqian,
        ishou: ishou
      });
    } else if (iswei) {
      iswei = !iswei;
      this.setData({
        iswei: iswei,
        ishou: ishou
      });
    } else if (ishou) {
      this.setData({
        ishou: ishou
      });
    } else {
      ishou = !ishou;
      setisnowrap();
    }


  },
  wei: function () {
    iswei = !iswei;
    if (isnowrap) {
      isnowrap = false;
      this.setData({
        isnowrap: isnowrap,
        iswei: iswei
      });
    } else if (isqian) {
      isqian = !isqian;
      this.setData({
        isqian: isqian,
        iswei: iswei
      });
    } else if (ishou) {
      ishou = !ishou;
      this.setData({
        ishou: ishou,
        iswei: iswei
      });
    } else if (iswei) {
      this.setData({
        iswei: iswei
      });
    } else {
      iswei = !iswei;
      setisnowrap();
    }

  },
  go: function () {
    var qian_i = Number(this.data.qian);
    var hou_i = Number(this.data.hou);
    var wei_i = Number(this.data.wei);
    if (qian_i < 2) {
      textObj.set("现在的进制" + qian_i + "： 不能小于2进制");
      return;
    }
    if (hou_i < 2) {
      textObj.set("需要转换的进制" + hou_i + "： 不能小于2进制");
      return;
    }
    if (wei_i > 62) {
      textObj.set("位进制表示" + wei_i + "： 不能大于62进制");
      return;
    } else if (wei_i < 2) {
      textObj.set("位进制表示" + wei_i + "： 不能小于2进制");
      return;
    }
    if (qian_i == hou_i) {
      textObj.set("现在的进制" + qian_i + "：和转换的进制" + hou_i + "：不能相同");
      return;
    }
    var name = this.data.text_name;
    if (hexadecimal.getSpecial_0(name, qian_i)) {
      textObj.del();
      var getStr = hexadecimal.getAil(name, qian_i, hou_i, wei_i, textObj);
      if (!textObj.ok()) {
        addRes(name + "  [" + qian_i + " > " + hou_i + "](" + wei_i + ")", getStr);
      }

    } else {
      var tem = hexadecimal.getNoSpecial_index_0(name, qian_i);
      if (tem != null) {
        var tem1 = tem[0];
        textObj.set(name + "中：" + tem1 + "不符合" + qian_i + "进制");
      }
    }

  },
  dele: function (evt) {
    if (ishou || isqian || iswei) {
      deleteHexad();
      return;
    }
    /** 右括号输入开关* */
    if (names_i > 0) {
      var temstr = names[names_i--];
      if (temaii_str == '(') {
        zuokuohao_i--;
      } else if (temaii_str == ')') {
        zuokuohao_i++;
      }
    }
    /** 把输入框数组减减* */
    temaii_str = names[names_i - 1];
    names_max = names_i;

    /** 运算符输入开关* */
    temaii_yun = true;
    if (!set_yunfu_N_by(temaii_str)) {
      if (temaii_str == ')') {
        temaii_yun = false;
      }
    } else {
      temaii_yun = false;
    }
    /** 把输入框数组显示到输入框* */
    setaiitext();
    if (names_max == 0) {
      setdele();
    }
  }
})

function setdele() {
  names = new Array();
  names_i = 0;
  zuokuohao_i = 0;
  temaii_str = '';
  names_max = names_i;
  temaii_yun = true;
  setaiitext();
}

function set_yunfu_N_by(str) {
  var by = true;
  if (str == '') {
    by = false;
  } else if (str == '(') {
    by = false;
  } else if (str == ')') {
    by = false;
  } else {
    by = getfuhaoby(str);
  }
  return by;
}
/**
 * 判断str是否等于运算符，不是运算符返回true
 */
function getfuhaoby(str) {
  var by = true;
  by = getfuhaoby1(str); // *,/,%
  if (by) {
    by = getfuhaoby2(str); // +,-
  }
  if (by) {
    by = getfuhaoby3(str); // <<,>>
  }
  if (by) {
    by = getfuhaoby4(str); // &
  }
  if (by) {
    by = getfuhaoby5(str); // |
  }
  if (by) {
    by = getfuhaoby6(str); // ^
  }
  return by;
}

function getfuhaoby6(str) {
  var by = true;
  if (str == '|') {
    by = false;
  }
  return by;
}

function getfuhaoby5(str) {
  var by = true;
  if (str == '^') {
    by = false;
  }
  return by;
}

function getfuhaoby4(str) {
  var by = true;
  if (str == '&') {
    by = false;
  }
  return by;
}

function getfuhaoby3(str) {
  var by = true;
  if (str == '<') {
    by = false;
  } else if (str == '>') {
    by = false;
  }
  return by;
}

function getfuhaoby2(str) {
  var by = true;
  if (str == '+') {
    by = false;
  } else if (str == '-') {
    by = false;
  }
  return by;
}

function getfuhaoby1(str) {
  var by = true;
  if (str == '*') {
    by = false;
  } else if (str == '%') {
    by = false;
  } else if (str == '/') {
    by = false;
  }
  return by;
}

function get_yun_N_by(str) {
  var by = true;
  if (str == '.') {
    by = false;
  } else if (str == '') {
    by = false;
  } else {
    by = set_yunfu_N_by(str);
  }
  return by;
}

function setChars(temobj) {
  var charstem = Array();
  for (var i = 0; i < 26; i++) {
    if (ischars) {
      charstem[i] = String.fromCharCode(i + 65);
    } else {
      charstem[i] = String.fromCharCode(i + 97);
    }
  }
  obj.setData({
    chars: charstem
  });
}

function set_shu_N(str) {
  temaii_yun = false;
  if (temaii_str != ')') {
    setN(str);
  }
}

function setzuo(event) { // 括号左		(
  /** 运算符输入过滤* */
  if (!temaii_yun) {
    return;
  } else if (temaii_str == '.') {
    return;
  } else if (temaii_str == '(') {
    // return ;
  } else if (temaii_str == ')') {
    return;
  } else if (temaii_str == '+') {
    // return ;
  } else if (temaii_str == '-') {
    // return ;
  } else if (temaii_str == '*') {
    // return ;
  } else if (temaii_str == '/') {
    // return ;
  } else if (temaii_str == '%') {
    // return ;
  } else if (temaii_str == '<') {
    // return ;
  } else if (temaii_str == '>') {
    // return ;
  } else if (temaii_str == '&') {
    // return ;
  } else if (temaii_str == '|') {
    // return ;
  } else if (temaii_str == '^') {
    // return ;
  } else if (temaii_str == '') {
    // return ;
  }
  zuokuohao_i++;
  set_yun_N(event);
}

function setN(str) {
  /** ASCII 码开关* */
  if (isascii) {
    str = str.charCodeAt();
  }
  /** 把字符串添加到输入框中的数组* */
  temaii_str = str;
  names[names_i++] = str;
  names_max = names_i;
  /** 把输入框数组显示到输入框* */
  setaiitext();
}

function setaiitext() {
  var text_name = '';
  /** names_max控制显示数，当进行输入删除时，并不清除数组中的内容* */
  for (var i = 0; i < names_max; i++) {
    text_name += names[i];
  }
  setDatalongs();
  const query = wx.createSelectorQuery();
  query.select('#text_name').boundingClientRect().exec(function (res) {
    obj.setData({
      scroll1: res[0].right * 10,
      text_name: text_name,
    })
  });
  return text_name;
}
/**
 * 添加记录
 */
function setDatalongs() {
  var tems = Array();
  for (var i = 0; i < datalongs.length; i++) {
    tems[i] = datalongs[datalongs.length - i - 1];
  }
  obj.setData({
    datalongs: tems
  })
}
function setyou(event) { // 括号右			)
  /** 运算符输入过滤* */
  if (temaii_str == '') {
    return;
  }
  if (zuokuohao_i < 1) {
    return;
  }
  if (set_yun_N_by()) { /**过滤掉大部分，再选择小部分通行*/
    zuokuohao_i--;
    set_yun_N(event);
  } else {
    if (temaii_str == event) {
      zuokuohao_i--;
      set_yun_N(event);
    }
  }
};
var yunshuan_tem1 = true;

function setchu(event) { //					/
  /** 运算符输入过滤* */
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) { /**过滤掉大部分，再选择小部分通行*/
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function setjian(event) { //					-
  if (temaii_str == '' || temaii_str == '(') {
    setN(event);
  }
  if (set_yun_N_by()) { /**过滤掉大部分，再选择小部分通行*/
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function setchen(event) { //					*
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) {
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function setjia(event) { //					+
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) {
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function setyi(event) { //					&
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) {
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function sethuo(event) { //					|
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) {
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function setfei(event) { //					^
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) {
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function setquyu(event) { //					%
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) {
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function setzuoyi(event) { //					<<
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) {
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function setyouyi(event) { //					>>
  if (temaii_str == '') {
    return;
  }
  if (set_yun_N_by()) {
    set_yun_N(event);
  } else {
    if (temaii_str == ')') {
      set_yun_N(event);
    }
  }
};

function dian(event) { //					.
  if (set_yun_N_by()) {
    if (temaii_str != '') {
      set_yun_N(event);
    }
  }
};

function set_yun_N_by() {
  return get_yun_N_by(temaii_str);
}
/** 运算符输入的总过滤方法* */
function set_yun_N(str) {
  temaii_yun = true;
  setN(str);
}
/***
 * 
 * 下面是数值计算函数
 * 
 */

function getnamestr() {
  setBY();
  var temname = "";
  for (var i = 0; i < names_max; i++) {
    temname += names[i];
  }
  if (setdengyu_guolv(temname)) {
    temname = getdelete_yun(temname);
  }
  return temname;
}
//tt
function setBY() {
  // tem1 = "";
  var tems3 = Array();
  var tems3_i = 0;
  var tems3_i_1 = 0;
  for (var i = 0; i < names_max; i++) { // 计算左括号数
    if (names[i] == "(") {
      tems3_i_1++;
    }
    if (names[i] == ")") {
      tems3_i_1--;
    }
  }
  if (tems3_i_1 >= 0) {
    for (var i = 0; i < names_max; i++) { // 补足左括号数
      tems3[tems3_i++] = names[i];
    }
    for (var i = 0; i < tems3_i_1; i++) {
      tems3[tems3_i++] = ")";
    }
  } else {
    for (var i = 0; i > tems3_i_1; i--) { // 补足右括号数
      tems3[tems3_i++] = "(";
    }
    for (var i = 0; i < names_max; i++) {
      tems3[tems3_i++] = names[i];
    }
  }
  names = tems3;
  names_max = tems3.length;
}

function setdengyu_guolv(temstr) {
  var by = true;
  for (var i = 0; i < temstr.length; i++) {
    if (!getfuhaoby(temstr.charAt(i))) {
      by = false;
      break;
    }
  }
  return by;
}

/**
 * 删除运算符
 */
function getdelete_yun(temname) {
  var strtem1 = "";
  for (var i = 0; i < temname.length; i++) {
    if (temname.charAt(i) != "(" && temname.charAt(i) != ")") {
      if (getfuhaoby(temname.charAt(i))) {
        strtem1 += temname.charAt(i);
      }
    }
  }
}


/** 等于：计算开始* */
function setdengyu() {
  if (names_max < 1) {
    return;
  }
  var temname = getnamestr();
  if (!setdengyu_guolv(temname)) {
    temname = getDATA(temname);
  }
  /** 开始运算* */
  return temname;
}

/** 把字符串一系列的数值与运算符把它计算成最后的结果* */
function getDATA(temname) {
  /** 把字符串数值化，规则化* */
  var temdata_s = setDATA(temname);

  /** 把包含数值，运算符的数组计算成最后的结果* */
  var dataname = getVal(temdata_s);
  return dataname;
}

/**
 * 把传入的字符串规则化，补足 右括号 并且还要把运算符与数值分隔保存到数组中
 */
function setDATA(temname) {

  var temdata_s = new Array();
  var temdata_s_i = 0;
  var temname1 = "";
  var temint = 0;
  var zuokh = 0;
  var youkh = 0;
  for (var i = 0; i < temname.length; i++) {
    var tem = "" + temname.charAt(i);
    /**
     * 如果遇见括号，得把括号开始到括号结束存为一个字符串，保存到数组中， 等进行括号计算是会使用递归
     */
    if (zuokh > 0) {
      if (tem != "(" && tem != ")") {
        temname1 += tem;
      }
    }
    if (tem == "(") {
      zuokh++;
      temname1 += tem;
      continue;
    } else if (tem == ")") {
      youkh++;
      temname1 += tem;
    }
    if (zuokh == youkh && youkh > 0) {
      temdata_s[temdata_s_i++] = temname1;
      temname1 = "";
      zuokh = 0;
      youkh = 0;
      continue;
    }
    if (zuokh > 0) {
      continue;
    }
    /** 这里表示它是一个数值* */
    if (tem == "." || getfuhaoby(tem)) {
      temname1 += tem;
      continue;
    }
    /** 把数值保存到数组中去* */
    if (temname1 != "") {
      /** 防止一个数值有多个点，分割成数组，如果数组长度大于2，表示有多个点* */
      var tem_dian = temname1.split(".");
      if (tem_dian.length > 2) {
        temname1 = tem_dian[0];
        temname1 += tem_dian[1];
      }
      temdata_s[temdata_s_i++] = temname1;
      temname1 = "";
    }
    /** 把运算符保存到数组中去* */
    if (!getfuhaoby(tem)) {
      temdata_s[temdata_s_i++] = tem;
      continue;
    }
  }

  /** 取最后一个字符串，我也不知道它可能是什么* */
  if (temname1 != "") {
    temdata_s[temdata_s_i++] = temname1;
    temname1 = "";
  }
  return temdata_s;
}

/**
 * 开始各级运算符进行运算，先高后底，最后返回结果
 */
function getVal(temdata_s) {
  var dataname = 0;
  /**
   * 当出现（）时需要递归运算出（）中的结果，然后赋值到当前 temdata_s[i]中
   */
  for (var i = 0; i < temdata_s.length; i++) {
    if (temdata_s[i].charAt(0) == "(") {
      var temstr = temdata_s[i];
      /**
       * 去掉一层括号
       */
      temstr = temstr.slice(1, temstr.length - 1);
      temdata_s[i] = getVal(setDATA(temstr));
    }
  }
  for (var i = 0; i < temdata_s.length; i++) {
    if (!getfuhaoby1(temdata_s[i])) {

      /**
       * 进行*，/,%运算
       */
      temdata_s = getVal_2(temdata_s);
      break;
    }
  }
  for (var i = 0; i < temdata_s.length; i++) {
    if (!getfuhaoby2(temdata_s[i])) {
      /**
       * 进行+，-运算
       */
      temdata_s = getVal_3(temdata_s);
      break;
    }
  }
  for (var i = 0; i < temdata_s.length; i++) {
    if (!getfuhaoby3(temdata_s[i])) {
      /**
       * 进行<<,>>运算
       */
      temdata_s = getVal_4(temdata_s);
      break;
    }
  }
  for (var i = 0; i < temdata_s.length; i++) {
    if (!getfuhaoby4(temdata_s[i])) {
      /**
       * 进行&运算
       */
      temdata_s = getVal_5(temdata_s);
      break;
    }
  }
  for (var i = 0; i < temdata_s.length; i++) {
    if (!getfuhaoby5(temdata_s[i])) {
      /**
       * 进行^运算
       */
      temdata_s = getVal_6(temdata_s);
      break;
    }
  }
  for (var i = 0; i < temdata_s.length; i++) {
    if (!getfuhaoby6(temdata_s[i])) {
      /**
       * 进行|运算
       */
      temdata_s = getVal_7(temdata_s);
      break;
    }
  }

  /**
   * 运算结束后数组长度为1，最后返回
   */
  dataname = temdata_s[0];
  return dataname;
}


/**
 * 把字符串数组进行位运算， 每一个temdata_s[i]可能是需要计算的值 也可能是计算的运算符， getVal_4（）只进行位运算。
 * 
 * 因为运算符有不同的优先级，所以的从高到低一级一级的运算
 */
function getVal_2(temdata_s) {
  var tems = new Array();
  var tems_i = 0;
  var temyun = "";
  var temdata = null;
  for (var i = 0; i < temdata_s.length; i++) {
    var temi = temdata_s[i];
    if (i == 0) {
      if (temi == "-") {
        i++;
        temi += temdata_s[i];
      }

      temdata = parseFloat(temi);
      continue;
    }
    if (getfuhaoby(temi)) {
      if (!getfuhaoby1(temyun)) {
        if (temyun == "*") {
          temdata *= parseFloat(temi);
        } else if (temyun == "/") {
          temdata /= parseFloat(temi);
        } else if (temyun == "%") {
          temdata %= parseFloat(temi);
        }
        temyun = "";
      } else {
        temdata = parseFloat(temi);
      }
    } else {
      temyun = temi;
      if (getfuhaoby1(temyun)) {
        tems[tems_i++] = temdata;
        tems[tems_i++] = temyun;
        temyun = "";
      }
    }
  }
  tems[tems_i++] = temdata;
  return tems;
}

function getVal_3(temdata_s) {
  var tems = new Array();
  var tems_i = 0;
  var tem1 = null;
  var temyun = "";
  var temdata = null;
  for (var i = 0; i < temdata_s.length; i++) {
    var temi = temdata_s[i];
    if (i == 0) {
      if (temi == "-") {
        i++;
        temi += temdata_s[i];
      }
      temdata = parseFloat(temi);
      continue;
    }
    if (getfuhaoby(temi)) {
      if (!getfuhaoby2(temyun)) {
        if (temyun == "+") {
          temdata += parseFloat(temi);
        } else if (temyun == "-") {
          temdata -= parseFloat(temi);
        }
        temyun = "";
      } else {
        temdata = parseFloat(temi);
      }
    } else {
      temyun = temi;
      if (getfuhaoby2(temyun)) {
        tems[tems_i++] = temdata;
        tems[tems_i++] = temyun;
        temyun = "";
      }
    }
  }
  tems[tems_i++] = temdata;
  return tems;
}


function getVal_4(temdata_s) {
  /**
   * 运算方法大致一样，只是运算符不一样，后面的就不详细介绍
   */
  var tems = new Array();
  var tems_i = 0;
  var tem1 = null;
  var temyun = "";
  /** 临时运算符 */
  var temdata = null;
  for (var i = 0; i < temdata_s.length; i++) {
    var temi = temdata_s[i];
    if (i == 0) { // 处理第一个数
      /**
       * 这个地方是处理负数的，因为减号的关系，它一定是第一个
       */
      if (temi == "-") {
        i++;
        temi += temdata_s[i];
      }
      temdata = parseFloat(temi);
      /** JS自带方法，把字符串转换为float */
      continue;
      /** 结束本次循环 */
    }
    if (getfuhaoby(temi)) {
      /** *判断这个字符串是不是运算符，不是运算符返回true */
      /**
       * 判断运算符和数值是否被写出
       */
      if (!getfuhaoby3(temyun)) {
        if (temyun == "<") {
          temdata <<= parseFloat(temi);
        } else if (temyun == ">") {
          temdata >>= parseFloat(temi);
        }
      } else {
        /**
         * 当运算符和数值被写入临时数组中时就需要重新赋值
         */
        temdata = parseFloat(temi);
      }
      temyun = "";
    } else {
      temyun = temi;
      /**
       * 判断临时运算符的优先级，有可能低于当前方法的优先级，就不需要运算 把数值和运算符写到临时数组中=
       */
      if (getfuhaoby3(temyun)) {
        tems[tems_i++] = temdata;
        tems[tems_i++] = temyun;
        temyun = "";
      }
    }
  }
  /**
   * 保存最后一个数值
   */
  tems[tems_i++] = temdata;
  return tems;
}

function getVal_5(temdata_s) {
  var tems = new Array();
  var tems_i = 0;
  var tem1 = null;
  var temyun = "";
  var temdata = null;
  for (var i = 0; i < temdata_s.length; i++) {
    var temi = temdata_s[i];
    if (i == 0) {
      if (temi == "-") {
        i++;
        temi += temdata_s[i];
      }
      temdata = parseFloat(temi);
      continue;
    }
    if (getfuhaoby(temi)) {
      if (!getfuhaoby4(temyun)) {
        if (temyun == "&") {
          temdata = temdata & (parseFloat(temi));
        }
        temyun = "";
      } else {
        temdata = parseFloat(temi);
      }
    } else {
      temyun = temi;
      if (getfuhaoby4(temyun)) {
        tems[tems_i++] = temdata;
        tems[tems_i++] = temyun;
        temyun = "";
      }
    }
  }
  tems[tems_i++] = temdata;
  return tems;
}

function getVal_6(temdata_s) {
  var tems = new Array();
  var tems_i = 0;
  var tem1 = null;
  var temyun = "";
  var temdata = null;
  for (var i = 0; i < temdata_s.length; i++) {
    var temi = temdata_s[i];
    if (i == 0) {
      if (temi == "-") {
        i++;
        temi += temdata_s[i];
      }
      temdata = parseFloat(temi);
      continue;
    }
    if (getfuhaoby(temi)) {
      if (!getfuhaoby5(temyun)) {
        if (temyun == "^") {
          temdata = temdata ^ (parseFloat(temi));
        }
        temyun = "";
      } else {
        temdata = parseFloat(temi);
      }
    } else {
      temyun = temi;
      if (getfuhaoby5(temyun)) {
        tems[tems_i++] = temdata;
        tems[tems_i++] = temyun;
        temyun = "";
      }
    }
  }
  tems[tems_i++] = temdata;
  return tems;
}

function getVal_7(temdata_s) {
  var tems = new Array();
  var tems_i = 0;
  var tem1 = null;
  var temyun = "";
  var temdata = null;
  for (var i = 0; i < temdata_s.length; i++) {
    var temi = temdata_s[i];
    if (i == 0) {
      if (temi == "-") {
        i++;
        temi += temdata_s[i];
      }
      temdata = parseFloat(temi);
      continue;
    }
    if (getfuhaoby(temi)) {
      if (!getfuhaoby6(temyun)) {
        if (temyun == "|") {
          temdata = temdata | (parseFloat(temi));
        }
        temyun = "";
      } else {
        temdata = parseFloat(temi);
      }
    } else {
      temyun = temi;
      if (getfuhaoby6(temyun)) {
        tems[tems_i++] = temdata;
        tems[tems_i++] = temyun;
        temyun = "";
      }
    }
  }
  for (var i = 0; i < tems.length; i++) {
    alert(tems[i]);
  }
  tems[tems_i++] = temdata;
  return tems;
}

/** 当按下等于按钮计算完成时调用* */
function setdelesetN(str) {
  setdele();
  set_shu_N(str);
}

/**
 * 判断字符串是否符合规则
 * 
 * @param name
 *            字符串
 * @param matches
 *            正则表达式
 * 
 * @return
 */
function getTest(name, matches) {
  return matches.test(name);
}