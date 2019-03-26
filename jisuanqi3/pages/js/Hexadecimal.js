// JavaScript Document
/**
 * Hexadecimal()		初始化工作，必须
 * test()				测试
 *
 ****************************************************
 * 
 *
 * @param name
 *            N进制表示信息<br>
 *            xxxnxnxnn（没有进制位，最大62进制Aa0）或者<br>
 *            xn-xn-xx-nn（每一位使用其它进制表示， <br>
 *            比如256进制可以使用两个16进制表示一位（xx-xx-xx））
 * @param nameSplit 分隔的字符
 *
 * @param now
 *            现在的进制
 * getNto10()			N进制转10进制
 * 
 ****************************************************
 * @param name
 *            N进制表示信息<br>
 *            xxxnxnxnn（没有进制位，最大62进制Aa0）或者<br>
 *            xn-xn-xx-nn（每一位使用其它进制表示， <br>
 *            比如256进制可以使用两个16进制表示一位（xx-xx-xx））
 * @param nameSplit 分隔的字符
 *
 * @param now
 *            现在的进制
 * @param pos
 *            进制位是多少进制表示，最大62(pos<2默认62)
 * getNto10_0()			N进制转10进制
 *
 ****************************************************
 * @param name 数据
 * @param get N进制
 * @param pos 进制位表示
 * get10ToN()			10进制转N进制
 *
 ****************************************************
 *
 * 10进制转N进制
 * @param name 数据
 * @param get N进制
 * @param pos 进制位表示
 * @param nameSplit 分隔符，空则不使用
 * @param isReverse 字符串是否倒序
 * get10ToN_10()		10进制转N进制
 *
 ****************************************************
 * 
 */
module.exports.get10ToN = get10ToN; // 10进制转N进制
module.exports.get10ToN_10 = get10ToN_10; // 10进制转N进制
module.exports.getSpecial = getSpecial; // 判断字符串是否符合K进制要求
module.exports.getNto10_0 = getNto10_0; // N进制转10进制
module.exports.getNto10 = getNto10; // N进制转10进制
module.exports.test = test; // 测试
module.exports.Hexadecimal = Hexadecimal; // 构造函数，接口测试
module.exports.getAil = getAil; // 进制转换接口
module.exports.getSpecial = getSpecial; // 判断字符串是否符合K进制要求
module.exports.getSpecial_0 = getSpecial_0; // 判断字符串是否符合K进制要求加上分隔符：-

module.exports.getNoSpecial_index_0 = getNoSpecial_index_0; // 找到不符合进制要求的字符
/**
 * 进制转换接口,N>M
 * @param  name 			字符串
 * @param  qian_i			现进制
 * @param  hou_i 			需要进制
 * @param  wei_i			位进制
 * @param  textObj  		错误回调
 */
function getAil(name, qian_i, hou_i, wei_i, textObj) {
  var text;
  if (hou_i == 10) {
    text = getNto10(name, qian_i, wei_i, textObj); //N进制转10进制
    var i = lon(tem1, 10);
    if (i > 15) {
      if (i > 40) {
        textObj.set("不要再转了，马上就要爆了。。。爆掉了");
      } else {
        textObj.set("不要再转了，要爆了");
      }
    }
  } else if (qian_i == 10) {
    var i = lon(tem1, 10);
    if (i > 15) {
      if (i > 40) {
        textObj.set("不要再转了，马上就要爆了。。。爆掉了");
      } else {
        textObj.set("不要再转了，要爆了");
      }
    }
    text = get10ToN(name, hou_i, wei_i, textObj); //10进制转N进制"
  } else {
    var tem1 = getNto10(name, qian_i, wei_i, textObj); //N进制转10进制
    var i = lon(tem1, 10);
    if (i > 15) {
      if (i > 40) {
        textObj.set("不要再转了，马上就要爆了。。。爆掉了");
      } else {
        textObj.set("不要再转了，要爆了");
      }
    }
    text = get10ToN(tem1, hou_i, wei_i, textObj); //10进制转N进制"
  }
  return text;
}

/**
 * 进制转换 <br>
 * 可以是绝对任意进制，，如果进制大于62进制，则必须使用其它进制表示一位， <br>
 * 比如256进制可以使用两个16进制表示一位（xx-xx-xx） <br>
 * 62进制中（Z~A：61~36；z~a：35~10；9~0）
 * 
 * @author Administrator
 * 
 */

