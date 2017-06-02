/**
 * 多个服务统一启动入口
 * Created by john on 2017/4/10.
 */
let env = process.env.NODE_ENV || "production"

require("./site/app")
require("./mobile/app")

if("development" == env) {
    require("./mock/app")
}