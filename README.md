# 项目名称<br>
精致计算器<br>
## 贡献者<br>
* 翁昊凡  罗怡沁<br>
* 小队名称：我不要做根管治疗队<br>
## 上手指南<br>
以下指南将帮助你在本地机器上安装和运行该项目，进行相关开发和测试，并获得一次愉快的微信小程序体验。<br>
### 安装要求及步骤<br>
* 安装微信开发者工具（[点击此处可进入官方下载页面](https://mp.weixin.qq.com/)）<br>
* 手机端使用微信（方便扫码进行实际操作体验）<br>
* 具体安装步骤请参见上述微信官方页面<br>
## 功能概述<br>
本项目为实现了多功能的综合计算器，适用对象为精致or想变精致的猪猪女孩，主要功能如下：<br>
1. 基础计算器功能：实现了加减乘除四则混合运算、取余运算、进制换算以及逻辑位运算；<br>
2. 精致功能：包括账单统计和化妆品单位价格计算。<br>
## 小程序详情展示（UI+代码）<br>
### 1. 首页
![image](https://github.com/WHF666/-/blob/master/1.jpg)<br>
 点击“开启精致之旅”可进入下一页面。<br>
 本页面实现代码为pages/welcome。<br>
### 2. choice1页面
![image](https://github.com/WHF666/-/blob/master/choice1.jpg)<br>
* 本页面共两个选择button。点击“变精致前先学个习”button后可进入基础计算器功能页面，点击“无心学习只想精致”button则可进入精致功能选择页面。<br>
* 同时页面下方设置了不同页面间切换的tabBar，供用户较为熟悉本小程序页面跳转、功能分布后，可以快速进入自己想选择的页面。tabBar中共五个选项可供选择，从左到右为choice1、counter、choice2、account、cosmetic，依次代表choice1页面、基础计算器页面、choice2页面、账单功能页面和化妆品单位价格换算页面。<br>
* 当用户选择某页面跳转后，该页面在tabBar中的图标会变为地图定位形状，同时下方名字会变为绿色。
本页面实现代码为pages/post。<br>
### 3. 基础计算器页面
![image](https://github.com/WHF666/-/blob/master/counter.jpg)<br>
* 新运算开始前先按“清空”。<br>
* 进行进制换算时先点击“进制”，出现的白色按钮区从左到右依次为：被转换进制数、目标进制数、结果用何种进制表示、转换命令。该区域输入时先点击“X”按钮表示清空，再进行输入。<br>
* 每次的计算式都会保留在屏幕上。<br>
该页面实现代码为pages/index和pages/dist。<br>
### 4. choice2页面<br>
![image](https://github.com/WHF666/-/blob/master/choice2.jpg)<br>
本页面共两个选择button。点击后分别进入账单统计功能和化妆品单位价格计算功能。<br>
实现代码为pages/beauty。<br>
### 5. 账单统计页面<br>
![image](https://github.com/WHF666/counter/blob/master/account2.jpg)<br>
* 分别输入账目名称和消费数额后，点击“记一笔”，该条目将显示在下方。<br>
* 当某记录输入有误或要进行修改时，可点击该条目右侧的“删除”，再重新填写。<br>
实现代码为pages/account。<br>
### 6. 化妆品单位价格计算页面<br>
![image](https://github.com/WHF666/counter/blob/master/cosmetic2.jpg)<br>
分别输入待比较的两种商品的质量（单位要相同）、价格，再选择各自货币单位，输入完成后点击“对比”button，下方将显示比较结果。<br>
该页面实现代码为pages/cosmetic。<br>
<br>
至此本小程序全部功能及页面展示完毕。<br>

