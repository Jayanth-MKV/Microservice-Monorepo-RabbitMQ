import { Injectable, Logger } from '@nestjs/common';
import { DbRepository } from '@app/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersRepository extends DbRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(User.name) UserModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(UserModel, connection);
  }
}