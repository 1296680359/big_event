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
  let layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6-12位,且不包含空格"],
    repwd: function (value) {
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })
  // 注册
  $('#form_reg').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()
      },
      success: res => {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        $('#link_login').click()
      }
    })
  })

  $('#form_login').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        // console.log(res.token);
        localStorage.setItem('token',res.token)
        // location.href='../../index.html'
        location.href='/index.html'
      }
    })
  })
})