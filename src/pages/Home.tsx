import Navbar from '../components/Navbar'
import useMe from '../hooks/useMe'

export default function Home() {
  const me = useMe()
  return (
    <div className="homeBg h-screen">
      <Navbar me={me} />
    </div>
  )
}
