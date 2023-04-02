import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

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
  constructor(private readonly httpService: HttpService) {}
  async getCoinsPrices() {
    const {
      data: { data },
    } = await firstValueFrom(
      this.httpService
        .get<CoinResponse>('https://tstapi.cryptorank.io/v0/coins/prices/')
        .pipe(),
    );

    return {
      data,
    };
  }
}
