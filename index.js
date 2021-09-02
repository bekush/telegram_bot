const TelegramApi = require('node-telegram-bot-api')
const sequelize = require('./db')
const {UserDoctor, UserPatient, Cases} = require('./model')

const token = '1960774826:AAGUsLe_0MN4cp3AojHz2ad_IiWjuTY9pPg'

const bot = new TelegramApi(token, { polling: true })

const DocOrPatientOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Врач', callback_data: 'doctor'}],
      [{text: 'Пациент', callback_data: 'patient'}]
    ]
  })
}

const start = async () => {
  
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    bot.setMyCommands([
      { command: '/start', description: 'Запустить бот.' },
      { command: '/info', description: 'Описание бота. Инструкция.' },
      { command: '/location', description: 'Гда находится' }
    ])
    
    

    bot.on('message', async (msg) => {
      const text = msg.text
      const chatId = msg.chat.id
      
      
      if (text === '/start') {
        return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот по поиску врачей. Скажите пожалуйста вы врач или пациент?', DocOrPatientOptions)
      }
      
      try {
        const user = await UserDoctor.findOne({chatId})

        if (!user.first_name) {
          user.first_name = text
          await user.safe()
          return bot.sendMessage(chatId, 'Пожалуйста введите свою фамилию.')
        }

        if (user.first_name && !user.second_name) {
          user.second_name = text
          await user.safe()
          return bot.sendMessage(chatId, 'Теперь введите свою специализацию (н., врач-хирург или врач-кардиолог)')
        }

        if (user.second_name && !user.locationDataX && !user.locationDataY) {
          user.locationDataX = msg.location[0]
          user.locationDataY = msg.location[1]
          await user.safe()
          return bot.sendMessage(chatId, 'Все данные введены. Благодарим за сотрудничество!')
        }
      } catch (e) {
        bot.sendMessage('Не удается подключиться к базе данных при попытке ввода данных!')
      }

      if (text === '/info') {
        return bot.sendMessage(chatId, 'Этот бот предназначен для поиска свободных врачей рядом с вами, чтобы повысить эффективность оказываемой услуги и сэкономить ваше время.')
      }
      if (text === '/location') {
        return bot.sendLocation(chatId, 41.70965, 60.499938)
      }
      

    })

    bot.on('callback_query', async msg => {
      const isDoctor = msg.data
      const chatId = msg.message.chat.id

      if (isDoctor === 'doctor') {
        await UserDoctor.create({chatId})
        await bot.sendMessage(chatId, 'Добро пожаловать Доктор! Введите свое имя для регистрации, пожалуйста.')
      }
      

      if (isDoctor === 'patient') {

      }
      bot.sendMessage()
    })

  } catch (e) {

    console.log('Не удалось подключиться к базе данных!', e)
  }
  
  
}

start()