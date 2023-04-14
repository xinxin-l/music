const { resolve } = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const isProduction = process.env.NODE_ENV === 'production';
const isProduction = true;

const path = require('path');
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');

// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',
  axios: 'axios',
};
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [],
  },
  // 生产环境
  build: {
    css: ['https://cdn.bootcss.com/element-ui/2.15.6/theme-chalk/index.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
      'https://cdn.bootcss.com/element-ui/2.15.6/index.js',
    ],
  },
};

module.exports = {
  //去除生产环境的product ionSourceMap
  productionSourceMap: false,
  devServer: {
    // 跨域文件
    proxy: {
      '/api': {
        // https://autumnfish.cn/
        target:
          'https://netease-cloud-music-api-pnwpdpkcx-xinxin-l.vercel.app/',
        // ChangeOrigin使得代理发送网络请求时可以修改源，改成target中指定的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  chainWebpack: (config) => {
    const plugins = [];
    if (isProduction) {
      //   添加CDN参数到htmlWebpackPlugin配置中
      config.externals = externals;
      config.plugin('html').tap((args) => {
        if (isProduction) {
          args[0].cdn = cdn.build;
        } else {
          args[0].cdn = cdn.dev;
        }
        return args;
      });
      //   使用UglifyJsPlugin删除无用代码
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, //去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], //移除console.log
            },
          },
        })
      );
    }
    config.module
      .rule('worker')
      .test(/\.worker\.js$/)
      .use('worker')
      .loader('worker-loader');
    //   图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true,
      })
      .end();
    // 使用babel转换ES6模块
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        // 修改options中的babel配置
        options.transformAssetUrls = {
          audio: 'src',
        };
        options.transformToRequire = {
          img: 'src',
          image: 'xlink:href',
          video: 'src',
          source: 'src',
        };
        options.babelLoader = {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
          ],
        };
        return options;
      });

    // // 打包后可视化分析
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);

    // // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('views', resolve('src/views'));
  },
  // 公共代码抽离
  configureWebpack: (config) => {
    //....
    //优化项配置
    config.optimization = {
      // 开启treeShaking
      usedExports: true,
      splitChunks: {
        // 分割代码块
        cacheGroups: {
          vendor: {
            //第三方库抽离
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
            maxInitialRequests: 5,
            minSize: 0, //大于0个字节
            priority: 100, //权重
          },
          common: {
            //公用模块抽离
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
            maxInitialRequests: 5,
            minSize: 0, //大于0个字节
            priority: 60,
          },
          styles: {
            //样式抽离
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true,
          },
          runtimeChunk: {
            name: 'manifest',
          },
        },
      },
    };
    config.plugins.push(
      new PurgecssPlugin({
        paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, {
          nodir: true,
        }),
      })
    );
  },
};
