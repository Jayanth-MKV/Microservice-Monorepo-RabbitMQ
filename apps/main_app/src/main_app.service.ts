import { ClientProxy } from '@nestjs/microservices';
import { STUDENT_SERVICE } from './constants/services';
import { UsersRepository } from './repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MainAppService {
  constructor(
    private readonly usersRepository: UsersRepository,
    @Inject(STUDENT_SERVICE) private studentClient: ClientProxy,
  ) {}

  async getHello(): Promise<string> {
    // lastValueFrom(
    this.studentClient.emit('sayhello', {
      name: 'value iam sending'
    },
    );
    // );

    // console.log(d)


    return 'Main_app DONE';
  }
}
