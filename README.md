# 灵嘚 - 一款Web端短视频应用

这里是前端项目仓库，如需查看中间件和用户认证服务的详细文档请参考下方的仓库链接。

## 前言

灵嘚是一个基于 Web 端的视频播放应用，旨在提供用户丰富的视频观看体验。其名称来源于上海方言中的“灵的”，意为“很好的”或“很棒的”，以表达我们对这个项目的期望，同时也希望大家能够喜欢这个作品。

灵嘚具备以下核心功能：

1. 视频播放：我们自研了视频播放器，支持视频播放、倍速、暂停和拖动进度条，以便更好地控制视频观看体验，同时还具备弹幕功能。

2. 内容分类：平台拥有多个视频内容分类页，包括热门视频和专门的频道，如体育频道，以帮助用户轻松找到感兴趣的内容。

3. 视频切换：在推荐模式下，用户可以通过上下键操作来浏览和切换视频，以快速浏览不同视频之间的内容。

4. 账户系统：灵嘚提供了用户账户系统，允许用户登录并收藏他们喜欢的视频，从而更好地管理他们的收藏内容。用户也可以在平台上进行视频内容的发布，查看和编辑他们的个人资料。

5. 社交互动：平台还支持点赞、分享、关注、评论和搜索等功能，使用户可以积极参与社交互动和发现更多有趣的视频。

## 立即体验

[https://lingdei.doyi.online](https://lingdei.doyi.online)

## 视频演示

[->点击这里<-](https://www.bilibili.com/video/BV1Qa4y1D7jR/)

## 运行

```bash
yarn install
yarn dev
```

## 技术栈

为了实现这些功能，我们采用了以下技术栈：

- 前端：我们使用 Vue3.js + TypeScript 进行前端开发，以构建出色的用户界面和用户体验。

- 后端：我们选择了 Golang 作为后端开发语言，结合 Fiber Web Framework 来构建强大而高效的后端服务，以支持平台的数据管理和用户互动功能。同时，整体采用云原生微服务架构，提高系统的可维护性，提供了快速响应和可扩展性，满足用户的需求并确保平台的可靠性。

- 数据库：我们使用 MySQL 作为主要的数据库，以存储平台的数据，如视频信息、用户信息和用户收藏等。

## 架构图

![架构图](https://bucket.lingdei.doyi.online/imgs/platform.png)

## 仓库

整个项目的仓库分为三个部分：

[LingDei](https://github.com/LingDei/LingDei): 项目的前端部分，使用 Vue3.js + TypeScript 开发。

[LingDei-Middleware](https://github.com/LingDei/LingDei-Middleware): 项目的中间件部分，使用 Golang + Go Fiber 开发，承载灵嘚所有服务接口的实现，同时与七牛云的API进行对接。

[LingDei-AuthServer](https://github.com/LingDei/LingDei-AuthServer): 项目的认证服务部分，使用 Golang + Go Fiber 开发，承载灵嘚的用户认证服务相关接口的实现。

## 团队分工

- [东南dnf（zjy2414）](https://github.com/zjy2414)

  - 负责前端开发，包括整体设计、视频管理、账户系统、社交互动等功能的实现。
  - 负责中间件的开发，包括视频服务、分类服务、收藏服务、点赞服务、关注服务、评论服务、弹幕服务、搜索服务等，总计73个接口。
  - 负责认证服务的开发，包括用户注册、用户凭证签发、个人资料等功能的实现，总计23个接口。

- [zkt2002（zkt2002）](https://github.com/zkt2002)
  
  - 负责前端开发，包括整体设计、视频播放、弹幕功能、分页功能等功能的实现。
  - 负责视频播放器的开发，包括视频播放、暂停、倍速、拖动进度条等功能的实现。
  - 负责弹幕功能的开发，包括弹幕的发送、接收、展示等功能的实现。
