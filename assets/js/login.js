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

    })
})