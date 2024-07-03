import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import * as process from "process";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: undefined,
      useFactory: async () => ({
        secret: `${process.env.JWT_SECRET}`,
        signOptions: { expiresIn: "60m" }
      })
    }),
    UsersModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {
}
