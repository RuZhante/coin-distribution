import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { DefaultAmount, DefaultCoins } from '../enum';

export class CoinExchangeQueryDto {
  @ApiProperty({
    required: false,
    default: DefaultAmount,
    description: `The number of coins to be converted. Optional, default '${DefaultAmount}'`,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({
    required: true,
    description: `The key of the coin from which we are converting`,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  from: string;

  @ApiProperty({
    required: false,
    default: DefaultCoins.tether,
    description: `The key of the coin to which we are converting. Optional, default '${DefaultCoins.tether}'`,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  to: string;
}

export class CoinExchangeResponseDto
  implements Pick<CoinExchangeQueryDto, keyof CoinExchangeQueryDto>
{
  amount: number;
  from: string;
  to: string;
  result: number;

  static create(props: CoinExchangeResponseDto): CoinExchangeResponseDto {
    return Object.assign(new CoinExchangeResponseDto(), props);
  }
}
