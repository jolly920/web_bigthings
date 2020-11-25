$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取from对象
    var form = layui.form
    var layer = layui.layer
        //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义pwd校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //校验两次输入密码是否一致
        repwd: function(value) {
            //name属性获取值
            var pwd = $('#form_reg [name=password]').val()
                // var pwd = $('#password').val()
                // alert(value + '---' + pwd)
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //阻止默认提交
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg('注册失败！')
            }
            layer.msg('注册成功！请登录')
                //模拟人的点击行为
            $('#link_login').click();
        })
    })

    //登录
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(), //serialize()快速获取表单数据
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    //将登录成功后的token值保存到localstorage
                localStorage.setItem('token', res.token)
                    // console.log(res.token);
                location.href = 'index.html'
            }
        })
    })


})