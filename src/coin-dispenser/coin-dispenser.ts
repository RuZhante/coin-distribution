/**
 * Function for dispensing coins from a common fund based on participants' requests
 * @param coinAvailable - available coins in the fund
 * @param participantsRequested - list of desired coins for each participant
 * @returns list of coins dispensed to participants, or null if requested coins are insufficient
 */
export const coinDispenser = <
  Obj extends Record<string, number>, // Object type {coinName: countCoins}
  Key extends keyof Obj, // Type for coin name (coinName)
>(
  coinAvailable: Obj,
  participantsRequested: Array<Key | string>,
): string[] | null => {
  const countParticipants = participantsRequested.length;
  const countCoins = Object.values(coinAvailable).reduce((a, b) => a + b, 0);

  if (countCoins < countParticipants) {
    // Check if count of coins is less than count of participants
    return null; // If there aren't enough coins, return null
  }

  // Create a copy of the object with available coins so as not to modify the original object
  const coins: Record<string, number> = JSON.parse(
    JSON.stringify(coinAvailable),
  );

  // Transform the array of desired coins for each participant
  const participantsRequestedArr = participantsRequested.map((item) => {
    const coin = item.toString();
    if (coin.includes('/')) {
      // If there is a slash '/', it means the participant wants multiple coins of the same denomination
      return coin.split('/');
    }

    return coin;
  });

  const result: string[] = []; // Array for storing dispensed coins

  for (const item of participantsRequestedArr) {
    // Iterate over the list of desired coins for each participant
    if (Array.isArray(item)) {
      // If it's an array, it means the participant requested multiple coins of the same denomination
      const max: [string, number][] = [];

      item.forEach((item) => max.push([item, coins[item]])); // Add a pair "coin name - count of coins" to the array

      // Sort in reverse order by count of coins and take the first element (the coin with the highest count)
      const [coinName, countCoins] = max.sort((a, b) => a[1] - b[1])[
        max.length - 1
      ];

      if (countCoins < 1) {
        // If count of coins is 0, stop execution
        break;
      }

      coins[coinName] -= 1; // Decrease count of coins in fund by 1
      result.push(coinName); // Add the coin to the list of dispensed coins
    } else {
      // If it's not an array, it means the participant requested a single coin
      if (coins[item] < 1) {
        // If count of coins is 0, stop execution
        break;
      }

      coins[item] -= 1; // Decrease count of coins in fund by 1
      result.push(item); // Add the coin to the list of dispensed coins
    }
  }

  return result.length < participantsRequested.length ? null : result; // If not all participants received their requested coins, return null; otherwise, return the list of coins
};
