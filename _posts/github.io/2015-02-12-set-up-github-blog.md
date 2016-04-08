---
title: Set up github page on github.io
categories: topics github.io
excerpt: github pages series
tags: [github.io, github主页]
author: zhengjiachao
---

github可以创建两种页面，一种是个人主页，另一种是项目页面。具体步骤官方有很具体的[说明](https://pages.github.com/)。下面是一些主要步骤。

## 个人主页

github可以创建一个个人主页，主页的访问路径是username.github.io

*	个人主页需要创建一个新的git库，名称是username.github.io
*	把需要展示的页面上传到此库的master分支
 
## 项目主页

github可以为每一个项目单独创建项目的主页，用来描述项目相关的信息，项目主页的访问路径是username.github.io/project-name。具体步骤如下：

*	在项目的代码库上创建gh-pages分支
*	上传代码到此分支

## 代码选择

创建界面时有三种类型可以选择，不同类型有不同的工具生成代码，相同的是，生成代码之后按照上面讲的步骤把代码上传到对应位置即可。

*	进入项目的settings界面，通过automatic page generator来一步一步创建界面
*	直接上传html
*	[使用jekyll创建blog](/blog/2015/02/27/build-blog-with-jekyll/)