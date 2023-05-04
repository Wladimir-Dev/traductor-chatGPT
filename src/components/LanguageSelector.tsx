import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGES, SUPPORTED_LANGUAGES } from '../constants'
import { type SectionType, type FromLanguage, type Language } from '../types'

type Props =
| { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
| { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector = ({ type, value, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language)
  }
  return (
        <Form.Select aria-label="selecione un idioma" onChange={handleChange} value={value}>
            {type === 'from' && <option value={AUTO_LANGUAGES}>Detectar Idioma</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
            ))
            }
        </Form.Select>
  )
}
