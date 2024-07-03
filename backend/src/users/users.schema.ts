import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Address {
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  zip: string;
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Address })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
