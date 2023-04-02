import { Injectable } from '@nestjs/common';
import { coinConverter } from 'src/utils';
import { CoinExchangeQueryDto, CoinExchangeResponseDto } from '../dtos';
import { CoinResponse } from './coin-price.service';

@Injectable()
export class CoinConvertService {
  convertCoin(coins: CoinResponse['data']['0'][], query: CoinExchangeQueryDto) {
    if (coins.length < 2) {
      return CoinExchangeResponseDto.create({
        amount: query.amount,
        from: coins[0].key,
        to: coins[0].key,
        result: Number((coins[0].price * query.amount).toFixed(1)),
      });
    }

    const [firstItem, secondItem] = coins;

    let fromPrice: number;
    let toPrice: number;

    if (firstItem.key === query.from) {
      fromPrice = firstItem.price;
      toPrice = secondItem.price;
    } else {
      fromPrice = secondItem.price;
      toPrice = firstItem.price;
    }

    const result = coinConverter(fromPrice, toPrice, query.amount);

    return CoinExchangeResponseDto.create({
      amount: query.amount,
      from: firstItem.key,
      to: secondItem.key,
      result: Number(result.toFixed(1)),
    });
  }
}
