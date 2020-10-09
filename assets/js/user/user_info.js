$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度为1~6个字符之间'
            }
        }
    });
    inioUserInfo();
    // 初始化用户信息封装
    function inioUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    // $('.layui-form').on('reset', function(e) {
    //     e.preventDefault();
    //     inioUserInfo()
    // });
    $('#reset').on('click', function(e) {
        e.preventDefault();
        inioUserInfo();
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('用户信息修改成功');
                // 调用当前页面父元素的全局方法
                window.parent.getUserInfo();
            }
        })
    });
})