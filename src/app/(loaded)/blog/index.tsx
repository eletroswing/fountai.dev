import { useEffect, useMemo, useRef, useState } from 'react';
import './../../../App.css'
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import { AppSidebar } from '@/components/sidebar';
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { Highlighter } from '@/components/magicui/highlighter';
import { MarqueeDemo } from '@/components/marquee';

interface FileTree {
  [key: string]: {
    path?: string,
    name?: string,
  } | FileTree;
}

function buildPathObject(parts: string[]) {
  let root = {}, cur: FileTree = root;
  parts.forEach((p, i) => {
    cur[p] ??= { path: parts.slice(0, i + 1).join("/") };
    if (i === parts.length - 1) cur[p].name = p;
    cur = cur[p] as unknown as FileTree;
  });
  return root;
}
function deepMerge(target: any, source: any) {
  for (const key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      key in target
    ) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return { ...target, ...source };
}

function renderNode(node: FileTree, valueCounter: { current: number }) {
  return Object.entries(node).map(([key, child]) => {
    if (key === "path" || key === "name") return null;

    const isFile = !!child.name;
    const value = String(++valueCounter.current);
    const styles = "text-md"

    if (isFile) {
      return (
        <File key={value} value={value} className={styles}>
          <p>{(child as { name: string }).name}</p>
        </File>
      );
    } else {
      return (
        <Folder key={value} value={value} element={key} className={styles}>
          {renderNode(child as FileTree, valueCounter)}
        </Folder>
      );
    }
  });
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
    <div className="w-full h-full flex ">
      <div className='h-full pt md:w-60 w-0 flex absolute'>
        <AppSidebar>
          <Tree
            className="overflow-hidden pt-10 pl-5"
            initialExpandedItems={Array.from({ length: 1000 }, (_, i) => String(i))}
          >
            {
              !loading && renderNode(posts as unknown as FileTree, valueCounter)
            }
          </Tree>
        </AppSidebar>
      </div>
      <div className='w-full z-[2] h-full  overflow-x-auto flex flex-col items-center pb-28'>
        <span className='font-mono text-[0.7rem] text-center mt-4 text-black dark:text-white italic'>
          "Just that my talent is in my veins" - Fabio Brazza
        </span>
        <div className='w-full h-[20vh] flex flex-col items-center justify-center mt-20'>
        </div>
      </div>
    </div >
  )
}