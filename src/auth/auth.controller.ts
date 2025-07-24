import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a user' })
  async create(@Body() registerDto: RegisterDto) {
    try {
      const user = await this.authService.register(registerDto);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({ summary: 'Login to an account' })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(loginDto, '--contr');

    const { user, token, refreshToken } =
      await this.authService.login(loginDto);

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 3600 * 24 * 10,
    });

    res
      .status(HttpStatus.OK)
      .json({ status: 'Success', data: { user, token } });
  }
  
}
