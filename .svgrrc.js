module.exports = {
  // SVGR Configuration
  // https://react-svgr.com/docs/options/

  // Префикс для экспортируемых компонентов
  icon: true,

  // Заменяем stroke="currentColor" на токены
  replaceAttrValues: {
    'currentColor': '{getColor()}'
  },

  // Удаляем атрибуты width и height
  svgProps: {
    width: '{getSize()}',
    height: '{getSize()}',
    'aria-hidden': 'true'
  },

  // Настройки для TypeScript
  typescript: true,

  // Настройки для JSX
  jsx: {
    babelConfig: {
      plugins: []
    }
  },

  // Префикс для файлов
  index: false,

  // Настройки экспорта
  exportType: 'default',

  // Настройки для именования
  filenameCase: 'pascal',

  // Удаляем ненужные атрибуты
  removeViewBox: false,

  // Настройки для стилей
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            // Удаляем width и height
            removeViewBox: false,
            // Сохраняем stroke-width как strokeWidth
            convertShapeToPath: false,
            // Сохраняем stroke-linecap и stroke-linejoin
            convertPathData: false
          }
        }
      }
    ]
  }
};

