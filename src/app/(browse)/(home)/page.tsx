import { Container } from './components/container'
import { HomeContent } from './components/home-content'

import '@/styles/css/styles.css'

export default function Page() {
  return (
    <div className="home">
      <Container>
        <HomeContent />
      </Container>
    </div>
  )
}
