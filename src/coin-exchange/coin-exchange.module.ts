import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CoinExchangeController } from './controllers';
import {
  CoinConvertService,
  CoinExchangeService,
  CoinPriceService,
} from './services';

@Module({
  imports: [HttpModule],
  controllers: [CoinExchangeController],
  providers: [CoinExchangeService, CoinPriceService, CoinConvertService],
})
export class CoinExchangeModule {}
