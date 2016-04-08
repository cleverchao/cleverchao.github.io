---
title: 给Jekyll的文章添加目录
categories: topics github.io
excerpt: github pages series
tags: [目录, 大纲, jekyll]
author: zhengjiachao
---

{%raw%}
#	添加目录

在Jekyll里面给文章添加目录非常容易，只需要在文章开头添加如下代码即可<span id="code"></span>

	*  目录
	{:toc}

一个完整示例是：

	---
	layout: post
	title: "add outline on jekyll post"
	description: ""
	category:
	tags: []
	---
	{% include JB/setup %}
	*  目录
	{:toc}
	#	一级标题
	##	二级标题
	##	二级标题

这样就可以显示出目录了。
如果要把某标题从目录树中排除，则在该标题的下一行写上 {:.no_toc}
目录深度可以通过 config.yml 文件中添加 toc_levels 选项来定制，默认为 1..6，表示标题一至标题六全部渲染
{:toc} 默认生成的目录列表会添加 id 值 markdown-toc，我们可以自定义 id 值，比如 {:toc #cleverchao}，生成的目录列表添加的 id 将会是 cleverchao。

#	自动添加目录

每次都手动添加目录比较麻烦，最好是每次创建新文章的时候都能自动加上。

##	改成引入的方式

直接写[代码](#code)的话，如果之后想要调整目录，非常麻烦，所以我们使用include的方式引入目录的代码。
我们在_includes目录下面新建一个ext目录，然后创建一个文件：toc, 然后把[代码](#code)写到toc里面，保存即可。
{%endraw%}
##	修改Rakefile

找到以下代码：

{% highlight ruby %}

task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = ENV["title"] || "new-post"
  tags = ENV["tags"] || "[]"
  category = ENV["category"] || ""
  category = "\"#{category.gsub(/-/,' ')}\"" if !category.empty?
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts 'description: ""'
    post.puts "category: #{category}"
    post.puts "tags: #{tags}"
    post.puts "---"
    post.puts "{\% include JB/setup \%}"
    post.puts "{\% include ext/toc \%}" ###########这一行是添加的代码（\是为了转义，需要去掉）############
  end
end # task :post 

{% endhighlight %}

修改代码之后，每次rake post的时候就可以自动给文章加目录了。