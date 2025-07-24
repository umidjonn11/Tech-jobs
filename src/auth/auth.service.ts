import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {  RegisterDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/update-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>,
  private readonly jwtService: JwtService,){}
 async register(createAuthDto: RegisterDto) {
    const user=this.userRepo.create(createAuthDto)
    return await this.userRepo.save(user)
  }

 async login(login_input:LoginDto) {
    const user = await this.validate(login_input.email,login_input.password)
    
    const token = await this.jwtService.signAsync({
      id: user?.id,
      role: user?.role,
      name: user?.name,
    });
    const refreshToken = await this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
      },
      { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' },
    );
    await this.updateUser(user.id, { refreshToken: refreshToken });

    return { user, token, refreshToken };
  }

  async validate(email:string,password:string) {
const user=await this.userRepo.findOne({where:{email},select:["email","password","name","role"]})
try{
  if(!user) throw new NotFoundException("User topilmadi")
    const checking=await compare(password,user.password)
  if(!checking) throw new BadRequestException("Parol xato")
    return user 
}catch(error){
  throw new Error(error)

}
  }
  async updateUser(id: string, updateData: any) {
    const user = await this.userRepo.findOneBy({ id });
    if (user) {
      Object.assign(user, updateData);
      await this.userRepo.save(user);
      return user;
    }
    throw new NotFoundException('User topilmadi');
  }
  async findOne(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User topilmadi');
    return user;
  }
}
