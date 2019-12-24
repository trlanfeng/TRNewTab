# TRNewTab
# 幻蓝新标签页

幻蓝新标签页，用于替换谷歌浏览器中的默认新标签页，支持自定义搜索、防止搜索劫持。

简单、易用的快速拨号，支持排序、必应壁纸、高斯模糊、自定义网络壁纸、自定义本地壁纸、自定义搜索引擎。

功能列表：
1. 快速添加当前页面到快速拨号
2. 快速拨号支持拖拽排序
3. 自定义搜索引擎，默认无劫持百度
4. 快速拨号背景默认为必应壁纸，每日轮换
5. 支持设置背景模糊程度
6. 支持隐藏搜索引擎
7. 支持自定义网络壁纸
8. 支持自定义本地文件壁纸

## 下载地址

* [Chrome商店扩展地址](https://chrome.google.com/webstore/detail/%E5%B9%BB%E8%93%9D%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/eomaebekeoblgkldpodljjlpodfinmbd?hl=zh-CN)

* 最新版本CRX（不再更新，可自行打包）

## 安装方法

将crx文件保存到本地后，打开chrome的扩展程序页面，将crx拖入安装。直接通过链接安装的话，会检测来源，非chrome.google.com/webstore官方商店来源的都装不了。

## 未来目标

* [x] 右键快速添加到快速拨号

* [x] 插件图标菜单中增加快速添加到快速拨号

* [x] 增加拖拽排序

* [x] 黑暗模式

* [x] 增加自定义背景图片

* [x] 增加自定义搜索引擎

* [x] 导出 / 导入

* [ ] 增加Google和Bing搜索，并可设置默认

* [ ] 增加不同搜索引擎的快速搜索

* [ ] 备份

## 更新记录

### 2.2.4 - 2019.12.24

1. 支持浏览器的黑暗模式

### 2.2.3 - 2019.12.23

1. 去掉为了兼容360而增加的 manifest 的内容

### 2.2.2 - 2019.12.23

1. 增加数据读取跟踪，尝试解决 chrome 某些情况下丢失扩展数据问题

### 2.2.1 - 2019.12.19

1. 网站图标使用七牛CDN

### 2.2.0 - 2019.12.18

1. 网站图标使用新的API（Favicon Kit）获取
2. 增加本地备份，防止同步数据因意外情况丢失

### 2.1.7 - 2019.05.31

1. 修复排序后网站图标异常的问题

### 2.1.5 - 2019.05.22

1. 修复大量重构后设置页面的BUG

### 2.1.1 - 2019.05.19

1. 组件重构，代码优化

### 2.0.2 - 2018.10.16

1. 增加网页上的右键菜单，方便添加到新标签页。

2. 编辑模式下的样式调整。现在在编辑模式下也显示图标了，方便准确找到要拖动的快速拨号。

### 2.0.0 - 2018.09.30

#### 基于Vue重写，使用Parcel打包

1. 管理模式下增加拖拽排序功能

2. 增加背景图片的模糊设置

3. 去掉无效的第三方Bing地址服务


### 1.1.9 - 2018.03.18

1. 优化bootstrap4下的布局

2. 增加搜索设置，可自定义搜索 

3. 增加背景设置，可选择第三方必应图片、必应官方图片、网络图片、本地图片四种 

4. 部分代码优化

### 1.1.8 - 2018.03.17

1. 增加任意网页打开后，点击插件图标，立即添加到快速拨号

2. 修正一个可能导致同步数据消失的问题

3. 增加第三方必应壁纸接口，必应官方地址无法缓存

### 1.1.7 - 2018.03.14

1. 更换必应壁纸接口

### 1.1.4 - 2017.11.01

1. 修复百度更改ICON后导致显示异常的问题

2. 修复搜索栏搜索 # 符号时不会编码导致搜索不正确的问题

### 1.1.3 - 2017.07.26

1. 修复每次都会重新请求壁纸的问题

### 1.1.2 - 2017.07.24

1. 搜索框加入回车搜索

### 1.1.1 - 2017.07.24

1. 优化必应壁纸加载逻辑，利用浏览器缓存避免每次重新加载

2. 删除插件中无用资源，精简体积

### 1.1.0 - 2017.07.23

1. 加入必应壁纸

2. 加入搜索，暂时默认百度HTTPS，无劫持

3. 略微调整样式

### 1.0.2 - 2016.08.13

1. 增加添加时的URL验证，暂时去掉未完成的搜索框，优化删除机制

### 1.0.1 - 2016.08.12

1. 优化同步功能，减少出错

### 1.0.0 - 2016.08.12

1. 第一版，可添加、删除快速拨号，支持Chrome浏览器的同步功能。
