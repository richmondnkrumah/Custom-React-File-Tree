// const FileNodes = {
//   name: "root",
//   isFolder: true,
//   children: [
//     {
//       name: "node_modules",
//       isFolder: true,
//       children: [
//         {
//           name: ".bin",
//         },
//         {
//           name: ".cache",
//         },
//         {
//           name: "testFolder",
//           isFolder: true,
//           children: [
//             {
//               name: "testFile1",
//             },
//             {
//               name: "testFile2",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

// const currentFolder = "testFolder";
// const findPosition = (node, currentFolder) => {
//   for (const testNode in node) {
//     console.log(testNode, "testNode");
//     console.log(node[`${testNode}`],"testCheck")
//     if (currentFolder === node[`${testNode}`]) {
//       return true;
//     }
//     if (node.isFolder) {
//       node.children.forEach((childNode) => {
//         console.log(childNode, "childNode");
//         console.log(node[`${childNode}`],"childCheck")
//         const foundNode = findPosition(childNode, currentFolder);
//         if (foundNode) {
//           return foundNode;
//         }
//       });
//     }
//   }
//   return false;
// };

// const result = findPosition(FileNodes, currentFolder);
// console.log(result);
const FileNodes = {
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
};

const currentFolder = "root";
const newNodeName = "newPee";

const findPosition = (node, currentFolder, newNodeName) => {
  if (node.name === currentFolder) {
    if (node.isFolder) {
      if (!node.children) {
        node.children = [];
      }
      const newNode = { name: newNodeName };
      return { ...node, children: [...node.children, newNode] };;
    }
  }

  if (node.isFolder && node.children) {
    for (const childNode of node.children) {
      const foundNode = findPosition(childNode, currentFolder, newNodeName);
      if (foundNode !== childNode) {
        // Return the updated node if the childNode was modified
        return { ...node, children: node.children.map(child => (child === childNode ? foundNode : child)) };
      }
    }
  }
  return node;
};

findPosition(FileNodes, currentFolder, newNodeName);
console.log(JSON.stringify(FileNodes, null, 2));