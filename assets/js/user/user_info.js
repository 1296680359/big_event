$(function () {
  let form = layui.form
  let layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须1~6位之间！"
      }
    }
  })
  initUserInfo()
  // 初始化用户基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: res => {
        if (res.status !== 0) return layer.msg(res.message)
        // 调用form.val快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }
  $('#btn_reset').on('click', function (e) {
    // 阻止表单默认重置行为
    e.preventDefault();
    initUserInfo()
  })
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data:$(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        // 调用父页面方法重新渲染用户信息
        window.parent.getUserInfo()
      }
    })
  })
})