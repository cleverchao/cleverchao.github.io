---
title: remote debug nodejs via node-inspector and chrome dev-tools
excerpt: 远程调试nodejs
categories:
  - topics
author: zhengjiachao
#date/lastupdated are optional
#date: 2016-05-26 15:02:17
#lastupdated: 2016-05-26 15:02:17
---

## 本机调试 ##

使用node-inspector本机调试nodejs非常简单

> 1. npm install -g node-inspector
> 2. node-debug app.js
> 3. 调试工具会自动弹出，如果没自动弹出，使用chrome访问步骤2输出的地址即可


## 远程调试 ##

远程调试的时候，需要node-inspector和 node进程在同一机器上，但是chrome浏览器可以在其他机器上进行远程调试
步骤如下：
> 1. npm install -g node-inspector
> 2. node-inspector -p 24680 //-p 是指定http的端口，默认为8080
> 3. node --debug-brk=12345 app.js //--debug-brk=12345指定断在第一行代码，然后这个调试端口是12345
> 4. 打开chrome，输入如下地址： http://node机器的地址:24680/?ws=node机器的地址:24680&port=12345 即可进行调试了

其中第二步运行之后，第三步可以在不同端口运行多个不同调试程序， 然后在第四步的地址指定不同的port即可

更多具体的参数可以参考 [https://github.com/node-inspector/node-inspector](https://github.com/node-inspector/node-inspector "node-inspector官网")