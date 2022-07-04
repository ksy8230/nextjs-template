// n자리 0,1로된 난수 만들기
export const makeRandomNumber = (n: number) => {
  let string = "";
  for (let i = 0; i < n; i += 1) {
    const oneOrZero = Math.random() > 0.5 ? 1 : 0;
    string += oneOrZero;
  }
  return string;
};
