import { Controller, Get, UseGuards } from '@nestjs/common';
import { MainAppService } from './main_app.service';
import { JwtAuthGuard } from '@app/common';

@Controller()
export class MainAppController {
  constructor(private readonly mainAppService: MainAppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): Promise<string> {
    return this.mainAppService.getHello();
  }
}
