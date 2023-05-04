import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Row, Col } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App () {
  const {
    interchangeLanguage,
    setFromLanguage,
    setToLanguage,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    loading
  } = useStore()

  useEffect(() => {
    if (fromText === '') return
    translate({ fromLanguage, toLanguage, text: fromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('error') })
  }, [fromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <h2>from</h2>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage} />
          {fromLanguage}
          <TextArea
            type={SectionType.From}
            value={fromText}
            onChange={setFromText} />
        </Col>
        <Col>
          <Button onClick={interchangeLanguage}>
            +
          </Button>
        </Col>
        <Col>
          <h2>To</h2>
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage} />
          {toLanguage}
          <TextArea
            type={SectionType.To}
            loading={loading}
            value={result}
            onChange={setResult}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
