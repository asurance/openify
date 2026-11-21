---
layout: home
title: 简化 React 弹窗组件调用
description: Openify 是一个简化 React 弹窗类组件调用的工具,支持全局唤起、Promise 化关闭结果、渲染隔离与异常捕获,仅依赖 React,兼容任意组件库。

hero:
  name: Openify
  tagline: 方便React弹窗组件使用的工具

  actions:
    - theme: brand
      text: 快速开始
      link: /guides/quick-start
    - theme: alt
      text: API文档
      link: /guides/apis

features:
  - title: 全局可用
    details: 任意代码位置可唤起弹窗
  - title: Promise化
    details: 规避回调地狱,让代码更简洁易读
  - title: 渲染隔离
    details: 应用和弹窗自身更新不触发另一方渲染
    link: /guides/examples#渲染隔离
  - title: 非侵入集成
    details: 现有组件零改造,通过胶水层即可接入
  - title: 框架无感知
    details: 仅依赖React,支持任意组件库/渲染器
  - title: 无惧异常
    details: 异常边界自动捕获,弹窗崩溃不波及宿主应用
    link: /guides/examples#错误捕获
---
