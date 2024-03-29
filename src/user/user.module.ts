import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule,forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers:[UserController],
  exports:[UserService]
})
export class UserModule {}
