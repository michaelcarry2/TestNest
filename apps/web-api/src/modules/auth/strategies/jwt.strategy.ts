import { UserCallerService, UserStatusEnum } from '@Libs/user-caller';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userCallerService: UserCallerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('authentication.secret'),
    });
  }

  async validate(jwtPayload: any, done: any): Promise<void> {
    const { username } = jwtPayload;
    console.log(jwtPayload);
    const user = await this.userCallerService.getByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user?.status !== UserStatusEnum.ACTIVE) {
      throw new UnauthorizedException();
    }

    done(null, user);
  }
}
