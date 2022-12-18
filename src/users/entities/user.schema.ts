import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, LeanDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;
export type UserOmitPasswordHash = Omit<User, "passwordHash">;
export type LeanUserDocument = LeanDocument<User>;

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
      dateFormat: Object,
      separator: String,
      weekdayFormat: Object,
      language: Object,
    })
  )
  settings!: {
    default: {
      apiKey: "";
      hoursAppend: "";
      dateHeader: "";
      hoursHeader: "";
      dateFormat: {
        name: "DD-MM-YYYY";
        value: "en-UK";
      };
      separator: "";
      weekdayFormat: {
        name: "Not included";
        value: "none";
      };
      language: {
        name: "English";
        value: "en-US";
      };
    };
  };
}
export const UserSchema = SchemaFactory.createForClass(User);
