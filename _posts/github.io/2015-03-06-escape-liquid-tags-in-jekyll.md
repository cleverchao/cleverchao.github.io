---
title: escape liquid tags in jekyll
categories: topics github.io
excerpt: github pages series
tags: [liquid]
author: zhengjiachao
---

{% raw %}
if someone is also confused with the problem to write markdown page about liquid,there is a solution for escaping liquid tags:
{% endraw %}

	{{ "{% raw " }}%}
	{% raw %}
	{% this %}
	{% endraw %}
	{{ "{% endraw " }}%}
	
{% raw %}
this will disable liquid processing engine and show `{% this %}` directly. hope this can help. 

I found this solution on <http://stackoverflow.com/questions/3426182/how-to-escape-liquid-template-tags>
{% endraw %}