$(function() {
        var layer = layui.layer
            //调用 getUserInfo()获取用户信息
        getUserInfo();
        // 为退出绑定点击事件
        $('#btnLogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                localStorage.removeItem('token') //清空本地存储
                location.href = "/login.html"
                layer.close(index);
            });
        })

    })
    // 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用 renderAvatar()获取用户信息
            renderAvatar(res.data);
        },
        // 无论成功或者失败，最终都会执行complete回调函数
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！')
        //         localStorage.removeItem('token') //强制清空本地存储
        //     location.href = "/login.html" //强制跳转到登录页面
        // }
    });

};
// 渲染用户头像
function renderAvatar(user) {
    console.log(user);
    // 获取用户名称
    var name = user.nickname || user.username
        // 渲染用户名称
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 渲染用户头像
    if (user.user_pic !== null) {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        var first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').show()
    }

}