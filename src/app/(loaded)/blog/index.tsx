
import './../../../App.css'
import { useEffect,useRef, useState } from 'react';
import { File, Folder } from "@/components/magicui/file-tree";
interface FileTree {
  [key: string]: {
    path?: string,
    name?: string,
  } | FileTree;
}

export default function Page() {
  const [loading, setLoading] = useState(true)
  const valueCounter = useRef(0)
  const posts = useRef<FileTree>({})

  /*const postsRaw = useMemo(async () => {
    const now = new Date()

    const cached = localStorage.getItem('posts')
    if (cached) {
      const parsed = JSON.parse(cached)
      const posts = parsed.posts
      const date = parsed.date
      const cacheDate = new Date(date)

      //24 hours hasnt passed
      if (!(now.getTime() - cacheDate.getTime() > 24 * 60 * 60 * 1000)) {
        return posts
      }
    }

    const response = await fetch('https://api.github.com/repos/eletroswing/fountai.dev/git/trees/main?recursive=1')
    const data = await response.json()
    const tree = data.tree.filter((item: {
      path: string
    }) => item.path.startsWith('src/post') && (item.path.endsWith(".md") || item.path.endsWith(".mdx"))).map((item: {
      path: string
    }) => {
      return {
        ...item,
        path: item.path.replace('src/post', 'src').replace("srcs", "src"),
      }
    })

    //now we make the custom tree
    var structuredTree: FileTree = {}
    for (const post of tree) {
      const parts = post.path.split('/')
      const pathObject = buildPathObject(parts)
      structuredTree = deepMerge(structuredTree, pathObject)
    }

    localStorage.setItem('posts', JSON.stringify({ posts: structuredTree, date: now.toISOString() }))

    return structuredTree
  }, [])*/

  useEffect(() => {
    async function handle() {
      //const processed_posts = await postsRaw;
      //posts.current = processed_posts
      setLoading(false)
    }

    handle()
  }, [])

  return (
    <div className="w-full h-full flex justify-center overflow-auto mt-10">
      <div className='gap-4 grid grid-cols-4 content-start'>
      </div>
     
    </div >
  )
}