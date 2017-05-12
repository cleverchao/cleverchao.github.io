---
title: swarm staffs when integreted to docker engine from v1.12.1
excerpt: 
tags: featured
categories:
  - topics
  - docker
author: zhengjiachao
#date/lastupdated are optional
#date: 2016-10-06 23:20:14
#lastupdated: 2016-10-06 23:20:14
---


# 一、swarm 概览


从docker1.12开始，swarm就默认集成在docker里面一起发行了。
swarm有如下几个特点：

1. 跟docker引擎一起发布的集群管理工具
2. 分散化设计：Docker引擎在运行时配置节点类型而不是部署期。使用docker引擎既可以部署manager也可以部署workers。
3. 描述式服务模型：docker引擎使用描述式的方法来定义应用程序栈中的服务的期待状态，比如可以描述应用程序由一个前端的服务和一个消息队列服务以及一个数据库的后端服务组成。
4. 容量增减：对于每个服务都可以声明要运行多少个实例。当增容或减容的时候，swarm的管理器会自动的调节实例数量来符合声明的状态。
5. 期待状态调节：swarm管理器会实时的监听集群状态并根据集群状态和期待状态的差异来调节集群状态。例如一个服务声明了10个容器实例来提供服务，一个运行了其中两个实例的worker挂掉了，manager就会再启动两个实例来调节集群状态。
6. 多主机网络：可以为服务群声明一个覆盖网络。swarm管理器会自动的给容器在覆盖网络中分配地址。
7. 服务发现：swarm管理器会给swarm中的每一个服务分配一个特定的DNS名称并且对运行中的容器进行负载均衡。可以通过swarm内嵌的DNS服务器来对每一个容器来进行查询。
8. 负载均衡：可以把服务的端口导出到外部的负载均衡器中。在swarm内部允许指定如何在节点间分配服务容器。
9. 默认的安全策略：每个swarm的节点都强制要求TLS认证以及使用安全的交互策略。
10. 循环更新


# 二、swarm模式的一些关键概念

## 2.1 swarm

docker引擎内部集成的集群管理和编排特性是通过SwarmKit来构建的。一个运行在集群中的引擎称为swarm模式。可以通过初始化一个sarm或者加入一个已经存在的swarm进入swarm模式。
一个swarm是一个部署服务的docker引擎的集群，docker引擎的命令行工具包含swarm管理的命令例如增加或删除节点。命令行工具也包含了部署服务以及管理服务编排的命令。当在swarm模式之外运行docker引擎的时候，执行的就是容器的命令，如果在swarm模式中那么就是在编排服务。

## 2.2 Node

一个节点是是swarm中一个docker引擎的实例。通过给Manager node提交一个服务定义可以在swarm中部署应用程序，而manager node会把成为任务的工作单元费赔给worker节点。
manager nodes也会对集群进行管理和编排来保持swarm的期待状态。manager nodes会选举出一个领袖来编排任务。
worker nodes接受和执行从manager nodes分配来的工作。默认情况下manager nodes也是worker nodes，但是可以通过配置managers为manager-only节点。代理可以通知manager node当前分配出去任务的状态，所以manager可以维持服务的期待状态。

## 2.3 services and tasks

一个服务是指在worker nodes上运行的任务，它是swarm系统的核心结构，也是用户跟swarm交互的基础。
当创建一个服务的时候需要制定使用哪个容器镜像以及需要容器运行哪些命令。
在重复服务模型中，swarm管理器根据设置的期待状态来分布指定数量的重复任务。
对于全局服务来说，swarm在每一个可用的集群节点上都运行一个此服务的任务。
一个任务就是指一个docker容器以及在其中运行的命令。它是swarm编排的基本单元。manager nodes根据声明的服务副本数量来向worker nodes分配任务。一旦一个任务被分配给了一个节点，它就不能被移动到其他节点了，只能是在分配的节点上运行或者失败。

## 2.4 负载均衡

swarm管理器使用ingress load balancing来把对外部可见的服务暴露出来。swarm管理器会自动的分配给服务一个对外发布的端口或者也可以由用户指定一个30000-32767之间的端口。
外部组件例如云负载均衡组件可以通过访问集群中任意节点上服务对外发布的端口来访问服务而不论这个节点是否真的正在运行这个服务的任务。swarm中所有的节点都会把链接路由到一个真正运行的任务实例上去。
swarm节点有一个内部发DNS组件可以自动的给每一个swarm中的服务自动陪陪一个DNS项。swarm管理器通过内部的基于服务DNS名称的负载均衡来在在集群内部向服务分发请求。