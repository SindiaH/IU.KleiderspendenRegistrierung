
function padToDigits(num: number, totalLength: number) {
  return num.toString().padStart(totalLength, '0');
}

export const isHttpStatusOk = (status: number) => {
  return status >= 200 && status < 300;
}
