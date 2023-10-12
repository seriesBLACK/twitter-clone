import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";

export default function Input() {
  return (
    <div className="w-full flex">
      <div className="w-[10%] p-4 border-r">
        <img src="twitter.png" className="h-6 w-6" />
      </div>
      <div className="w-[90%]">
        <textarea rows="2" placeholder="What's happining" className="w-full h-[100px] border-b"></textarea>
        <div className="flex justify-between items-center h-[50px]">
          <div className="flex gap-3 items-center border-b">

            <PhotographIcon className="h-5 text-blue-400" />
            <EmojiHappyIcon className="h-5 text-blue-400" />
          </div>
          <button className="bg-blue-400 text-white p-2 rounded-full" disabled>Tweet</button>
        </div>
      </div>
    </div>
  )
}
