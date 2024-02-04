import { useState } from "react";
import type { TFiles } from "./store";
import File from "./File";
import Folder from "./Folder";

type EntryProps = {
  entry: TFiles;
  depth: number;
};

const Entry = ({ entry, depth }: EntryProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

 
  return (
    <>
      <div style={{background: 'green', width: 'fit-content', height: 'fit-content'}}  className="flex gap-1" onClick={() => setIsExpanded((prev) => !prev)} >
        
        <div  
        >
          {entry.isFolder ? <Folder name={entry.name} /> : <File name={entry.name}/>}
        </div>
      </div>
      <div>
        {isExpanded && (
          <div style={{ paddingLeft: entry.children ? "20px" : "" }}>
            {entry.children?.map((entry) => (
              <Entry entry={entry} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Entry;
