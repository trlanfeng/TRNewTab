# TRNewTab
# 幻蓝新标签页

幻蓝新标签页，用于替换谷歌浏览器中的默认新标签页，支持自定义搜索、防止搜索劫持。

免费、简洁、快速、易用、可同步、无广告。

## 2018.03.14致歉

如果你正在使用这个扩展，并且在2018.03.14更新了这个扩展，那么你之前添加的快速拨号会全部消失了，我对此表示万分抱歉。因为手贱使用了Google正在测试的新版Chrome插件提交后台，导致无法安装扩展，同时数据被清理。对于这个手贱操作，我再次表示万般抱歉。为了表示歉意，我会增加多个非常方便的功能。

## 目标

1.右键快速添加到快速拨号
2.插件图标菜单中增加快速添加到快速拨号
3.增加拖拽排序
4.增加自定义背景图片
5.增加Google和Bing搜索，并可设置默认
6.增加自定义搜索引擎
7.增加不同搜索引擎的快速搜索

## 开发缘由

厌倦了一大堆功能繁多、花里胡哨的新标签页，只想简简单单的有个像Opera一样的快速拨号。

厌倦了一大堆快速拨号里各种搜索劫持（在某些网络环境下会导致多次刷新），各种广告。

于是自己开发了一个简单、可同步的快速拨号插件。

本项目为开源项目，GIT地址：https://gitee.com/trlanfeng/TRNewTab

## 更新记录

### 1.1.7 - 2018.03.14
1.更换必应壁纸接口

### 1.1.4 - 2017.11.01
1.修复百度更改ICON后导致显示异常的问题
2.修复搜索栏搜索 # 符号时不会编码导致搜索不正确的问题

### 1.1.3 - 2017.07.26
修复每次都会重新请求壁纸的问题

### 1.1.2 - 2017.07.24
1.搜索框加入回车搜索

### 1.1.1 - 2017.07.24
1.优化必应壁纸加载逻辑，利用浏览器缓存避免每次重新加载
2.删除插件中无用资源，精简体积

### 1.1.0 - 2017.07.23
1.加入必应壁纸
2.加入搜索，暂时默认百度HTTPS，无劫持
3.略微调整样式

### 1.0.2 - 2016.08.13
增加添加时的URL验证，暂时去掉未完成的搜索框，优化删除机制

### 1.0.1 - 2016.08.12
优化同步功能，减少出错

### 1.0.0 - 2016.08.12
第一版，可添加、删除快速拨号，支持Chrome浏览器的同步功能。