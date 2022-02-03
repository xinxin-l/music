# music
使用网易云音乐接口https://neteasecloudmusicapi.vercel.app/ ，用vue2+vue-router写出的音乐播放器，通过vercel部署的接口和移动端音乐播放器。

# 线上demo访问
https://music-ebon-seven.vercel.app/

# vercel部署
- 部署接口
    可以看这个教程 https://zy.prmath.com/393.html ，得到vercel部署好的接口后
    1. 通过在vercel引入的项目中设置settings中的Environment Variables，使其中NAME为VUE_APP_NETEASE_API_URL，VALUE为/api
    2. 在项目中引入vercel.json，其内容为：(记得要将https://netease-cloud-music-api-pnwpdpkcx-xinxin-l.vercel.app 处修改为你自己部署好的网址）
        ``` 
        {
            "rewrites": [{
            "source": "/api/:match*",
            "destination": "https://netease-cloud-music-api-pnwpdpkcx-xinxin-l.vercel.app/:match*"
            }]
        }
- 部署音乐播放器
    通过导入本地仓库，然后在vercel中引入该项目即可，vercel会自动识别所使用的语言为其部署
       
## 搭建项目
```
npm install
```

### 运行项目
```
npm run serve
```
