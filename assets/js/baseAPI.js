$.ajaxPrefilter(function (options) {
  // 发起ajax请求前 同意拼接请求根路径
  options.url = "http://ajax.frontend.itheima.net" + options.url
  // 统一为有权限的接口设置请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ""
    }
    // 全局统一挂在complete回调函数
    options.complete = function (res) {
      console.log(res.responseJSON);
      if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        localStorage.removeItem('token')
        location.href='/login.html'
      }
    }
  }
})