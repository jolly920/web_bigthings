//每次调用$.get,$.pos,$.ajax都会先调用ajaxPrefilter（）函数
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url)
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    //为有权限(包含/my/的URL)的接口 设置headers请求头
    if (options.url.indexOf('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空token 跳转到登录页面
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
    }

})