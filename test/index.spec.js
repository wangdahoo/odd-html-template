const path = require('path')
const StyleRetriever = require('../index')
const cssFile = path.join(__dirname, './quill.css')
const retriver = new StyleRetriever(cssFile)
const sourceHtml = `<p><strong>粗体</strong></p><p class="ql-align-center">对齐：中</p><p class="ql-align-right">对齐：右</p><p class="ql-align-justify">对齐：两端</p><p><br></p><h1>标题1</h1><h2>标题2</h2><h3>标题3</h3><h4>标题4</h4><h5>标题5</h5><p><br></p><p><span style="color: rgb(230, 0, 0);">红色</span></p><p><br></p>`
const html = `<p><strong>粗体</strong></p><p style="text-align:center;">对齐：中</p><p style="text-align:right;">对齐：右</p><p style="text-align:justify;">对齐：两端</p><p><br></p><h1>标题1</h1><h2>标题2</h2><h3>标题3</h3><h4>标题4</h4><h5>标题5</h5><p><br></p><p><span style="color: rgb(230, 0, 0);">红色</span></p><p><br></p>`
test('retrieve style', () => {
  return expect(retriver.process(sourceHtml)).toBe(html)
})
