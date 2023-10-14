# 快鹿后台管理-管理员
> 作者：[AB-programming](https://github.com/AB-programming/)

仓库为快鹿后台管理-管理员 代码，以下是关于快鹿项目的其他地址

后端：[快鹿后端](https://github.com/AB-programming/FastDeer-End)

客户端：[快鹿客户端](https://github.com/AB-programming/FastDeer-Client)

后台管理-学校：[快鹿后台管理-学校](https://github.com/AB-programming/FastDeer-School-Admin)

## 介绍 📦
快鹿（FastDeer）是一款面向青年群体和学生的综合性APP，整合了校园分帖、聊天、资源共享、学术资讯、校园活动发布与接收、校园就业信息发布与接收、志愿者服务信息发布与接收，平台反馈等功能，并配备了一套Web后台管理系统，以及各个校方的一套Web后台管理系统，旨在满足校园大众的多方面需求。

快鹿后台管理-管理员提供了对快鹿应用的后台管理服务，可对用户成员等进行管理，可注销用户，删除相关帖子等，可看到用户反馈。

## 技术选型（后台管理-管理员） 🔬
- React 18.2.0
- Vite 4.4.5
- React Router Dom 6.16.0
- Ant Design 5.9.2
- Axios 1.5.0
- React Quill 2.0.0

## 启动部署说明（后台管理-管理员） 🚀
这里只提供本机启动的方式，若您想使用Nginx或者部署第三方托管（如Netlify、Vercel等）可自己进行相关配置

环境要求：Node.js推荐16.x及以上版本

首先修改配置，修改根目录下`.env`文件，后端在本机不用修改
```ts
VITE_TOKEN=token
VITE_END_ADDRESS=http://localhost:8080
```

来到项目根目录

```zsh
npm install

npm run dev
```

登录用户名默认是user，密码默认是123，这个可以在后台的配置文件中修改

## 项目后续说明 🧱
此项目代码还有很多未完善的功能，后续有时间会添加

如果您了解过此项目后发现不足或需要改进之处，还请您可以去发出issue或者pr，非常感谢🙏

## 感谢 🌸
创作不易，本项目目前可能较为简单，若您不嫌弃并且对您有帮助的话，还请您可以帮我点一下star，非常感谢🙏

