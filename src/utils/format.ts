export function floor(num: number) {
  return Math.floor(num)
}

function formatTwoPad(num: number) {
  num = Math.floor(num)
  return String(num).padStart(2, '0')
}

export function formatTime(time: number) {
  console.log(time);
  
  if (time < 60) return `00:${formatTwoPad(time)}`
  if (time < 3600) {
    return formatTwoPad(time / 60) + ':' + formatTwoPad(time % 60)
  }
  const h = Math.floor(time / 3600)
  const m = Math.floor((time - h * 3600) / 60)
  const s = Math.floor(time % 60)
  return formatTwoPad(h) + ':' + formatTwoPad(m) + ':' + formatTwoPad(s)
}
