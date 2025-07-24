import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }

      const { user } = context.switchToHttp().getRequest();

      if (!user || !user.role) {
        throw new UnauthorizedException('Foydalanuvchi yoki roli mavjud emas');
      }
      

      if (!requiredRoles.includes(user.role)) {
        throw new UnauthorizedException(
          'Sizga tegishli role emas: ' + requiredRoles.join(','),
        );
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
