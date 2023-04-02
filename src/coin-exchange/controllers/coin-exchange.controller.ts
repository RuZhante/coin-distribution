import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoinExchangeQueryDto } from '../dtos';
import { CoinExchangeService } from '../services';

@ApiTags('Currency')
@Controller('currency')
export class CoinExchangeController {
  constructor(private readonly coinExchangeService: CoinExchangeService) {}

  @Get('convert/')
  async coinExchange(@Query() query: CoinExchangeQueryDto) {
    return this.coinExchangeService.coinExchange(query);
  }
}
