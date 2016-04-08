---
title: android AlarmManager 设置重复任务
categories: topics android
excerpt: android系列
tags: [android, AlarmManager, setRepeating]
author: zhengjiachao
---

Android应用经常会有定期执行某种任务的需求，这个时候使用AlarmManager是一个非常好的选择，这里主要讲一下setRepeating方法。

setRepeating第二个参数的含义是闹钟触发的时间，第三个参数是触发间隔。 如果触发时间是过去的时间，那么闹钟会即刻触发。
我们以一个每天重复的闹钟为例：

{% highlight java %}

long now = System.currentTimeMillis();
Calendar calendar = Calendar.getInstance(Locale.getDefault());
calendar.setTimeInMillis(now);
calendar.set(Calendar.HOUR_OF_DAY, 8);
calendar.set(Calendar.MINUTE, 18);
calendar.set(Calendar.SECOND,0);
calendar.set(Calendar.MILLISECOND,0);
//如果现在已经过了8点18分，那么就把开始的时间设置成明天的8点18分
if(now > calendar.getTimeInMillis()){
	calendar.setTimeInMillis(calendar.getTimeInMillis() + 1000 * 60 * 60 * 24);
}
Intent checkInIntent = new Intent();
checkInIntent.setAction("CHECKIN");
PendingIntent sender = PendingIntent.getBroadcast(this, 0, checkInIntent, PendingIntent.FLAG_CANCEL_CURRENT);
am.setRepeating(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), AlarmManager.INTERVAL_DAY, sender);

{% endhighlight %}

以上代码即可设置每天8点18分触发固定的闹钟执行sender对应的任务。