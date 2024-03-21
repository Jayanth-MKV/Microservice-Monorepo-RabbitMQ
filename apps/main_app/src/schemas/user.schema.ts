import { DbDocument } from '@app/common';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class User extends DbDocument {
  @Prop()
  name: string;
  
  @Prop()
  email: string;

  @Prop()
  department: string;

  @Prop()
  password: string;

  @Prop()
  roll: string;
}

export const UserSchema = SchemaFactory.createForClass(User);