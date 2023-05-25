export function coinConverter(
  fromPrice: bigint,
  toPrice: bigint,
  amount: bigint,
): string {
  if (
    typeof fromPrice !== 'bigint' ||
    typeof toPrice !== 'bigint' ||
    typeof amount !== 'bigint'
  ) {
    throw new TypeError('Неверный тип аргументов. Ожидаемый тип: BigInt');
  }

  if (fromPrice <= 0n || toPrice <= 0n || amount <= 0n) {
    throw new RangeError('Аргументы должны быть больше нуля.');
  }

  // Умножаем цену за единицу конвертируемой криптовалюты (toPrice) на количество конвертируемых единиц (amount),
  // что даст нам общую стоимость в центах.
  const totalAmount = toPrice * amount;

  // Вычисляем результат деления общей стоимости (totalAmount) на цену за единицу исходной криптовалюты (fromPrice).
  // Мы используем BigInt-арифметику, чтобы сохранить максимальную точность вычислений.
  const result = totalAmount / fromPrice;

  // Проверяем, является ли результат конечным числом, с помощью метода isFinite().
  if (!isFinite(Number(result))) {
    throw new Error(
      'Ошибка конвертации. Результат не является конечным числом.',
    );
  }

  // Преобразуем результат в строку с помощью метода toString(), чтобы сохранить максимальную точность.
  return result.toString();
}
