$(function () {
  let layer = layui.layer
  let form = layui.form
  // 获取文章分类列表
  initArticleList()
  function initArticleList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: res => {
        // console.log(res);
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }
  // 为添加类别按钮绑定点击事件
  let index = null
  $('#btnAddCate').on('click', function () {
    index = layer.open({
      title: '添加文章分类',
      content: $('#dialog-add').html(),
      type: 1,
      area: ['500px', '250px']
    })
  })
  // 通过代理的形式 绑定submit事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg(res.message)
        initArticleList()
        layer.msg(res.message)
        // 关闭弹出层
        layer.close(index)
      }
    })
  })
  // 通过事件代理为编辑按钮添加点击事件
  let indexEdit = null
  $('tbody').on('click', '#btn-edit', function () {
    // 弹出修改文章分类信息
    indexEdit = layer.open({
      title: '编辑文章分类',
      content: $('#dialog-edit').html(),
      type: 1,
      area: ['500px', '250px']
    })
    let id = $(this).attr('data-id')
    let name = $(this).attr('data-name')
    let alias = $(this).attr('data-alias')
    // console.log(id, name, alias)
    form.val('form-edit', {
      Id: id,
      name: name,
      alias: alias
    })
  })
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: res => {
        if (res.status !== 0) return layer.msg(res.message)
        layer.close(indexEdit)
        layer.msg(res.message)
        initArticleList()
      }
    })
  })
  $('tbody').on('click', '#btn-delet', function () {
    let id = $(this).attr('data-id')
    layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: res => {
          if (res.status !== 0) return layer.msg(res.message)
          layer.msg(res.message)
          layer.close(index);
          initArticleList()
        }
      })
    });
  })
})