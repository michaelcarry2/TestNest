import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { IUser } from '@Libs/user-caller';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<IUser> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      this.logger.error('user not valid');
      throw new UnauthorizedException();
    }

    return user;
  }
}
