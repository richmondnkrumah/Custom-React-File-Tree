// Entry.tsx
import { useState,Dispatch,SetStateAction } from "react";
import { useExplorerFileTree, type TFiles } from "./store";
import File from "./File";
import Folder from "./Folder";
import CreateNode from "./CreateNode";

type EntryProps = {
  entry: TFiles;
  depth: number;
  isDone: boolean,
  setIsDone: Dispatch<SetStateAction<boolean>>
  folState:  boolean | null,
  childIndex: number,
  parent: TFiles,
  parentExpanded: boolean
};

const Entry = ({ entry, depth,isDone,folState,setIsDone,childIndex,parent,parentExpanded }: EntryProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const currentFolderNode = useExplorerFileTree(state => state.currentFolderNode)
  const newNode = useExplorerFileTree(state => state.newNode)
  console.log(entry.name,"entryy",currentFolderNode,parent.name)
  console.log(parent.children?.length,'length',childIndex,'child')
  console.log(parent.children?.length === childIndex +1,'childequaol')
  console.log(newNode,'nodeQsa')
  console.log(parent.name === currentFolderNode,'parernta')
  console.log(parentExpanded,"expandf")
  return (
    <>
      <div style={{background: 'green', width: 'fit-content', height: 'fit-content'}}  className="flex gap-1" onClick={() => setIsExpanded((prev) => !prev)} >
        
        <div  
        >
          {entry.isFolder ? <Folder name={entry.name} /> : <File name={entry.name}/>}

        </div>
        {
          ((parent.name === currentFolderNode || entry.isFolder) && newNode && (parentExpanded ? parent.children?.length === childIndex +1 : true)) && <CreateNode isDone={isDone} folState={folState} setIsDone={setIsDone}  />
        }
      </div>
      <div>
        {isExpanded && (
          <div style={{ paddingLeft: entry.children ? "20px" : "" }}>
            {entry.children?.map((entryChild,idx) => (
              <Entry entry={entryChild} depth={depth + 1} isDone={isDone} folState={folState} setIsDone={setIsDone} childIndex={idx}  parent={entry} parentExpanded={isExpanded}  />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Entry;
