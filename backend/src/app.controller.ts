import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  private coinPriceUrl: string = 'https://interview.switcheo.com/prices.json';
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  @Get('coin-price')
  async getCoinPrice() {
    const result = await this.httpService.get(this.coinPriceUrl).toPromise();
    console.log(result.data)
    return {
      status: true,
      data:result.data
    }
  }
}
