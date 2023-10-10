import { type VueMessageType, type LocaleMessages, createI18n } from 'vue-i18n'

const fileNameToLocaleModuleDict = import.meta.glob('./locales/*.json', { eager: true })

const messages: { [P: string]: LocaleMessages<VueMessageType> } = {}

Object.entries(fileNameToLocaleModuleDict)
  .map(([fileName, localeModule]) => {
    const fileNameParts = fileName.split('/')
    const fileNameWithoutPath = fileNameParts[fileNameParts.length - 1]
    const localeName = fileNameWithoutPath.split('.json')[0]

    return [localeName, localeModule.default]
  })
  .forEach((localeNameLocaleMessagesTuple) => {
    messages[localeNameLocaleMessagesTuple[0]] = localeNameLocaleMessagesTuple[1]
  })

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})
