"use client"
import { SearchIcon } from "@heroicons/react/outline";
import News from "./News";
import { useState } from "react";

export default function Widgets({ articles }) {
  const [articleNum, setArticleNum] = useState(3);
  return (

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
    </div>

  )
}
