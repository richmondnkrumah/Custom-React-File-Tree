import { useState } from "react";
import EditableEntryWrapper from "./EditableEntryWrapper";
import Entry from "./Entry";
import { useExplorerFileTree } from "./store";

const App = () => {
  const { FileNodes, currentFolderNode } =
    useExplorerFileTree();
  const [folState, setFolState] = useState<null | boolean>(null);
  const [isDone, setIsDone] = useState<boolean>(true);

  console.log(currentFolderNode, "currfolder");
  console.log(FileNodes, "all");
  return (
    <div>
      <button onClick={() => {setFolState(true); setIsDone(true)}}>Create Folder</button>
      <button onClick={() => {setFolState(false);setIsDone(true)}}>Create File</button>
      {isDone &&
       (folState !== null && (
        <EditableEntryWrapper
          isFolder={folState}
          handleIsDone={() => setIsDone(false)}
        />)
      )}
      <div style={{ padding: "10px" }}>
        {FileNodes.children?.map((entry) => (
          <Entry entry={entry} depth={1} />
        ))}
      </div>
    </div>
  );
};

export default App;
