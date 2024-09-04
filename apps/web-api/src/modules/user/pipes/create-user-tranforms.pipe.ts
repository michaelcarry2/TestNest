import { UserCallerService } from '@Libs/user-caller';
import {
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserTransformPipe implements PipeTransform {
  private readonly logger = new Logger(CreateUserTransformPipe.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userCallerService: UserCallerService,
  ) {}

  async transform(body: CreateUserDto): Promise<CreateUserDto> {
    const { username, password } = body;
    const user = await this.userCallerService.getByUsername(username);

    if (user) {
      throw new BadRequestException({
        message: 'User is already exist',
        data: username,
      });
    }

    const hashSize = this.configService.get<number>('authentication.hashSize');
    const hashedPassword = await bcrypt.hash(password, hashSize);

    return { ...body, password: hashedPassword };
  }
}
