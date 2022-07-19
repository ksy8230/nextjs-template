export const transCode = (
  array: { code: number; name: string }[],
  code: number
) => {
  const findIdx = array.findIndex(
    (item: { code: number; name: string }) => Number(item.code) == code
  );
  const value = array[findIdx].name;
  return value;
};
