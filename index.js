const fs = require('fs')
const re_placeholder = /class=['"][A-Za-z0-9\-]+['"]/
const re_classnames = /^class=['"]([A-Za-z0-9\-\s]+)['"]$/

const _process = (html, cssFileContent) => {
  const classNames = re_placeholder.exec(html)
  if (classNames === null) return html
  return _process(html.replace(re_placeholder, mapStyle(classNames, cssFileContent)), cssFileContent)
}

const getClassList = (classNames) => {
  const result = re_classnames.exec(classNames)
  return result[1].split(/\s+/)
}

const mapStyle = (classNames, cssFileContent) => {
  let style = ''
  const classList = getClassList(classNames)
  classList.forEach(className => {
    const re = new RegExp('\\.' + className + '{([A-Za-z0-9\-\:\;\'\"]+)}')
    const result = re.exec(cssFileContent)
    if (result.length > 1) {
      style += result[1]
    }
  })

  return `style="${style}"`
}

class StyleRetriever {
  constructor (cssFile) {
    this.cssFileContent = fs.readFileSync(cssFile, 'utf-8').replace(/\s+/g, '')
    // console.log('cssFileContent => ', this.cssFileContent)
  }

  process (html) {
    return _process(html, this.cssFileContent)
  }
}

module.exports = StyleRetriever
