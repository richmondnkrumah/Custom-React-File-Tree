// EditableEntryWrapper.tsx
import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { useExplorerFileTree } from "./store";

interface EditableEntryWrapperProps {
  isFolder?: boolean;
  handleIsDone:   () => void
}

const EditableEntryWrapper: React.FC<EditableEntryWrapperProps> = ({
  isFolder,handleIsDone
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {createNode,setNewNode} = useExplorerFileTree()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      createNode(inputValue,isFolder)
      handleIsDone()
      setNewNode()
    }
  };
  useEffect(() => {
    inputRef.current?.focus({});
  });

  return (
    isEditing && (
      <div>
        {isFolder ? <span>true</span> : <span>false</span>}
        {isEditing && (
          <input
            className="bg-red-300"
            ref={inputRef}
            type="text"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        )}
      </div>
    )
  );
};

export default EditableEntryWrapper;
