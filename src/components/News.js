
export default function News({ articles }) {
  return (
    <a href={articles.url} target="_blank" className="flex items-center justify-center px-4 py-2 hover:bg-gray-200">
      <div className="space-y-0.5">
        <h6 className="text-sm font-bold">{articles.title}</h6>
        <p className="text-xs font-medium">{articles.source.name}</p>
      </div>
      <img src={articles.urlToImage} className="w-[70px] h-[70px] rounded-xl" width="70" />
    </a>
  )
}
