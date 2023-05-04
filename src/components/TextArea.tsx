import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}
const comunStyles = { border: 0, height: '200px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'introducir texto'
  if (loading === true) return 'cargando'
  return 'traduccion'
}
export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.From
    ? comunStyles
    : { ...comunStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }
  return (
        <Form.Control
            as='textarea'
            autoFocus={type === SectionType.From}
            placeholder={getPlaceholder({ type, loading })}
            value={value}
            style={styles}
            disabled={type === SectionType.To}
            onChange={handleChange}
        />)
}
