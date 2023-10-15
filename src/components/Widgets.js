"use client"
import { SearchIcon } from "@heroicons/react/outline";
import News from "./News";
import { useState } from "react";

export default function Widgets({ articles, users }) {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);
  return (
    <>
      <div className="ml-8 mt-3 sticky top-0 xl:w-[75%] hidden lg:inline">
        <div className="flex items-center p-3 rounded-full bg-red-300 relative">
          <SearchIcon className="h-5 z-10 text-gray-500" />
          <input type="text" placeholder="Search" className="pl-11 border-gray-500 text-gray-700 border absolute inset-0 rounded-full" />
        </div>
        <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
          <h4 className="font-bold text-xl px-4">What's happning</h4>
          {articles.slice(0, articleNum).map((articles) => (
            <News key={articles.title} articles={articles} />
          ))}
          <button onClick={() => setArticleNum(articleNum + 3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">show more</button>
        </div>
        <div className="space-y-3 bg-gray-100 pt-2 rounded-xl xl:w-[75%] w-[90%] mt-4 sticky top-16">
          <h4 className="font-bold text-xl px-4">who to follow</h4>
          {users.slice(0, randomUserNum).map((randomuser) => (
            <div key={randomuser.login.username} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
              <img className="rounded-full" width="40" src={randomuser.picture.thumbnail}></img>
              <div className="ml-4 leading-5 truncate">
                <h4 className="font-bold hover:underline text-[14px] truncate">{randomuser.login.username}</h4>
                <h5 className="text-[13px] text-gray-500 truncate">{randomuser.name.first + " " + randomuser.name.last}</h5>
              </div>
              <button className="ml-auto bg-blue-500 text-white rounded-full text-sm px-3.5 py-1.5 font bold">Follow</button>
            </div>
          ))}
          <button onClick={() => setRandomUserNum(randomUserNum + 3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">show more</button>
        </div>
      </div>
    </>

  )
}
