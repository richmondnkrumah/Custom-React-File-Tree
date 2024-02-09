//Folder.tsx
import { useExplorerFileTree } from "./store";
type props = {
  name?: string;
};

const Folder = ({ name }: props) => {
  const {setCurrentFolderNode } = useExplorerFileTree();

  const handleFolderClick = () => {
    console.log("I am clicked")
    setCurrentFolderNode(name!);
  };
  return (
    <div style={{background: 'red',padding:"1px"}} onClick={handleFolderClick} >
      <p>{name}</p>
    </div>
  );
};

export default Folder;
