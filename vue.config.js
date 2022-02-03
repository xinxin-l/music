module.exports = {
    devServer: {
        // 跨域文件
        proxy: {
            '/api': {
                // https://autumnfish.cn/
                target: 'https://netease-cloud-music-api-tau-taupe.vercel.app/',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}