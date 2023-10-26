
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { EmojiHappyIcon, HeartIcon as HeartIconFilled, PhotographIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Link from 'next/link';
import { db, storage } from "../../firebase";

import { useState, useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { signIn, useSession } from "next-auth/react";


export default function Post({ post, id }) {

  const [likes, setLikes] = useState([]);
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");





  //add a like
  useEffect(() => onSnapshot(
    collection(db, "posts", id, "likes"),
    (snapshot) => setLikes(snapshot.docs)
  )
    , [db]);


  //check how liked the post
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes, session]);


  //get comments for the spicfied post 
  useEffect(() => onSnapshot(
    collection(db, "posts", id, "comments"), (snapshot) => setComments(snapshot.docs)
  )
    , [id]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session?.user.username,
        });
      }
    }
  }

  async function sendComment() {
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentInput,
      name: session.user.name,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    })
    setShowInput(false);
    setCommentInput("");

  };

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }

    }
  }

  return (
    <div className="flex p-3 border-b border-gray-200">
      {/* user image */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={post?.data()?.userImage}
        alt="user-img"
      />
      {/* right side */}
      <div className="flex-1">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post?.data()?.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
            </span>
          </div>

          {/* dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
        </div>

        {/* post text */}
        <Link href={`/posts/${id}`}>
          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">{post?.data().text}</p>
        </Link>

        {/* post image */}

        <img
          className="rounded-2xl mr-2"
          src={post?.data().image}
          alt=""
        />

        {/* icons */}

        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">

            <ChatIcon onClick={() => {
              if (!session) {
                signIn();
              } else {
                setShowInput(!showInput);
              };
            }
            } className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (<span>{comments.length}</span>)}
          </div>
          {session?.user.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"} text-sm select-none`}
              >

                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
        {showInput && (
          <>
            {comments && (


              <div className="mb-3">
                <div className="flex items-center space-x-1 relative">
                  <img
                    className="h-11 w-11 rounded-full mr-4"
                    src={session?.user?.image}
                    alt="user-img"
                  />
                  <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                    {session?.user?.name}
                  </h4>
                  <span className="text-sm sm:text-[15px]">
                    @{session?.user?.username}
                  </span>
                  <span className="text-sm sm:text-[15px] hover:underline">
                    <Moment fromNow>{comments?.timestamp?.toDate()}</Moment>
                  </span>
                </div>
                <h2>{comments.comment}</h2>
              </div>
            )}


            <div className="flex p-3 space-x-3">
              <img src={session.user.image} alt="user image" className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" />
              <div className="w-full divide-y divide-gray-200">
                <div className="relative">
                  <input onChange={(e) => setCommentInput(e.target.value)} className="p-3 w-full h-14 border border-gray-400 outline-none rounded-lg" />
                  <PaperAirplaneIcon onClick={sendComment} className="h-6 rotate-90 absolute top-4 right-3 cursor-pointer text-blue-500" />
                </div>

                <div className="flex items-center justify-between pt-2.5">

                  <div className="flex">

                    <div>
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        hidden
                        ref={fileRef}
                        onChange={addImage}
                      /> */}
                    </div>

                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>

                </div>
              </div>
            </div>


          </>
        )}
      </div>
    </div>
  );
}