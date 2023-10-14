import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon } from "@heroicons/react/outline";
import Image from "next/image";
import postImage from "./ph.avif"

export default function Post({ post }) {
  return (
    <div className="flex mb-10">
      <img src={post.userImg} className="w-[7%] h-10 m-3 rounded-full" />
      <div className="w-[90%]">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h3 className="font-bold text-lg">{post.name}</h3>
            <p className="text-gray-400">{post.username}</p>
            <p className="text-gray-400">{post.timeStamp}</p>
          </div>
          <DotsHorizontalIcon className="h-5" />
        </div>
        <p>{post.text}</p>
        <Image src={postImage} width="full" height="500"></Image>
        <div className="flex justify-between w-full mt-3">
          <ChatIcon className="h-5" />
          <HeartIcon className="h-5" />
          <ShareIcon className="h-5" />
          <ChartBarIcon className="h-5" />

        </div>
      </div>
    </div>
  )
}
