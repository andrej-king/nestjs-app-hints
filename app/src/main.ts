import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  await app.listen(parseInt(process.env.PORT || '3000', 10))
}
bootstrap()
