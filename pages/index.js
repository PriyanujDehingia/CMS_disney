import {gql , GraphQLClient} from 'graphql-request'
import NavBar from '../components/NavBar';
import Section from '../components/Section';
import Link from 'next/Link';

export const getStaticProps = async() =>{
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url , {
    headers: {
      Authorization : process.env.GRAPH_CMS_TOKEN
    }
  })
const query = gql`
{
  videos {
    createdAt
    id
    title
    description
    seen
    slug
    tags
    thumbnail {
      url
    }
    mp4 {
      url
    }
  }
}
`
const accountQuery=gql`
query{
  account(where:{
   id: "ckuv9u5nc51sj0b92p81vbk8x"
  }){
    avatar {
      id
    }
		username
  }
}
`


const data = await graphQLClient.request(query)
const videos= data.videos
const accountData = await graphQLClient.request(accountQuery)
const account = accountData.account
return { 
  props: {
    videos,
    account
  }
}

}

export default function Home({videos, account}) {

  const randomVideo = (videos)=> {
    return videos[Math.floor(Math.random()*videos.length)]
  }
  
  const filterVideos = (videos,genre)=> {
    return videos.filter((video)=>video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video=>video.seen ==false)
  }

  return (
    <container>
      <NavBar account={account}/>
    <div className="app"> 
      <div className="main-video">
        <img src={randomVideo(videos).thumbnail.url}
        alt={randomVideo(videos).title}/>
      </div>
      <div className="video-feed">
        <Link href="#mystery"><div className="franchise" id="mystery"></div></Link>
        </div>
        <Section genre={"Recommended for you "} videos={unSeenVideos(videos)}/>
        <Section genre={"Thriller"} videos={filterVideos(videos, "thriller")}/>
        <Section genre={"Family"} videos={filterVideos(videos, "family")}/>
        <Section genre={"Classic"} videos={filterVideos(videos, "classic")}/>
        <Section id="mystery" genre={"Mystery"} videos={filterVideos(videos, "mystery")}/>
        <Section genre={"Drama"} videos={filterVideos(videos, "drama")}/>
        <Section genre={"Friend"} videos={filterVideos(videos, "friend")}/>
        <Section genre={"Engineering"} videos={filterVideos(videos, "engineering")}/>
      
      </div>
    </container>
  )
}
