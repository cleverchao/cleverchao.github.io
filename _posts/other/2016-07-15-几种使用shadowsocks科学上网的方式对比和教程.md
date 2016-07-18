---
title: 几种使用shadowsocks科学上网的方式对比和教程
excerpt: 
tags: featured
permalink: /topics/shadowsocks/
categories:
  - topics
  - shadowsocks
author: zhengjiachao
#date/lastupdated are optional
#date: 2016-07-15 16:24:55
#lastupdated: 2016-07-15 16:24:55
---


Shadowsocks是一种不同于vpn的科学上网方式，需要下载shadowsocks客户端和一个在GFW外的服务端来完成科学上网。

## 客户端 ##

不同的平台下都有对应的shadowsocks客户端，对应的去下载安装就可以了，找不到的可以到[https://blog.ss-link.com/dl/](https://blog.ss-link.com/dl/)这里下载一下，因为我的服务端买了他们家的，所以就贴上他们家的网址吧。
客户端安装好之后，不同平台都是大同小异的，重要的一般有下面几个地方：

1. 服务器配置

> 服务器ip： 配置服务器的ip地址
> 服务器端口：配置服务器的端口
> 密码：服务器的密码

这三个信息在服务器购买或者配置完毕之后就可以得到，现在没有不用着急。

2. 代理模式

> pac模式： pac模式根据一个pac列表来决定访问哪些网站的时候需要使用shadowsocks来代理，如果发现有些网站不能上的话，可能是pac列表陈旧了，更新pac列表或者切换到全局模式即可
> 全局模式： 顾名思义就是所有的网络都是用shadowsocks来代理


## 服务端 ##

shadowsocks最重要的地方在服务端，服务端的好坏直接决定了科学上网的速度和质量。
服务端的原理实际上很简单，就是在一个GFW外面的主机上安装shadowsocks软件，然后客户端通过连接到这个主机上的shadowsocks软件来达到科学上网的目的。
所以既然原理清楚了，那下面的问题就很显而易见了，这个安装shadowsocks的软件的主机要么是别人搭好了，然后卖账号给你，你直接使用这个服务器去科学上网，还有一个就是自己动手搭建服务器。

### 购买账号 ###

购买账号相对来说比较方便快捷，价格也相对低廉，以上面给出的[http://www.ss-link.com/](http://www.ss-link.com/)为例，购买一个帐号一个月只需要7元钱RMB，购买之后，就可以得到上面客户端里面需要的信息，然后填上信息就可以上网了。

当然天下不会有那么好的事情，又便宜又方便网速又快，购买账号最大的好处就是方便，便宜，如果对速度没有什么需求的话，查查网页是可以的，但是如果想看youtube的话，如果赶上用的人多的时候，就一定是卡成悲剧的。
另一个问题就是安全行，使用别人搭的服务器，他在中间干了什么事情，监听了什么信息，你可是不知道的。

### 自己搭建主机 ###

稍微有点要求的话，一定要自己搭建主机，虽然稍微麻烦一点，但是一旦搭建成功，安全性和速度上比购买账号而言不知好了多少倍。
搭建主机的话其实也并不麻烦，一般就是以下几步：
1. 购买一个虚拟主机
2. 安装shadowsocks软件
3. 配置shadowsocks软件

虚拟主机有很多选择，一般最多选择的是[https://bandwagonhost.com](https://bandwagonhost.com "搬瓦工")，我自己也是用的这个，所以这里就讲解搬瓦工的用法，其他主机的话比较昂贵，我也没有试，网上也有其他的教程。

1. 首先打开[https://bandwagonhost.com](https://bandwagonhost.com)网站
2. 选择需要购买的vps
3. 我买的就是最便宜的2.99美元一个月的套餐，这个套餐点进去可以选年付，19.99美元，一百多人民币，价格还是很公道的（在加入购物车的时候可以输入优惠码，目前这个优惠码优惠力度最大了： IAMSMART52J3NC，如果不可用的话，就到网上再找找）
4. 支付的时候可以选支付宝，然后支付即可（为了科学上网，人家也是拼了啊，专门支持了支付宝）
5. 支付完成后，点击主页面里面的client area按钮，然后进到页面后点击services->my services 即可看到自己的vps了
6. 点击kiviVMControlPanel进入管理界面
7. 界面最左下有一个“Shadowsocks Server”，点击它
8. 第一次进入的话，应该是一个安装界面，点击安装，等待安装完成即可
9. 安装完成之后，就会显示出我们搭建的shadowsocks服务的信息了，包含端口和密码
10. 再点击左边的main control即可看到我们的vps的ip地址，这样我们需要的信息就全了，在客户端填写好这些信息，就可以科学上网了。
11. 虽然现在可以科学上网了，但是网速还有点不是很快，我们再配置一下加速器。
12. 我是跟这里学习的 [http://banwagongvpn.lofter.com/post/1d541acc_7b4bfc0](http://banwagongvpn.lofter.com/post/1d541acc_7b4bfc0)
13. 用ssh登录vps
14. 下载加速器： wget https://coding.net/u/njzhenghao/p/download/git/raw/master/net_speeder-installer.sh
15. 编译安装： bash net_speeder-installer.sh
16. 开启加速： nohup /usr/local/net_speeder/net_speeder venet0 "ip" >/dev/null 2>&1 &
17. 这样就应该可以了。亲测看youtube非常快。