/**
 * 62进制
 */
var bdm62 = [62];
/**
 * 一个62个字符，方便查询，0~9a~zA~Z <br>
 * 对应62进制
 */
var bdm62Str = "";
/**
 * 构造函数，接口测试
 */
function Hexadecimal() {
  for (var i = 0; i <= 9; i++) { /* 0~9 */
    bdm62[i] = String.fromCharCode((i + 48));
  }
  for (var i = 0; i < 26; i++) { /* a~z */
    bdm62[i + 10] = String.fromCharCode((i + 97));
  }
  for (var i = 0; i < 26; i++) { /* A~Z */
    bdm62[i + 36] = String.fromCharCode((i + 65));
  }
  for (var i = 0; i < bdm62.length; i++) {
    bdm62Str += bdm62[i];
  }
}

/**
 * 测试
 */
function test() {
  console.log('哈哈哈哈哈哈。。。。。');
  var tem = getNoSpecial_index_0("079-375afg6-756a", 10);
  if (tem != null) {
    console.log(tem[0]);
    console.log(tem.index);
  }
  return;
  /**
   * 现进制或者需要进制
   */
  var get = 32;
  /**
   * 进制位表示进制
   */
  var pos = 0;
  /**
   * 幂运算
   */
  var pow = Math.pow(255, 13);
  setval(pow, get, pos, "-");
}
/**
 * 判断字符串是否符合K进制要求
 * 
 * @param name	字符串
 * @param k		进制
 * @return		是否符合进制要求
 */
function getSpecial(name, k) {
  var substring = bdm62Str.substring(0, k);
  var matches = RegExp("^[" + substring + "]*$");
  return getSpecial0(name, matches);
}
/**
 * 判断字符串是否符合K进制要求加上分隔符：-
 * 
 * @param name	字符串
 * @param k		进制
 * @return		是否符合进制要求
 */
function getSpecial_0(name, k) {
  var substring = bdm62Str.substring(0, k);
  var matches = RegExp("^[" + substring + "-]*$");
  return getSpecial0(name, matches);
}

/**
 * 找到不符合进制要求的字符
 */
