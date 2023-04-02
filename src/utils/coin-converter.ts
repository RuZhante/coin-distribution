export const coinConverter = (
  fromPrice: number,
  toPrice: number,
  amount: number,
) => {
  if (
    toPrice === null ||
    toPrice === undefined ||
    toPrice === Infinity ||
    toPrice === -Infinity ||
    toPrice <= 0 ||
    amount === null ||
    amount === undefined ||
    amount === Infinity ||
    amount === -Infinity ||
    amount <= 0 ||
    fromPrice === null ||
    fromPrice === undefined ||
    fromPrice === Infinity ||
    fromPrice === -Infinity ||
    fromPrice <= 0
  ) {
    return 0;
  }

  return parseFloat(Number((fromPrice * amount) / toPrice).toFixed(1));
};
