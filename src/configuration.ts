import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

//
const CONFIG = {
  ALPHA_BASKET_REST_URL: 'http://localhost:8090',
}

// Load config from local file
try {
  const CONFIG_LOCAL = require('./config.json')
  Object.keys(CONFIG).forEach((key) => {
    CONFIG[key] = CONFIG_LOCAL[key] || CONFIG[key]
  })

} catch (error) {
  LOGGER.warn('Failed to load config.json')
}

// Load config from env
try {
  if (process.env.ALPHA_BASKET_REST_URL) {
    CONFIG.ALPHA_BASKET_REST_URL = process.env.ALPHA_BASKET_REST_URL
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('== -----------------------------')
Object.keys(CONFIG).forEach((key) => console.log(`== ${key}: ${CONFIG[key]}`))
console.log('== -----------------------------')

export default CONFIG
