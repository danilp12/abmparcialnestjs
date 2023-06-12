import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
// Aca va la conexion con la base de datos

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'',
      database:'ABM',
      entities:[User],
      synchronize:false,
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
