/**
 * Created by Wangxy on 2017/3/16.
 */
import axios from "axios"

//axios.defaults.baseURL = config.api.url

axios.interceptors.request.use(httpConfig => {
    /*
    if(config.mock) {
        let uri = httpConfig.url.substring(httpConfig.baseURL.length)
        if(config.mock.resource[uri])
            httpConfig.url = config.mock.url + config.mock.resource[uri]
    }
    */
    if(localStorage.ACCESS_TOKEN)
        httpConfig.headers = {"access-token": localStorage.ACCESS_TOKEN}
    httpConfig.headers = {"access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.6J99RlP_tFsyMwdhqPjgTii3TsF27u77Ui-Z3N5ZQTI"}
    return httpConfig
}, error => {
    console.log(error)
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.reject(error)
})

export default axios