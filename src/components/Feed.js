import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";

export default function Feed() {
  return (
    <div className="xl:ml-[370px] border-l border-r xl:min-w-[50%] sm:min-w-full sm:ml-[73px] flex-gorw">
      <div className="flex justify-between items-center sticky top-0 z-10 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xlg font-bold cursor-pointer ml-3">Home</h2>
        <div className="hoverEffect flex justify-center items-center">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
    </div>
  )
}
