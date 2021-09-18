const getElementY = (elem) => {
  return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}

/**
 * @param {String} elem DOM Element
 * @param {Number} duration Scroll Time
 * @param {Number} offset Scroll Length
 */
const scrollToElem = (elem, duration, offset) => {
  const startingY = window.pageYOffset
  const elementY = getElementY(elem)

  const diff = elementY - startingY + offset
  if (!diff) return
  const easing = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  let start
  window.requestAnimationFrame(function step (timestamp) {
    if (!start) start = timestamp
    const time = timestamp - start
    let percent = Math.min(time / duration, 1)
    percent = easing(percent)
    window.scrollTo(0, startingY + diff * percent)

    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

export { scrollToElem }
