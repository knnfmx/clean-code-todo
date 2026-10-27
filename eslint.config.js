import js from '@eslint/js'
import prettier from 'eslint-config-prettier' // Отключаем конфликты
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.browser, // Разрешаем браузерные глобальные переменные document, window
      },
    },
    rules: {
      //
    },
  },
  prettier,
]
