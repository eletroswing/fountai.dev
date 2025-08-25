import { useEffect } from 'react';
import './../../../App.css'
import { File, Folder, Tree } from "@/components/magicui/file-tree";

export default function Page() {

  useEffect(() => {
    console.log("hello")
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <div className='h-full flex py-4 px-4 w-1/6'>
        <Tree
          className="overflow-hidden rounded-xl py-4 px-4 border backdrop-blur-md"
          initialExpandedItems={[
            "1",
            "2",
          ]}
        >
          <Folder element="src" value="1">
            <Folder value="2" element="me">
              <File value="3">
                <p>layout.tsx</p>
              </File>
              <File value="4">
                <p>page.tsx</p>
              </File>
            </Folder>
            <Folder value="5" element="components">
              <Folder value="6" element="ui">
                <File value="7">
                  <p>button.tsx</p>
                </File>
              </Folder>
              <File value="8">
                <p>header.tsx</p>
              </File>
              <File value="9">
                <p>footer.tsx</p>
              </File>
            </Folder>
            <Folder value="10" element="lib">
              <File value="11">
                <p>utils.ts</p>
              </File>
            </Folder>
          </Folder>
        </Tree>
      </div>
    </div >
  )
}