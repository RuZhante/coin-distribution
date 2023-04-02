import { coinDispenser } from './coin-dispenser';

describe('Test coin dispenser function', () => {
  const testCases = [
    {
      title: 'positive test',
      coinAvailable: { TRON: 10, ETH: 7, MATIC: 8 },
      participantsRequested: ['TRON/ETH', 'MATIC', 'TRON', 'MATIC/TRON'],
    },
    {
      title: 'negative test',
      coinAvailable: { TRON: 1, ETH: 1, MATIC: 1 },
      participantsRequested: ['TRON/ETH', 'MATIC', 'TRON', 'ETH'],
    },
  ];

  testCases.forEach((test, index) => {
    it(`${test.title}`, () => {
      const result = coinDispenser(
        test.coinAvailable,
        test.participantsRequested,
      );

      if (index === 0) {
        expect(result).not.toBeNull();
      } else {
        expect(result).toBeNull();
      }
    });
  });
});
