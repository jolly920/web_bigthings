$(function() {
    var layer = layui.layer
    getUserInfo()
        //获取用户基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            //请求头请求字段(访问有权限页面需要token) 
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },放在baseapi.js
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                rederAvatar(res.data)
            },
            //无论成功还是失败都会执行 放在baseAPI.JS
            // complete: function(res) {
            //     //res.responseJSON 拿到服务器响应数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         //强制清空token 跳转到登录页面
            //         localStorage.removeItem('token')
            //         location.href = 'login.html'
            //     }

            // }
        })
    }
    //渲染用户头像
    function rederAvatar(user) {
        //获取用户名称  
        //首先使用用户昵称 如果没用昵称就使用用户名
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic !== null) {
            //渲染用户自己的头像 影藏文本
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            //渲染文本头像
            $('.layui-nav-img').hide()
                //获取用户名称第一个字符并转成大写
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }

    //退出
    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //退出清除本地储存token
            localStorage.removeItem('token')
            location.href = 'login.html'
                //关闭询问框
            layer.close(index);
        });
    })

})