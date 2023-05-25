/**
 * Converts a certain amount of cryptocurrency from one type to another based on their respective prices.
 * @param {bigint} fromPrice - The price of one unit of the initial cryptocurrency.
 * @param {bigint} toPrice - The price of one unit of the desired cryptocurrency.
 * @param {bigint} amount - The amount of cryptocurrency to convert.
 * @returns {string} - The converted amount of cryptocurrency in the desired type, with maximum precision.
 * @throws {TypeError} - If any of the arguments is not of type BigInt.
 * @throws {RangeError} - If any of the arguments is less than or equal to zero.
 * @throws {Error} - If the result of the conversion is not a finite number.
 */
export function coinConverter(
  fromPrice: bigint,
  toPrice: bigint,
  amount: bigint,
): string {
  // Check if all arguments are of type BigInt, and throw an error if not.
  if (
    typeof fromPrice !== 'bigint' ||
    typeof toPrice !== 'bigint' ||
    typeof amount !== 'bigint'
  ) {
    throw new TypeError('Invalid argument type. Expected type: BigInt');
  }

  // Check if any of the arguments is less than or equal to zero, and throw an error if so.
  if (fromPrice <= 0n || toPrice <= 0n || amount <= 0n) {
    throw new RangeError('Arguments must be greater than zero.');
  }

  // Multiply the price per unit of the desired cryptocurrency by the amount of cryptocurrency to convert,
  // which gives us the total value.
  const totalAmount = toPrice * amount;

  // Divide the total value (totalAmount) by the price per unit of the initial cryptocurrency (fromPrice).
  const result = totalAmount / fromPrice;

  // Check if the result is a finite number using the isFinite() method, and throw an error if not.
  if (!isFinite(Number(result))) {
    throw new Error('Conversion error. The result is not a finite number.');
  }

  // Convert the result to a string using the toString() method, to ensure maximum precision.
  return result.toString();
}
