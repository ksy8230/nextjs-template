export const transCode = (
  array: { code: number | string; name: string }[],
  code: number | string
) => {
  const findIdx = array.findIndex(
    (item: { code: number | string; name: string }) => Number(item.code) == code
  );
  const value = array[findIdx].name;
  return value;
};
