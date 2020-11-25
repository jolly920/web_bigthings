//每次调用$.get,$.pos,$.ajax都会先调用ajaxPrefilter（）函数
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // console.log(options.url)
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})