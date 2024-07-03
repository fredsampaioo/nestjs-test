import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcryptjs";
import * as nodemailer from 'nodemailer';
import { CreateUserDto } from "../users/create-user.dto";
import { User } from "../users/users.schema";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    console.log(payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create(createUserDto);
  }

  async recoverPassword(email: string): Promise<void> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sampaiofrd@gmail.com',
          pass: '*******',
        },
      });

      const mailOptions = {
        from: 'sampaiofrd@gmail.com',
        to: user.email,
        subject: 'Password Recovery',
        text: `Your password is: ${user.password}`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      //o disparo de email nao vai funcionar mesmo ne, eh so um exemplo.
      return;
    }
  }
}
