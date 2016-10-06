---
title: Understand Java IO
categories: topics java
excerpt: understand java io series
tags: [java]
author: zhengjiachao
---

##	InputStream/OutputStream && Reader/Writer

java.io包里面有两种流
*	InputStream和OutputStream
*	Reader和Writer

Stream的操作单位是字节（byte），Reader/Writer的操作单位是字符(char)。
java1.0的时候还只有字节流，也就是InputStream和OutputStream，后来到了java1.1的时候，添加了Reader/Writer操作字符的流。之所以在Java 1.1 里添加了Reader 和Writer 层次，最重要的原因便是国际化的需求。老式IO 流层次结构只支持8 位字节流，不能很好地控制16 位Unicode 字符。由于Unicode 主要面向的是国际化支持（Java 内含的char 是16 位的Unicode），所以添加了Reader 和Writer 层次，以提供对所有IO 操作中的Unicode 的支持。

##	磁盘流和内存流

流动读取位置一般是两种，一种是从磁盘上读取，一种是从内存上读取。 

###	磁盘流

磁盘流主要就是File*Stream 或者 FileReader/FileWriter，读取内容的时候主要从磁盘上读取。

### 内存流

内存流主要是读取内存中的数据，主要有ByteArray*Stream或者CharArrayReader/CharArrayWriter。

###	buffer

上面提到了有磁盘流和内存流，既然有磁盘流，那么理所当然的就会应该做缓冲，因为每次读写内容都操作磁盘，效率会极低，所以jdk也理所当然的提供了Buffer*Stream和BufferReader/BufferWriter，具体用法也非常大理所当然，就是用缓冲流包装磁盘流，然后视具体情况再使用其他包装流（如DataOutputStream等）。

##	编码
既然有Stream和Reader/Writer两种读取单位，那么自然就会有两种流之间相互的读取方式：通过InputStreamReader/OutputStreamWriter来把Stream封装为Reader/Writer。这其中就需要涉及到byte到char转换的编码问题。如果不指定编码，就会使用环境默认的编码，如果需要指定编码，在创建InputStreamReader/OutputStreamWriter的时候指定编码即可。

