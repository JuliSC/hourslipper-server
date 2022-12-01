import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;
export type UserOmitPasswordHash = Omit<User, "passwordHash">;

@Schema()
export class User {
  _id: string;

  @Prop()
  username!: string;

  @Prop()
  isAdmin!: boolean;

  @Prop({ unique: true })
  email!: string;

  @Prop()
  passwordHash!: string;

  @Prop(
    raw({
      apiKey: String,
      hoursAppend: String,
      dateHeader: String,
      hoursHeader: String,
      dateFormat: String,
      separator: String,
      weekdayFormat: String,
      language: String,
    })
  )
  settings!: {
    default: {
      apiKey: "";
      hoursAppend: "";
      dateHeader: "";
      hoursHeader: "";
      dateFormat: "";
      separator: "";
      weekdayFormat: "";
      language: "";
    };
  };
}
export const UserSchema = SchemaFactory.createForClass(User);