function getNoSpecial_index_0(name, k) {
  var substring = bdm62Str.substring(0, k);
  var matches = RegExp("[^" + substring + "-]");
  return matches.exec(name);
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
function getSpecial0(name, matches) {
  return matches.test(name);
}

function setbtn1() {
  var pow = document.getElementById("text1").value;
  var get = document.getElementById("va1").value;
  var pos = document.getElementById("va2").value;
  var sip = document.getElementById("va3").value;
  setval(pow, get, pos, sip);
}

function setbtn2() {
  var pow = document.getElementById("text2").value;
  var get = document.getElementById("va4").value;
  var pos = document.getElementById("va5").value;
  var st1 = document.getElementById("va6").value;
  if (pow < 2) {
    return;
  }
  if (get < 2) {
    get = 16;
  }
  if (st1 == null | st1 == "") {
    sip = "-";
  }
  document.getElementById("a4").innerHTML = pow;
  /**
   * N进制转10进制的反向操作
   */
  var nto10 = getNto10_0(pow, st1, get, pos);
  /**
   * 输出N进制转10进制的最后结果
   */
  document.getElementById("a5").innerHTML = nto10;
}

function setval(pow, get, pos, sip) {
  if (pow < 2) {
    return;
  }
  if (get < 2) {
    get = 16;
  }
  if (sip == null | sip == "") {
    sip = "-";
  }

  var get10ToN = "";
  /**
   * double不以科学计数法输出
   */
  console.log(pow);
  /**
   * 10进制转N进制
   */
  get10ToN = get10ToN_10(pow, get, pos, sip, true);
  /**
   * 输出10进制转N进制的最后字符串
   */
  console.log(get10ToN);
  /**
   * N进制转10进制的反向操作
   */
  var nto10 = getNto10_0(get10ToN, sip, get, pos);
  /**
   * 输出N进制转10进制的最后结果
   */
  console.log(nto10);
}

/**
 * N进制转10进制
 *
 * @param name
 *            N进制表示信息<br>
 *            xxxnxnxnn（没有进制位，最大62进制Aa0）或者<br>
 *            xn-xn-xx-nn（每一位使用其它进制表示， <br>
 *            比如256进制可以使用两个16进制表示一位（xx-xx-xx））
 * @param now
 *            现在的进制
 * @param pos
 *            进制位是多少进制表示，最大62(pos<2默认62)
 * @param textObj
 *            回调
 * 
 */
function getNto10(name, now, pos, textObj) {
  return getNto10_0(name, "-", now, pos, textObj);
}
/**
 * N进制转10进制
 * 
 * @param name
 *            N进制表示信息<br>
 *            xxxnxnxnn（没有进制位，最大62进制Aa0）或者<br>
 *            xn-xn-xx-nn（每一位使用其它进制表示， <br>
 *            比如256进制可以使用两个16进制表示一位（xx-xx-xx））
 * @param nameSplit 分隔的字符
 * 
 * @param now
 *            现在的进制
 * @param pos
 *            进制位是多少进制表示，最大62(pos<2默认62)
 * @param textObj
 *            回调
 * @return
 */
function getNto10_0(name, nameSplit, now, pos, textObj) {
  /**
   * 判断最大位进制表示
   */
  if (pos > 62) {
    pos = 62;
  } else if (pos < 2) {
    pos = 62;
  }
  /**
   * 最后的计算的结果
   */
  var m = 0;
  /**
   * 如果现进制大于位进制
   */
  if (now > pos) {
    /**
     * 位进制的合理表示长度
     */
    var k = 0;
    /**
     * 使用对数计算最佳长度
     * 例如256进制使用16进制表示，最多需要2位16进制表示一位
     * 它们之间存在对数关系
     */
    var lontem = lon(now, pos);
    k = lon;
    /**
     * 如果存在小数
     */
    if (lontem > k) {
      k++;
    }
    /**
     * 数组，把每阶的数转换成位进制后保存到数组中，然后再次进行阶运算
     */
    var arrayList = new Array();
    var arrayList_i = 0;

    /**
     * 如果使用了分隔符
     */
    if (name.indexOf(nameSplit) > 0 || name.length < k) {
      var split = name.split(nameSplit);
      /**
       * 先计算每组的10进制数
       */
      for (var i = 0; i < split.length; i++) {
        /**
         * 如果这一组长度不符合，则退出计算，返回错误提示
         */
        if (split[i].length > k) {
          textObj.err(name + "\t(" + split[i] +
            ")格式错误，长度应为：" + k);
        }
        /**
         * 递归调用，返回这一组的10进制数
         */
        var setHdl10 = getNto10_0(split[i], nameSplit, pos, 0, textObj);
        /**
         * 保持到数组
         */
        arrayList[arrayList_i++] = (setHdl10);
      }
    } else {
      /**
       * 没有使用分隔符，长度必须符合
       */
      var i = 0;
      while (true) {
        /**
         * 字符串截取，每次截取k个
         */
        if (name.length > (i + 1) * k) {
          var substring = name.substring(i * k, (i + 1) * k);
          var setHdl10 = getNto10(substring, nameSplit, pos, textObj);
          arrayList[arrayList_i++] = (setHdl10);
        } else {
          /**
           * 如果正好等于或者小于
           */
          var substring = name.substring(i * k, name.length);
          var setHdl10 = getNto10(substring, nameSplit, pos, textObj);
          arrayList[arrayList_i++] = (setHdl10);
          break;
        }
        i++;
      }
    }
    /**
     * 再把每组的10进制数据再做阶级计算
     * 例：34567
     * 7+0
     * 7+0+6*10
     * 7+0+6*10+5*100
     * 7+0+6*10+5*100+4*1000
     * 7+0+6*10+5*100+4*1000+3*10000=34567
     */
    var length = arrayList.length - 1;
    for (var i = length; i >= 0; i--) {
      var double1 = arrayList[i];
      /**
       * 幂运算
       */
      var pow = Math.pow(now, length - i);
      m += double1 * pow;
    }
  } else {
    /**
     * 先判断字符串是否符合当前进制规则
     * 10进制：0~9
     * 16进制：0~9a~f
     */
    if (getSpecial(name, now)) {
      var length = name.length - 1;
      /**
       * 再阶级幂运算
       * 例16进制：adb467
       * 7+0
       * 7+0+6*16
       * 7+0+ 6*16+ 4*16*16
       * 7+0+ 6*16+ 4*16*16+ 11[b]*16*16*16
       * 7+0+ 6*16+ 4*16*16+ 11[b]*16*16*16+ 13[d]*16(4个)
       * ......
       */
      for (var i = length; i >= 0; i--) {
        /**
         * 获取当前为字符
         */
        var charAt = name.charAt(i);
        /**
         * 查找字符的位置，它的位置正好是它表示的数值
         */
        var indexOf = bdm62Str.indexOf(charAt);
        /**
         * 阶级幂运算
         */
        var pow = Math.pow(now, length - i);
        /**
         * 如果当前为为0，则不需要
         */
        if (indexOf > 0) {
          m += indexOf * pow;
        }
      }
    } else {
      textObj.err(name + "不符合" + now + "进制：" +
        bdm62Str.substring(0, now));
    }
  }
  return m;
}
/**
 * 10进制转N进制
 * @param name 数据
 * @param get N进制
 * @param pos 进制位表示
 * @param textObj 回调
 * @return
 * @throws Exception 
 */
function get10ToN(name, get, pos, textObj) {
  return get10ToN_10(name, get, pos, "-", true, textObj);
}
/**
 * 10进制转N进制
 * @param name 数据
 * @param get N进制
 * @param pos 进制位表示
 * @param nameSplit 分隔符，空则不使用
 * @param isReverse 字符串是否倒序
 * @param textObj 回调
 * @return
 * @throws Exception 
 */
function get10ToN_10(name, get, pos, nameSplit, isReverse, textObj) {

  var split = nameSplit == null || nameSplit == "";
  if (get > pos && split) {
    textObj.set("必须使用分隔符");
  }
  if (name < 0) {
    name *= -1;
  }
  /**
   * 字符串累加
   */
  var stringBuilder = "";
  /**
   * 判断最大位进制表示
   */
  if (pos > 62) {
    pos = 62;
  } else if (pos < 2) {
    pos = 62;
  }
  if (get > pos) {
    /**
     * 刚好是get进制的倍数
     */
    var d = lon(name, get);
    if (Math.round(d) == d) {
      for (var i = 0; i < d; i++) {
        stringBuilder += '0';
        stringBuilder += nameSplit;
      }
      stringBuilder += '1';
    } else {
      /**
       * 
       */
      while (name > 0) {
        /**
         * 
         */
        d = name % get;
        name -= d;
        if (d > 0) {
          /**
           * 递归调用，计算表示进制
           */
          var strTem = get10ToN_10(d, pos, pos, nameSplit, false, textObj);
          stringBuilder += strTem;
          /**
           * 后面还有数
           */
          if (name > 0) {
            stringBuilder += nameSplit;
          }
        } else {
          stringBuilder += '0';
          /**
           * 后面还有数
           */
          if (name > 0) {
            stringBuilder += nameSplit;
          }
        }
        name /= get;
      }
    }
  } else {
    /**
     * 刚好是get进制的倍数
     */
    var d = lon(name, get);
    /**
     * 取最近的整数比较
     */
    if (Math.round(d) == d) {
      for (var i = 0; i < d; i++) {
        stringBuilder += '0';
      }
      stringBuilder += '1';
    } else {
      /**
       * 
       * 不是进制的倍数
       */
      while (name > 0) {
        /**
         * 例如时间毫秒值的计算：1000*60*60*10=10小时=3600000
         * 3600000%1000							3600000%1000微秒
         * (3600000-3600000%1000)/1000=3600		3600000%1000秒
         * (3600-3600%60)/60=600				3600%60分
         * (600-600%60)/60=10					小时
         */
        d = name % get;
        name -= d;
        stringBuilder += bdm62Str.charAt(d);
        name /= get;
      }
    }
  }
  if (isReverse) {
    /**
     * 倒序后，再返回最后的字符串，
     */
    var strtem = "";
    for (var i = stringBuilder.length - 1; i >= 0; i--) {
      strtem += stringBuilder.charAt(i);
    }
    return strtem;
  } else {
    return stringBuilder;
  }
}
/**
 * 换底公式
 * @param value	对数
 * @param base 底数
 * @return
 */
function lon(value, base) {
  return Math.log(value) / Math.log(base);
}