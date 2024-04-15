import { GetStartedButton } from './components/get-started-button'

import { Container } from './components/container'

export default function Page() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Container>
        <GetStartedButton />
      </Container>
    </div>
  )
}
