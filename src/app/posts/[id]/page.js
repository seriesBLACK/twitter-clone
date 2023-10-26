"use client"
import Sidebar from '@/components/Sidebar';
import Widgets from '@/components/Widgets';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import Post from '@/components/Post';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../../firebase';






export default function page({ params }) {
  const id = params.id;
  // const articles = await getData();
  // const users = await getRandomUsers();
  const [post, setPost] = useState();
  const [articles, setArticles] = useState()
  const [users, setUsers] = useState()


  async function getData() {
    const res = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json");
    setArticles(await res.json());
  };

  async function getRandomUsers() {
    const randomUser = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture");

    setUsers(await randomUser.json());
  };

  useEffect(() =>
    onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot))
    , [id]);

  useEffect(() => {
    getData();
    getRandomUsers();
  }, [])



  return (
    <div>
      <main className='flex min-h-screen mx-auto'>

        <Sidebar />
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex items-center py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <Link href={'/'}>
              <div className='hoverEffect'>
                <ArrowLeftIcon className='h-5' />
              </div>
            </Link>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Post</h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
            </div>
          </div>
          <Post post={post} id={id} />
        </div>
        <Widgets articles={articles?.articles} users={users?.results} />

      </main>
    </div>
  )
}