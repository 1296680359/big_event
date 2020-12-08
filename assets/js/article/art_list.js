$(function () {
  let layer = layui.layer
  // 定义一个查询的参数对象
  let q = {
    pagenum: 1, //页码值
    pagesize: 2, //每页几条数据
    cate_id: '', // 文章分类id
    state:'' // 文章发布状态
  }

  // 定义美化时间过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
    let y = dt.getFullYear()
    let m = padZero(dt.getMonth()+1)
    let d = padZero(dt.getDate())
    let hh = padZero(dt.getHours())
    let mm = padZero(dt.getMinutes())
    let ss = padZero(dt.getSeconds())
    return y+'-'+m+'-'+d+' ' + hh +':'+mm+":"+ss
  }
  function padZero(n) {
    return n>9?n:'0'+n
  }
  initTable()
  // 获取文章列表数据
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: res => {
        if (res.status !== 0) return layer.msg(res.message)
        console.log(res);
        // 使用模板引擎渲染页面数据
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }
})