import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ObjectId } from 'mongodb';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../schemas';
import { AuthService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY || '',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: { userId: ObjectId }) {
    const user: User = await this.authService.findById(payload.userId);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
