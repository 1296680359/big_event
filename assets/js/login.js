$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  let form = layui.form
  form.verify({
  'pwd':[/^[\S]{6,12}$/,"密码必须6-12位,且不包含空格"]
  })
})