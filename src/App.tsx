import { useState,useRef, MutableRefObject, ReactNode } from "react";
import EditableEntryWrapper from "./EditableEntryWrapper";
import Entry from "./Entry";
import { useExplorerFileTree } from "./store";
import CreateNode from './CreateNode'

const App = () => {
  const { FileNodes, currentFolderNode,setNewNode } =
    useExplorerFileTree();
  const [folState, setFolState] = useState<null | boolean>(null);
  const [isDone, setIsDone] = useState<boolean>(true);
  const treeNodeRef = useRef<null | HTMLDivElement>(null)

  const handleFolderClick = () => {
    setFolState(true); 
    setIsDone(true)
    setNewNode()

  }
  console.log(FileNodes,'sasa')
  return (
    <div>
      <button onClick={() => console.log(treeNodeRef)}>click</button>
      <button onClick={handleFolderClick}>Create Folder</button>
      <button onClick={() => {setFolState(false);setIsDone(true)}}>Create File</button>
      {isDone &&
       (folState !== null && (
        <EditableEntryWrapper
          isFolder={folState}
          handleIsDone={() => setIsDone(false)}
        />)
      )}
      <CreateNode  isDone={isDone} folState={folState} setIsDone={setIsDone}  />
      <div ref={treeNodeRef} style={{ padding: "10px" }}>
        {FileNodes.children?.map((entry,idx) => (
          <Entry entry={entry} depth={1} isDone={isDone} folState={folState} setIsDone={setIsDone} childIndex={idx} parent={FileNodes} parentExpanded={true}/>
        ))}
      </div>
    </div>
  );
};

export default App;
