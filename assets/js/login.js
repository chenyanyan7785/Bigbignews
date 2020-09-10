$(function() {
    // 点击去注册
    $('.link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show()
    });
    //点击去登录
    $('.link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide()
    });
    // 自定义表单属性验证
    // 从layui中获取form元素
    var form = layui.form
        // 从layui中获取
    var layer = layui.layer
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 判断前后两次输入密码是否一致
        // 获取输入密码表单的value值
        repwd: function(value) { //value：表单的值、item：表单的DOM对象
            var pwds = $('.reg-box [name=password]').val()
            if (pwds !== value) {
                return '密码输入不一致，请重新输入'
            }
        }

    });
    // 发起注册用户的Ajax请求
    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault()
        var data = {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            }
            //提交数据
        $.post('/api/reguser', data, function(res) {
            console.log(res);
            //注册失败
            if (res.status == 1) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            //模仿手动操作点击事件
            $('.link_login').click()

        })
    });
    // 监听登录表单的提交事件
    $("#form-login").on('submit', function(e) {
        e.preventDefault(); //阻止默认行为
        // 获取表单中的数据
        var data = $(this).serialize()
            //获取用户登录信息
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }
        });
    });
})