import { Content } from './_components/content'
import { Sidebar } from './_components/sidebar'

export default function PageProfile() {
  return (
    <main className="w-full h-dvh z-20 ">
      <div className="boding_main relative">
        <Sidebar />
        <Content />
      </div>
    </main>
  )
}
