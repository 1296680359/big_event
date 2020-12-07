$(function () {
  // 获取用户信息
  getUserInfo()
  let layer = layui.layer
  $('#btnLogout').on('click', function () {
    // 提示用户是否确认退出
    layer.confirm('是否退出登录？', {icon: 3, title:'提示'}, function(index){
      //清空本地存储
      localStorage.removeItem('token')
      // 重新跳转到登录页
      location.href='/login.html'
      // 关闭confirm询问框
      layer.close(index)
    })
  })
})
// 获取用户信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: { Authorization: localStorage.getItem('token') || "" },
    success: res => {
      // console.log(res);
      if (res.status !== 0) return layui.layer.msg(res.message)
      // 渲染用户头像
      renderAvatar(res.data)
    },
    // 无论成功失败都会执行complete回调函数
    // complete: function (res) {
    //   console.log(res.responseJSON);
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
    //     localStorage.removeItem('token')
    //     location.href='/login.html'
    //   }
    // }
  })
}
// 渲染用户头像
function renderAvatar(user) {
  // 获取用户名称
  let name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  // 按需渲染用户头像
  if (user.user_pic) {
    $('.layui-nav-img').prop('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}