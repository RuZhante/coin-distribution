import { Injectable } from '@nestjs/common';
import { coinConverter } from 'src/utils';
import { CoinExchangeQueryDto, CoinExchangeResponseDto } from '../dtos';
import { CoinResponse } from './coin-price.service';

@Injectable()
export class CoinConvertService {
  convertCoin(
    coinsData: CoinResponse['data']['0'][],
    query: CoinExchangeQueryDto,
  ) {
    // Check if there is only one coin in the data. If yes, convert to the same coin.
    if (coinsData.length < 2) {
      const coin = coinsData[0];
      const amount = BigInt(query.amount);
      const price = BigInt(coin.price);

      // Calculate the total amount by multiplying the given amount with the coin's price.
      const totalAmount = price * amount;

      // Create a response DTO with the result and return it.
      return CoinExchangeResponseDto.create({
        amount: query.amount,
        from: coinsData[0].key,
        to: coinsData[0].key,
        result: totalAmount.toString(),
      });
    }

    // Otherwise, there are two coins in the data. Determine which one is "from" and which one is "to".
    const [fromCoin, toCoin] = coinsData;

    // Get the prices of the "from" and "to" coins based on the input query.
    const [fromPrice, toPrice] =
      fromCoin.key === query.from
        ? [fromCoin.price, toCoin.price]
        : [toCoin.price, fromCoin.price];

    // Convert the amount from the "from" coin to the "to" coin using the coinConverter function from utils.ts.
    const result = coinConverter(
      BigInt(fromPrice),
      BigInt(toPrice),
      BigInt(query.amount),
    );

    // Create a response DTO with the result and return it.
    return CoinExchangeResponseDto.create({
      amount: query.amount,
      from: fromCoin.key,
      to: toCoin.key,
      result,
    });
  }
}
