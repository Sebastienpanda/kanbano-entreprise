import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: true,
        })
    );
    app.setGlobalPrefix('/api');
    const config = app.get(ConfigService);
    const port = Number(config.get('PORT'));
    await app.listen(port, '0.0.0.0');
}

bootstrap();
