import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IUser, JwtSignInterface } from '@Libs/user-caller';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({
    cmd: 'auth',
    method: 'login',
  })
  async login(@Payload() payload: { user: IUser }): Promise<JwtSignInterface> {
    return this.authService.login(payload);
  }
}
