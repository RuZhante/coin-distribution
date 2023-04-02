import { BadRequestException, Injectable } from '@nestjs/common';
import { CoinExchangeQueryDto } from '../dtos';
import { DefaultCoins } from '../enum';
import { CoinConvertService } from './coin-convert.service';
import { CoinPriceService } from './coin-price.service';

@Injectable()
export class CoinExchangeService {
  constructor(
    private readonly coinPriceService: CoinPriceService,
    private readonly coinConvertService: CoinConvertService,
  ) {}

  async coinExchange(query: CoinExchangeQueryDto) {
    const { amount = 1, from, to = DefaultCoins.tether } = query;

    const { data } = await this.coinPriceService.getCoinsPrices();

    const filteredResult = data.filter((coin) => {
      if (from === to) {
        return coin.key === from;
      }

      return from === coin.key || to === coin.key;
    });

    if (filteredResult.length < 1) {
      throw new BadRequestException('There is no information for these coins.');
    }

    if (
      filteredResult.length === 1 &&
      (filteredResult[0].key !== from || filteredResult[0].key !== to)
    ) {
      throw new BadRequestException('There is no information for these coins.');
    }

    return this.coinConvertService.convertCoin(filteredResult, {
      amount,
      from,
      to,
    });
  }
}
