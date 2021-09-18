import faces from '@/assets/js/face'

const escapeHtml = (val = '') => {
  if (!val) return ''
  // faces translate
  let result = val
  const face = /\sface\[\W{1,}]/g
  if (face.test(result)) {
    const group = result.match(face)
    group.map((item) => {
      const key = item.match(/\[\S+\]/g)[0]
      result = result.replace(item, `<img src="${faces[key]}">`)
    })
  }
  // image translate
  const img = /img\[\S+\]/g
  if (img.test(result)) {
    const group = result.match(img)
    group.map((item) => {
      result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}">`)
    })
  }

  // link translate a(link)[title]
  const link = /\sa\(\S+\]/g
  if (link.test(link)) {
    const group = result.match(link)
    const title = /\((.+)\)/
    const linkName = /\[(.+)\]/
    group.map((item) => {
      const nameGroup = item.match(linkName)
      let name = ''
      if (nameGroup.length > 0) {
        name = nameGroup[1]
      }
      const linkGroup = item.match(title)
      let link = ''
      if (linkGroup.length > 0) {
        link = linkGroup[1]
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`)
    })
  }
  // quote translate
  result = result.replace(/\[quote\]/g, '<div class="layui-elem-quote">')
  result = result.replace(/\[\/quote\]/g, '</div>')
  return result
}

export {
  escapeHtml
}
