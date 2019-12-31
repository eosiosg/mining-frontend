export function timeDiff (from: number, to: number): number[] {
  let diff = to - from;
  const secondsMilli = 1000;
  const minutesMilli = 60 * secondsMilli;
  const hourMilli = 60 * minutesMilli;
  const dayMilli = 24 * hourMilli;
  
  const milliArray = [dayMilli, hourMilli, minutesMilli, secondsMilli];
  const res: number[] = [];
  
  milliArray.forEach((milli, index) => {
    if (diff < 0) {
      res[index] = 0;
      return
    }
    let curr = diff % milli;
    res[index] = (diff - curr) / milli;
    diff = curr;
  })
  return res;
}
function twoDigits(value: number) {
  return value > 9 ? `${value}` : `0${value}`
}

export function timeFormat(time: number | undefined) {
  if(typeof time ==='undefined') return '';
  const date = new Date(time)
  return `${date.getFullYear()}-${twoDigits(date.getMonth()+1)}-${twoDigits(date.getDate())} ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`
}