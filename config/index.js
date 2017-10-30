
'use strict'
// Template version: 1.1.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8087,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/zsf':{
        // target:'http://192.168.18.227:8090',// 本地测试
         // target:'http://192.168.18.5:8090',// 石智颖
         target:'http://114.55.86.215:8090', // 测试
         // target:'http://192.168.18.170:8061',
        changeOrigin:true,
        pathRewrite:{
          '^/zsf':''
        }
      },
      '/rz':{
        // target:'http://192.168.18.227:8090',// 本地测试
        // target:'http://192.168.18.5:8090',// 石智颖
        // target:'http://114.55.86.215:8090', // 测试
        target:'http://121.199.33.100:8030',// 线上
        // target:'http://192.168.18.170:8061',
        changeOrigin:true,
        pathRewrite:{
          '^/rz':''
        }
      },
      '/zyd':{
        // target:'http://192.168.18.227:8090',// 本地测试
        // target:'http://192.168.18.5:8090',// 石智颖
        // target:'http://192.168.18.170:8061', // 义良
         target:'http://114.55.86.215:8061',// 测试
        // 114.215.211.3:22 项目测试环境
        changeOrigin:true,
        pathRewrite:{
          '^/zyd':''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
