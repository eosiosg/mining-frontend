type DateKey = keyof Date

export function timeDiff(from: number, to: number): Array<number> {
  let res: Array<number> = [];
  let fromDate = new Date(from)
  let toDate = new Date(to)
  let a = toDate.getUTCDate
  let methodArray: Extract<DateKey, "getUTCDate" | 'getUTCHours' | 'getUTCMinutes'| 'getUTCSeconds'>[] = [
    "getUTCDate", 
    "getUTCHours", 
    "getUTCMinutes", 
    "getUTCSeconds"
   ]
  methodArray.forEach((fn, i) => {
    res[3 - i] = toDate[fn]() - fromDate[fn]();
  })
  return res
}
let a= [59,59,23]
let diff = timeDiff(1574834400000,1575108117320)
function minus(level: number, diff: number[]) {
 
  diff[level] = diff[level] - 1;
  if (diff[level] > -1) return;
  diff[level] = a[level];
  minus(level+1, diff)
  
}
