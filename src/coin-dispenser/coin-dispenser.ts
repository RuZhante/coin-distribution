export const coinDispenser = <
  Obj extends Record<string, number>,
  Key extends keyof Obj,
>(
  coinAvailable: Obj,
  participantsRequested: Array<Key | string>,
) => {
  const countParticipants = participantsRequested.length;
  const countCoins = Object.values(coinAvailable).reduce((a, b) => a + b, 0);

  if (countCoins < countParticipants) {
    return null;
  }

  const coins: Record<string, number> = JSON.parse(
    JSON.stringify(coinAvailable),
  );

  const participantsRequestedArr = participantsRequested.map((item) => {
    const coin = item.toString();
    if (coin.includes('/')) {
      return coin.split('/');
    }

    return coin;
  });

  const result: string[] = [];

  for (const item of participantsRequestedArr) {
    if (Array.isArray(item)) {
      const max: [string, number][] = [];

      item.forEach((item) => max.push([item, coins[item]]));

      const [coinName, countCoins] = max.sort((a, b) => a[1] - b[1])[
        max.length - 1
      ];

      if (countCoins < 1) {
        break;
      }

      coins[coinName] -= 1;
      result.push(coinName);
    } else {
      if (coins[item] < 1) {
        break;
      }

      coins[item] -= 1;

      result.push(item);
    }
  }

  return result.length < participantsRequested.length ? null : result;
};
