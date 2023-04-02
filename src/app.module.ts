import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinExchangeModule } from './coin-exchange/coin-exchange.module';

@Module({
  imports: [CoinExchangeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
