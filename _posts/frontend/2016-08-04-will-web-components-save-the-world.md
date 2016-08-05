---
title: will web components save the world
excerpt: some thinking about web components
tags: featured
permalink: /topics/frontend/
categories:
  - topics
  - frontend
author: zhengjiachao
#date/lastupdated are optional
#date: 2016-08-04 10:01:38
#lastupdated: 2016-08-04 10:01:38
---

## background ##

Web components is getting more and more famous, somebody thinks this is the very future of front-end development because web components can get rid of the gap of different front-end UI libs.

In old days people were busy handling the differencies between different browsers because the browsers were talking different dialects. so we got **jquery** to solve this kinda problem.

Years later, people started to make more and more complicated UIs , so there came the UI libs as **jquery-ui**, **YUI** and something else. UI controls came along with UI libs, if I'm gonna use a datepicker in jquery-ui, what I must do is to include jquery and jquery-ui libs. 
So what if I wanna use datepicker in jquery-ui and tabs in YUI at the same time? 
Ok, the only way I can handle this is to include both jquery-ui lib and YUI lib, wow , will they "fight" each other, I've no idea....

Web components then came to us telling that it can isolate css and javascript , we can pack all css and javascript in the component, then we just include that component to our html page ,bang it works!

BUT!
Javascript in web components does NOT run in an isolate scope, script can pollute global scope if it contains `window.something = some value` like code. Now lets go to a situation that two components are both using jquery but different versions of it , wow what a nightmare jquery fights with itself.

Now lets see what are the features web components provides:

1. css is written and rendered isolated to the page, styles defined in css in web components do not affect the styles outside this components and styles defined outside do not affect the styles inside either. (FYI: there is some trick to break this rule and what I was talking about is under the default situation.)
2. javascript does not run in an absolutely isolated scope ,so when the web component uses thr libs like jquery which defines global veriables in the `window` object, components like this component's combination will cause **thr lib confilction**.

**We can guess that web components's purpose is to build absolutely isolated components so that different components developed with different frontend libs can live with each other peacefully, but obviously it can never reach that goal thanks to the leak of javascript scope.What web components is doing is trapped in a dilemma of isolating css but not javascript.**

## What should web components really do? ##

I thought there are two ways to do components work.

### 1. Isolate both css and javascript ###



### 2. Do not isolate css but isolate javascript ###


