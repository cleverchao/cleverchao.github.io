---
title: set up IDE like vim on mac
excerpt: my expreriences to set up an IDE like vim development environment on my mac
tags: featured vim tmux
permalink: /topics/vim/
categories:
  - topics
  - vim
author: zhengjiachao
#date/lastupdated are optional
#date: 2016-08-12 14:58:05
#lastupdated: 2016-08-12 14:58:05
---

# 前言 #

本文是记录我自己在mac使用vim+tmux搭建IDE的过程。所以文中内容仅限于mac。

先上一张效果图，这个效果图里面大框是有的，很多东西也还没有配置完成，之后更新。
<img src="/images/tools/ide.png" alt="image" style="width: 100%;">


# 基本概念 #

1.vim 

vim是一个非常强大的编辑器，关于它本身就有太多东西要学习了，这里只是简单介绍在要搭建的IDE里面，它作为编辑器部分被使用。

2.tmux

tmux是一个控制台多窗口的工具，进入tmux之后，可以创建各种布局的窗口，然后在不同的窗口里面运行不同的shell。

3.dotfiles

在用户目录下，有很多点开头的文件，一般都是各个程序的配置文件，dotfiles就是把很多点开头的文件放到一个统一的文件夹中，然后链接到用户目录下，并且进行了很多默认配置，
也给用户留下了扩展接口，一般都是点文件后面加上.local的另外一个文件进行扩展。

## 搭建 ##

1.安装vim

```
#安装最新的vim
brew install vim
```

2.安装tmux

```
#安装最新的tmux
brew install tmux
```

3.安装dotfiles

按照[dotfiles](https://github.com/thoughtbot/dotfiles)的说明安装即可

    git clone git://github.com/thoughtbot/dotfiles.git ~/dotfiles
    brew tap thoughtbot/formulae
    brew install rcm
    env RCRC=$HOME/dotfiles/rcrc rcup

然后每次修改配置之后都执行`rcup`即可把新的配置更新进去。

4.配置vim

a.配置插件：新建 `.vimrc.bundles.local`文件，然后写入如下内容

```
Plug 'sickill/vim-monokai'
Plug 'stephenmckinney/vim-solarized-powerline'
Plug 'ChrisKempson/Tomorrow-Theme'
Plug 'scrooloose/nerdtree'
Plug 'mattn/emmet-vim'
Plug 'vim-scripts/Solarized'
Plug 'chriskempson/vim-tomorrow-theme'
```
里面安装了主题，文件树等插件，今后有别的插件也用这个形式写就可以，引号里面的是github上的用户/项目名。

b.配置vim特性

```
syntax enable
“设置t_Co后可以修复vim在tmux中没有主题的问题
set t_Co=256
colorscheme monokai 
set colorcolumn=180
```
这里配置了语法提示，颜色，主题等信息

现在在控制台执行`rcup`即可自动安装插件并使配置生效。
至此应该已经配置完毕了，下面进入tmux玩耍一下吧。

# 使用 #

在命令行输入`tmux`即可进入tmux环境，进入后，会发现跟新打开一个shell没什么区别，
下面执行`Ctrl+b, "`，会发现下面多出来一个面板，再按`Ctrl+b, %`会发现下面的面板变成了两个，跟上面的截图类似了。
然后按`Ctrl+b, o`可以切换光标焦点到不同的面板，切换到上面的面板后，输入vim即可进入vim，在vim中输入`:NERDTree`即可打开文件列表。
光标在文件列表和文件中互相切换使用的快捷键是`Ctrl+w, H/L`。

简单的环境搭建大概就是这样，剩下就是tmux、vim以及其他插件各自的用法了，会在其他的文章里面详述。

 
