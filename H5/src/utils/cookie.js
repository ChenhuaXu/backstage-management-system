/**
 * @description cookie读写
 */
// 存储
export function setCookie(cName, value, expireMinutes) {
  let date = new Date()
  date.setTime(date.getTime() + expireMinutes * 60 * 1000)
  document.cookie = `${cName}=${escape(value)}${expireMinutes === null ? '' : ';expires=' + date.toGMTString()}`
}

// 读取
export function getCookie(cName) {
  if (document.cookie && document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(`${cName}=`)
    if (cStart !== -1) {
      cStart += cName.length + 1
      let cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) {
        cEnd = document.cookie.length
      }
      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
}

// 删除
export function deleteCookie(cName) {
  let date = new Date()
  date.setTime(date.getTime() - 1)
  let cVal = getCookie(cName)
  if (cVal !== null) {
    document.cookie = `${cName}=${cVal};expires=${date.toGMTString()}`
  }
}
