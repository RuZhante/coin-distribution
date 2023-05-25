import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CoinExchangeQueryDto, CoinExchangeResponseDto } from '../dtos';
import { DefaultCoins } from '../enum';
import { CoinConvertService } from './coin-convert.service';
import { CoinPriceService, CoinResponse } from './coin-price.service';

@Injectable()
export class CoinExchangeService {
  private readonly logger = new Logger(CoinExchangeService.name);

  // define a constant with an error message when there is no information about coins
  private readonly noInformationErrorMessage =
    'There is no information for these coins.';

  constructor(
    private readonly coinPriceService: CoinPriceService,
    private readonly coinConvertService: CoinConvertService,
  ) {}

  // method for coin conversion
  async coinExchange(
    query: CoinExchangeQueryDto,
  ): Promise<CoinExchangeResponseDto> {
    const { amount = 1, from, to = DefaultCoins.tether } = query;

    try {
      const coinsPrices = await this.getCoinPrices(); // get coin prices
      const filteredResult = this.filterCoins(coinsPrices, from, to); // filter coins based on given parameters
      return this.coinConvertService.convertCoin(filteredResult, {
        amount,
        from,
        to,
      });
    } catch (error) {
      this.logger.error(error); // log the error
      throw error; // rethrow the error for middleware to handle
    }
  }

  // method for getting coin prices
  private async getCoinPrices() {
    const { data } = await this.coinPriceService.getCoinsPrices();
    return data;
  }

  // method for filtering coins based on given parameters
  private filterCoins(
    coinsPrices: CoinResponse['data'],
    from: string,
    to: string,
  ) {
    const filteredResult = coinsPrices.filter((coin) => {
      if (from === to) {
        return coin.key === from;
      }
      return from === coin.key || to === coin.key;
    });

    // if the filtering result is empty, throw a BadRequestException error
    if (filteredResult.length < 1) {
      throw new BadRequestException(this.noInformationErrorMessage);
    }

    // if the filtering result consists of only one coin that doesn't match either `from` or `to`, also throw a BadRequestException error
    if (
      filteredResult.length === 1 &&
      filteredResult[0].key !== from &&
      filteredResult[0].key !== to
    ) {
      throw new BadRequestException(this.noInformationErrorMessage);
    }

    return filteredResult;
  }
}
