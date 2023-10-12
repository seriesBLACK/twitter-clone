import Image from "next/image";
import twitter from "../../public/twitter.png"
import SidebarMenuItem from "./SidebarMenuItem";
import { DotsCircleHorizontalIcon, HashtagIcon, HomeIcon, InboxInIcon, UserIcon } from "@heroicons/react/solid";
import { BellIcon, BookmarkAltIcon, ClipboardIcon } from "@heroicons/react/outline"
export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      <div className="hoverEffect w-20">
        <Image width='50' height='50' src={twitter}></Image>
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notification" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxInIcon} />
        <SidebarMenuItem text="Bookmarks" Icon={BookmarkAltIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Tweet</button>
      <div className="hoverEffect text-gray-700 items-center justify-center xl:justify-start mt-auto hidden xl:flex">
        <Image src={twitter} width="40" height="40" className="rounded-full xl:mr-2" />
        <div className="">
          <h4 className="font-bold">sahand gha</h4>
          <p className="text-gray-500 ">code with sahand</p>
        </div>
      </div>
    </div >
  )
}
