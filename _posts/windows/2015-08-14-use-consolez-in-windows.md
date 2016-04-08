---
title: use consolez in windows
categories: topics windows
excerpt: config consolez in windows
tags: [consolez]
author: zhengjiachao
---

下载consolez [https://github.com/cbucher/console/wiki/Downloads]
下载后进行如下配置：
背景色：rgb(46, 52, 54)
字体： Consolas
大小：14px

然后中午乱码的问题和右键的问题，添加如下注册表：

Windows Registry Editor Version 5.00
 
[HKEY_CURRENT_USER\Console\ConsoleZ command window]
"CodePage"=dword:000003a8
"FontSize"=dword:000a0000
"FontFamily"=dword:00000036
"FontWeight"=dword:00000190
"FaceName"="Consolas"
"HistoryNoDup"=dword:00000000

[HKEY_CLASSES_ROOT\Directory\shell\Console]
@="Console Here"

[HKEY_CLASSES_ROOT\Directory\shell\Console\command]
@="\"D:\\program files\\consolez\\Console.exe\" -d \"%V\""

[HKEY_CLASSES_ROOT\Directory\Background\shell\Console]
@="Console Here"

[HKEY_CLASSES_ROOT\Directory\Background\shell\Console\command]
@="\"D:\\program files\\consolez\\Console.exe\" -d \"%V\""