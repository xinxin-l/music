module.exports = {
    devServer: {
        // 跨域文件
        proxy: {
            '/api': {
                // https://autumnfish.cn/
                target: 'http://iwenwiki.com:3000',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}