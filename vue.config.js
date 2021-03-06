const path = require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      // .set("~assets", resolve("src/assets"))
      .set("common", resolve("src/common"))
      .set("network", resolve("src/network"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
  },
}