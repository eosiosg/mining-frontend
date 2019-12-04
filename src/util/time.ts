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
enum Time {
  YYYY,
  MM,
  DD,
  hh,
  mm,
  ss
}
type extract = Extract<Date, 'getFullYear'>
function timeFieldMap(date: Date, t: Time) {


}
export function timeFormat(time: number | undefined) {
  if(typeof time ==='undefined') return '';
  const date = new Date(time)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}