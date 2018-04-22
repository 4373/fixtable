export function Both(box) {
  const leftbox = document.createElement('div')
  leftbox.setAttribute('class', 'left-box')
  

  // 表头列固定
  const head_table = document.createElement('table')
  head_table.setAttribute('class', 'table table-striped table-hover')
  const head_table_thead = document.createElement('thead')
  head_table.appendChild(head_table_thead)
  leftbox.appendChild(head_table)
  const tr_in_head =document.querySelector('.thead').getElementsByTagName('tr')
  for(let i = 0; i < tr_in_head.length; i++) {
    const th = tr_in_head[i].getElementsByTagName('th')[0]
    const h_tr = document.createElement('tr')
    h_tr.innerHTML = th.outerHTML
    head_table_thead.appendChild(h_tr)
  }
  leftbox.appendChild(head_table)

  // 表身列固定
  const body_box = document.createElement('div')
  body_box.setAttribute('class', 'left-box-box')
  const body_table = document.createElement('table')
  setTimeout(function(){
    leftbox.style.height = box.offsetHeight + 'px'
    leftbox.style.width = document.querySelector('.thead').getElementsByTagName('td').offsetWidth + 'px'
    body_box.style.height = document.querySelector('.table-box').offsetHeight  + 'px' 
  }, 0)
  body_box.appendChild(body_table)
  const body_table_body = document.createElement('tbody')
  body_table.appendChild(body_table_body)
  body_table.setAttribute('class', 'table table-striped')

  const tr_in_body =document.querySelector('.tbody').getElementsByTagName('tr')
  for(let i = 0; i < tr_in_body.length; i++) {
    const td = tr_in_body[i].getElementsByTagName('td')[0]
    const b_tr = document.createElement('tr')
    console.log(td)
    b_tr.innerHTML = td.outerHTML
    body_table_body.appendChild(b_tr)
  }
  leftbox.appendChild(body_box)
  
  // 表尾列固定
  const foot_table = document.createElement('table')
  foot_table.setAttribute('class', 'table table-striped table-hover')
  const head_table_tfoot = document.createElement('tfoot')
  foot_table.appendChild(head_table_tfoot)
  leftbox.appendChild(foot_table)
  const tr_in_foot =document.querySelector('.tfoot').getElementsByTagName('tr')
  for(let i = 0; i < tr_in_foot.length; i++) {
    const td = tr_in_foot[i].getElementsByTagName('td')[0]
    const f_tr = document.createElement('tr')
    f_tr.innerHTML = td.outerHTML
    head_table_tfoot.appendChild(f_tr)
  }
  leftbox.appendChild(foot_table)

  

  box.appendChild(leftbox)
}