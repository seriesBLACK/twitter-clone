"use client"
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { XIcon } from "@heroicons/react/solid";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const sendTweet = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), { image: downloadUrl })
      })
    }
    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    };
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  };

  return (
    <>
      {session && (


        <div className="flex  border-b border-gray-200 p-3 space-x-3">
          <img onClick={signOut} src={session ? session.user.image : "twitter.png"} alt="user image" className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95" />

          <div className="w-full divide-y divide-gray-200">

            <div>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} rows="2" placeholder="What's happining" className="w-full h-[100px] border-b"></textarea>
            </div>

            {selectedFile && (
              <div className="relative">
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className="border h-7 text-black absolute cursor-pointer shadow-md border-white m-1 rounded-full"
                />
                <img
                  src={selectedFile}
                  className={loading ? 'animate-pulse' : ''}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">

              {!loading && (
                <>

                  <div className="flex">

                    <div onClick={() => fileRef.current.click()}>
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={fileRef}
                        onChange={addImage}
                      />
                    </div>

                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>

                  <button
                    onClick={sendTweet}
                    disabled={!input.trim()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
