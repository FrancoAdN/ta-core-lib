import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export class BaseSchema {
  _id: ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: String })
  createdBy: string;

  @Prop({ type: Date, default: null })
  updatedAt: Date;

  @Prop({ type: String, default: null })
  updatedBy: string;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({ type: String, default: null })
  deletedBy: string;

  constructor(baseSchema: Partial<BaseSchema>) {
    Object.assign(this, baseSchema);
  }
}
