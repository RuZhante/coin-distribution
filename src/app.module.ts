import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinExchangeModule } from './coin-exchange/coin-exchange.module';

@Module({
  imports: [
    CoinExchangeModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 60000, // milliseconds
      max: 100,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
