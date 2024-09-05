import { IUser, UserCallerService, UserStatusEnum } from '@Libs/user-caller';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userCallerService: UserCallerService,
  ) {}

  async validateUser(username: string, password: string): Promise<IUser> {
    const user = await this.userCallerService.getByUsername(username);

    if (!user) {
      this.logger.error(`user not found`);
      throw new UnauthorizedException();
    }

    if (user.status !== UserStatusEnum.ACTIVE) {
      this.logger.error(`user in active`);
      throw new UnauthorizedException();
    }

    const isMatchPassword = await this.comparePassword(password, user.password);

    if (!isMatchPassword) {
      this.logger.error(`password not matched`);
      throw new UnauthorizedException();
    }

    return user;
  }

  async comparePassword(original: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(original, hashed);
  }
}
