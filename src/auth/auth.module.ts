import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';

@Module({
  imports:[ JwtModule.register({
    secret: process.env.JWT_SECRET ?? 'secret',
    global: true,
    signOptions: { expiresIn: '30m' },
  }),
  TypeOrmModule.forFeature([User]),],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
