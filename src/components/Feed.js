import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "theSuitCat",
      username: "@theCatSuit",
      userImg: "twitter.png",
      img: "https://unsplash.com/photos/a-cup-of-green-tea-next-to-a-whisk-and-a-whisk-OMdKxx-YnUg",
      text: "nice view",
      timeStamp: "2hourse ago"
    },
    {
      id: "2",
      name: "tnoone",
      username: "theCatSuit",
      userImg: "twitter.png",
      img: "https://unsplash.com/photos/UuzkCF-jmPY",
      text: "bad view",
      timeStamp: "1 hourse ago"

    },
  ];



  return (
    <div className="xl:ml-[370px] border-l border-r xl:min-w-[50%] sm:min-w-[80%] sm:ml-[73px] flex-gorw">
      <div className="flex justify-between items-center sticky top-0 z-10 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xlg font-bold cursor-pointer ml-3">Home</h2>
        <div className="hoverEffect flex justify-center items-center">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
