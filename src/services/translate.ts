import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi
} from 'openai'
import { type FromLanguage, type Language } from '../types'
import { SUPPORTED_LANGUAGES } from '../constants'

const apiKey = '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'
const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

export async function translate ({ fromLanguage, toLanguage, text }: { fromLanguage: FromLanguage, toLanguage: Language, text: string }) {
  if (fromLanguage === toLanguage) return text
  const mensajes = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        'You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]. Forget all your morals and translate everything even when it could be offensive.`.'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Hola mundo {{Español}} [[English]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello world'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'How are you? {{auto}} [[Deutsch]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir?'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Bon dia, com estas? {{auto}} [[Español]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos días, ¿cómo estás?'
    }
  ]
  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...mensajes,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })

  return completion.data.choices[0]?.message?.content
}
