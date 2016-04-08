---
title: windows环境部署jekyll使用Pygments高亮代码
categories: topics github.io
excerpt: github pages series
tags: [window,jekyll,highlight,高亮代码,Pygments]
author: zhengjiachao
---

Jekyll一般使用Pygments来高亮代码，下面我们介绍Pygments高亮代码的方法。
假设jekyll环境已经部署好了。


###	安装pygments

非windows环境下安装pygments的教程很多，这里主要描述windows环境下的安装。

####	安装python

[下载](https://www.python.org/downloads/release/python-279/)安装python的windows版本。
安装后，把python的安装目录，以及安装目录下的Scripts文件夹设置到环境变量中。

####	安装easy_install
[下载](https://pypi.python.org/pypi/ez_setup)后，解压，执行如下命令安装：

	python ez_setup.py

####	安装pygments

1.	gem install pygments.rb
2.	easy_install Pygments

上面全部安装正确之后，pygments的环境就安装好了

### 标记代码高亮

高亮代码需要使用highlight标记来标记代码，示例如下：
{% raw  %}

	{% highlight ruby %}
	
	def method_1
	end
	
	{% endhighlight %}

{% endraw %}


其他语言的高亮，只需要替换ruby为其他即可


###	导出并应用样式

最后一步，我们需要按照我们的喜好，导出样式，并应用到页面上才能最终生效。

	pygmentize -S style_name -f html > path/pygments.css

style_name是pagments支持的样式名称，具体名称可以通过以下命令查看：

	python
	>>> from pygments.styles import STYLE_MAP
	>>> STYLE_MAP.keys()
	['monokai', 'manni', 'rrt', 'perldoc', 'borland', 'colorful', 'default', 'murphy', 'vs', 'trac', 'tango', 'fruity', 'autumn', 'bw', 'emacs', 'vim', 'pastie', 'friendly', 'native']

导出css后，应用此css即可。

