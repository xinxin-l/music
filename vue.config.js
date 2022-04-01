module.exports = {
    devServer: {
        // 跨域文件
        proxy: {
            '/api': {
                // https://autumnfish.cn/
                target: 'https://netease-cloud-music-api-pnwpdpkcx-xinxin-l.vercel.app/',
                // ChangeOrigin使得代理发送网络请求时可以修改源，改成target中指定的地址
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}