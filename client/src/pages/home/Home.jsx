import './home.scss'
import Stories from '../../components/stories/Stories'
import Posts from '../../components/posts/Posts'
import Write from '../../components/write/Write'

function Home() {
  return (
    <div className='home'>
      <Stories/>
      <Write />
      <Posts />
    </div>
  )
}

export default Home