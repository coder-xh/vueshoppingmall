module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth:375,   //视窗的宽度
      viewportHeight:667,
      unitPrrercision:5,  //指定px转换为视窗单位值的小数位数
      viewportUnit:'vw',  //指定要转换成的视窗单位
      selectorBlackList:['ignore','tab-bar','tab-bar-item'],  //指定不需要转换的类
      minPixelValue:1,  //小于等于1px 不转换
      mediaQuery:false, //允许媒体查询中转换px
      exclude:[/TabBar/]
    }
  }
}
