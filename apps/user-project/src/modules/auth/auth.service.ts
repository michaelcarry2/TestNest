import { IUser, JwtSignInterface } from '@Libs/user-caller';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  login = async (payload: { user: IUser }): Promise<JwtSignInterface> => {
    const { user } = payload;

    const jwtOptions: JwtSignOptions = {
      secret: this.configService.get('authentication.secret'),
    };

    return {
      accessToken: this.jwtService.sign(
        { username: user.username },
        jwtOptions,
      ),
    };
  };
}
