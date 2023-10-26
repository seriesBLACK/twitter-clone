import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Comment({ comment, postId }) {
  const { data: session } = useSession();

  async function deleteComment() {
    deleteDoc(doc(db, "posts", postId, "comments", comment.id));
  };

  return (
    <div className="border-b border-l border-gray-300 w-[87%] ml-auto py-2">
      <div className="flex items-center justify-start">
        <img
          className="h-11 w-11 rounded-full mr-4"
          src={comment.data().userImage}
          alt="user-img"
        />

        {/* post user info */}
        <div className="flex items-center space-x-1 whitespace-nowrap">
          <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
            {comment.data().name}
          </h4>
          <span className="text-sm sm:text-[15px]">
            @{comment.data().username} -
          </span>
          <span className="text-sm sm:text-[15px] hover:underline">
            <Moment fromNow>{comment.data().timestamp?.toDate()}</Moment>
          </span>
        </div>

        {/* dot icon */}
        {comment.data().username === session.user.username && (<div>
          <TrashIcon className="h-5" onClick={deleteComment} />
        </div>)}
        <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 ml-auto " />
      </div>
      <p className="my-2 ml-16">

        {comment.data().comment}

      </p>
    </div>
  )
}
