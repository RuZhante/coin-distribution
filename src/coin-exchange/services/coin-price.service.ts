import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';

// Define response type from API
export type CoinResponse = {
  data: [
    {
      key: string;
      price: number;
      volume: number;
    },
  ];
};

@Injectable()
export class CoinPriceService {
  // Initialize logger for service
  private readonly logger = new Logger(CoinPriceService.name);

  constructor(
    private readonly httpService: HttpService,
    // Inject cache manager into service constructor
    @Inject(CACHE_MANAGER) private cacheManager: Cache, // It is better to use redis
  ) {}

  async getCoinsPrices() {
    const cacheKey = 'coin_price_data';

    // Get data from cache if it exists
    const cachedData = await this.cacheManager.get<CoinResponse['data']>(
      cacheKey,
    );

    if (cachedData) {
      // If data exists in cache, return it without calling API
      return { data: cachedData };
    }

    // If data doesn't exist in cache, call API and write retrieved data to cache
    const {
      data: { data },
    } = await firstValueFrom(
      this.httpService
        .get<CoinResponse>('https://tstapi.cryptorank.io/v0/coins/prices/')
        .pipe(),
    );

    // Check that data is not empty
    if (data && data.length > 0) {
      await this.cacheManager.set(cacheKey, data);
      return { data };
    } else {
      this.logger.error('No data available');
      // If data is empty, throw an exception
      throw new Error('No data available');
    }
  }
}
