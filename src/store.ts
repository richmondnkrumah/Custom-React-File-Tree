import { create } from "zustand";

export type TFiles = {
  name: string;
  isFolder?: boolean;
  children?: TFiles[];
};

interface TFilesStore {
  FileNodes: TFiles;
  currentFolderNode: string;
  createTreeNode: (name: string) => void;
  setCurrentFolderNode: (folder: string) => void;
  createNew: (file: string, isFolder?: boolean) => void;
  // findPosition: (node: TFiles,currentFolder: string) => boolean
  createNode: (
    newNodeName: string,
    isFolder?: boolean,
    node?: TFiles,
    currentFolder?: string,
  ) => void;
}

export const useExplorerFileTree = create<TFilesStore>()((set, get) => ({
  FileNodes: {
    name: "root",
    isFolder: true,
    children: [
      {
        name: "node_modules",
        isFolder: true,
        children: [
          {
            name: ".bin",
          },
          {
            name: ".cache",
          },
          {
            name: "testFolder",
            isFolder: true,
            children: [
              {
                name: "testFile1",
              },
              {
                name: "testFile2",
              },
            ],
          },
        ],
      },
    ],
  },
  currentFolderNode: "root",
  createTreeNode: (name) =>
    set((state) => {
      const tempState = state.FileNodes;
      // Check if there is a current folder selected
      if (state.currentFolderNode !== "") {
        // Find the selected folder node in the tree
        const findFolderNode = (parentNode: TFiles): TFiles | null => {
          if (parentNode.name === state.currentFolderNode) {
            return parentNode;
          }
          if (parentNode.children) {
            for (const childNode of parentNode.children) {
              const foundNode = findFolderNode(childNode);
              if (foundNode) {
                return foundNode;
              }
            }
          }

          return null;
        };

        const folderNode = findFolderNode(tempState);

        // If the selected folder is found, add the new node to its children
        if (folderNode) {
          folderNode.children = folderNode.children || [];
          folderNode.children.push({ name: name });
        }
      } else {
        // If no folder is selected, add the new node to the root
        tempState.children = tempState.children || [];
        tempState.children.push({ name: name });
      }
      console.log(state, "state from fiel");
      return { FileNodes: tempState };
    }),
  setCurrentFolderNode: (folder: string) =>
    set({
      currentFolderNode: folder,
    }),
  createNew: (file, isFolder) =>
    set((state) => ({
      FileNodes: {
        ...state.FileNodes,
        children: state.FileNodes.children?.concat({ name: file, isFolder }),
      },
    })),
  createNode: (
    newNodeName,
    isFolder,
    node = get().FileNodes,
    currentFolder = get().currentFolderNode,
  ) =>
    set({
      FileNodes: utilCreateNode(node, currentFolder, newNodeName,isFolder),
    }),
}));

// UTIL FUNCTION
const utilCreateNode = (
  node: TFiles,
  currentFolder: string,
  newNodeName: string,
  isFolder?: boolean
): TFiles => {
  console.log(node.name,"node name")
  console.log(currentFolder,"node currrnt folder")
  if (node.name === currentFolder) {
    if (node.isFolder) {
      if (!node.children) {
        node.children = [];
      }
      const newNode = { name: newNodeName,isFolder };
      // Create a new copy of the modified node

      const updatedNode = { ...node, children: [...node.children, newNode] };
      return updatedNode;
    }
  }
  if (node.isFolder && node.children) {
    console.log('as')
    console.log(node.children,"as children")
    for (const childNode of node.children) {
      const foundNode = utilCreateNode(childNode, currentFolder, newNodeName,isFolder);
      console.log(childNode,"as childNode")
      console.log(foundNode,"as foundNode")
      if (foundNode !== childNode) {
        // Return the updated node if the childNode was modified
        return { ...node, children: node.children.map(child => (child === childNode ? foundNode : child)) };
      }
    }
  }
  return node;
};
