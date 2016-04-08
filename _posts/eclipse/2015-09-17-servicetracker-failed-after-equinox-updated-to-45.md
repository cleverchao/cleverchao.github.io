---
title: serviceTracker failed after equinox updated to 4.5
categories: topics eclipse
excerpt: a serviceTracker problem
tags: [equinox升级 ServiceTracker无法访问]
author: zhengjiachao
---

# 现象 #

equinox从3.7.2升级到4.5之后，之前通过HttpService.registerServlet（“abc/def/*.jsp”，。。。。。）方式注册的jsp无法被访问了

# 问题原因 #

经过调试，发现主要是org.eclipse.equinox.http.servlet插件中解析路径匹配的算法发生了变化，目前的解析算法为HttpServiceRuntimeImpl类的如下方法。

	private boolean doDispatch(
				HttpServletRequest request, HttpServletResponse response,
				String path, RequestInfoDTO requestInfoDTO)
		throws ServletException, IOException {
	
		// perfect match
		if (doDispatch(
				request, response, path, null, Match.EXACT, requestInfoDTO)) {
	
			return true;
		}
	
		String extensionAlias = findExtensionAlias(path);
	
		// extension match
		if (doDispatch(
				request, response, path, extensionAlias, Match.EXTENSION,
				requestInfoDTO)) {
	
			return true;
		}
	
		// regex match
		if (doDispatch(
				request, response, path, null, Match.REGEX, requestInfoDTO)) {
	
			return true;
		}
	
		// handle '/' aliases
		if (doDispatch(
				request, response, path, null, Match.DEFAULT_SERVLET,
				requestInfoDTO)) {
	
			return true;
		}
	
		return false;
	}




从代码上可以看出尝试了四种匹配方式

1. 绝对匹配：path与注册的路径完全一致
2. 扩展名匹配： path的扩展名与注册的扩展名一致，但具体的实现中需要注册路径的时候只能注册（*.jsp）而不能是（/abc/def/*.jsp）
3. 正则表达式匹配： path匹配注册的带*的路径，但是实现中的限制是只能以 /*结尾，而不能是 /*.jsp
4. 默认匹配

从上述四个匹配规则来看，/abc/def/*.jsp并不能被任何方式匹配成功。

而equinox从在3.7.2的时候的匹配算法则是匹配上面的路径配置的。


# 解决方案 #

1. 路径改为 *.jsp
2. 或改为/abc/def/*

视情况选择修改方案。