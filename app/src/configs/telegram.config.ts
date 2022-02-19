import {ITelegramOptions} from '../telegram/telegram.interface'
import {ConfigService} from '@nestjs/config'

export const getTelegramConfig = (
  configService: ConfigService,
): ITelegramOptions => {
  const token = configService.get('TELEGRAM_BOT_TOKEN')
  if (!token) {
    throw new Error('Telegram token not set')
  }
  return {
    token,
    chatId: configService.get('TELEGRAM_CHAT_ID') ?? '',
  }
}
