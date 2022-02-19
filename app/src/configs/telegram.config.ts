import {ITelegramOptions} from '../telegram/telegram-options.interface'

export const getTelegramConfig = (): ITelegramOptions => {
  return {
    token: '',
    chatId: '',
  }
}
