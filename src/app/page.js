import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Widgets from '@/components/Widgets'


async function getData() {
  const res = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json");
  return res.json();
};

async function getRandomUsers() {
  const randomUser = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture");

  return randomUser.json();
};


export default async function page() {
  const articles = await getData();
  const users = await getRandomUsers();
  return (
    <div>
      <main className='flex min-h-screen mx-auto'>

        <Sidebar />
        <Feed />
        <Widgets articles={articles.articles} users={users.results} />

      </main>
    </div>
  )
}
