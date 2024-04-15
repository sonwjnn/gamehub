import { Content } from './_components/content'
import { Sidebar } from './_components/sidebar'

export default function PageProfile() {
  return (
    <main className="w-full h-full z-20 ">
      <div className="boding_main">
        <Sidebar />
        <Content />
      </div>
    </main>
  )
}
