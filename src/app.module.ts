import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    AuthModule, ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    ClientModule,
    CarModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
