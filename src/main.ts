import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({       // this globalizes the validation file across every file 
    whitelist: true,   // prevents unwanted breach to your post
    forbidNonWhitelisted: true,
    transform: true  // confirm that instance of body is same as the outcome
  })) 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
