import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from './repositories';
import { User, UserSchema } from './schemas';
import { AuthService } from './services';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || '',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthRepository, AuthService, JwtStrategy, PassportModule],
  exports: [AuthRepository, AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
