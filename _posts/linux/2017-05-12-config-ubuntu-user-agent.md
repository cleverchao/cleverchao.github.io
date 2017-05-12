---
title: config ubuntu user-agent
excerpt: 配置Ubuntu的user-agent
categories: linux
  - topics
author: zhengjiachao
#date/lastupdated are optional
#date: 2017-05-12 11:34:19
#lastupdated: 2017-05-12 11:34:19
---



这几天在公司安装Ubuntu， 然后使用apt的时候，死活就是不能正确连接服务器。 报错的地址使用浏览器都可以访问的到， 最后发现应该是公司的路由屏蔽了不带User-Agent的http请求，所以解决办法如下：

修改/etc/apt/apt.conf文件，增加如下一行：

```
Acquire::http::User-Agent "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
```

