import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/nterceptors/data-response/data-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    //this globalizes the validation file across every file
    new ValidationPipe({
      whitelist: true, // prevents unwanted breach to your post
      forbidNonWhitelisted: true,
      transform: true, // confirm that instance of body is same as the outcome
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Codeland Api') // Set the title of your work
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('lambo', app, document); // if u search localHost/lambo it'll show u swagger

  app.useGlobalInterceptors(new DataResponseInterceptor())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

