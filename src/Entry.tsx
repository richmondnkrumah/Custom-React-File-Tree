// Entry.tsx
import { useState, Dispatch, SetStateAction } from "react";
import { useExplorerFileTree, type TFiles } from "./store";
import File from "./File";
import Folder from "./Folder";
import CreateNode from "./CreateNode";

type EntryProps = {
  entry: TFiles;
  depth: number;
  isDone: boolean;
  setIsDone: Dispatch<SetStateAction<boolean>>;
  folState: boolean | null;
  childIndex: number;
  parent: TFiles;
  parentExpanded: boolean;
};

interface nodeCreation {
  parent: TFiles;
  currentFolderNode: string;
  entry: TFiles;
  parentExpanded: boolean;
  childIndex: number;
  newNode: boolean;
}

const Entry = ({
  entry,
  depth,
  isDone,
  folState,
  setIsDone,
  childIndex,
  parent,
  parentExpanded,
}: EntryProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const currentFolderNode = useExplorerFileTree(
    (state) => state.currentFolderNode
  );
  const newNode = useExplorerFileTree((state) => state.newNode);
  console.log(
    parent.name,
    "parent name",
    currentFolderNode,
    "currentFolderNode"
  );
  console.log(entry.isFolder, "entry isFolder", entry.name, "entry name");
  console.log(newNode, "newNode", parentExpanded, "parentExpanded");
  console.log(
    parent.children?.length,
    "parent lenghth",
    childIndex,
    "childIndex"
  );
  console.log(parent.children?.length === childIndex + 1, "childIndex check");
  const handleNewNode = ({
    parent,
    currentFolderNode,
    entry,
    parentExpanded,
    childIndex,
    newNode,
  }: nodeCreation) => {
    if (!parent.isFolder) return false;
    // handle Empty Folders

    // handle Folders with Children
    if (parent.name === currentFolderNode && newNode && parentExpanded) {
      console.log(entry.name, "this is a child of", parent.name);
      if (parent.children?.length === childIndex + 1) return true;
    }
    if (currentFolderNode === entry.name && newNode && !entry.children) {
      console.log(entry.name, "it is an empty folder");
      return true;
    }
  };
  return (
    <>
      <div
        style={{
          background: "green",
          width: "fit-content",
          height: "fit-content",
        }}
        className="flex gap-1"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div>
          {entry.isFolder ? (
            <Folder name={entry.name} />
          ) : (
            <File name={entry.name} />
          )}
        </div>
        {/* {(parent.name === currentFolderNode ||
          (entry.isFolder && currentFolderNode === entry.name)) &&
          newNode &&
          ((parent.name === currentFolderNode)
            ? parentExpanded
              ? parent.children?.length === childIndex + 1
              : true
            : true ) && (
            <CreateNode
              isDone={isDone}
              folState={folState}
              setIsDone={setIsDone}
            />
          )} */}
        {handleNewNode({
          parent,
          currentFolderNode,
          entry,
          parentExpanded,
          childIndex,
          newNode,
        }) && (
          <CreateNode
            isDone={isDone}
            folState={folState}
            setIsDone={setIsDone}
          />
        )}
        {/* {entry.isFolder &&
          ((entry.name === currentFolderNode || (parentExpanded && parent.children?.length === childIndex + 1)) && newNode) && (
            <CreateNode isDone={isDone} folState={folState} setIsDone={setIsDone} />
          )} */}
      </div>
      <div>
        {isExpanded && (
          <div style={{ paddingLeft: entry.children ? "20px" : "" }}>
            {entry.children?.map((entryChild, idx) => (
              <Entry
                entry={entryChild}
                depth={depth + 1}
                isDone={isDone}
                folState={folState}
                setIsDone={setIsDone}
                childIndex={idx}
                parent={entry}
                parentExpanded={isExpanded}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Entry;
