import { forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '../app.module';
import { User, UserModule } from '../user';
import { UtilsModule } from '../utils';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';

// TODO: add more tests based on https://github.com/nestjs/nest/blob/master/sample/19-auth-jwt/src/auth/auth.service.spec.ts
// TODO: I need mock db for this
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UserModule),
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('jwt.secret'),
            signOptions: { expiresIn: '30s' },
          }),
          inject: [ConfigService],
        }),
        AppModule,
        UtilsModule,
      ],
      providers: [
        LocalStrategy,
        JwtStrategy,
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {}, // FIXME: Mock the repository
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
