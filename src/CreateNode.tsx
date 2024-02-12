import { Dispatch, SetStateAction } from 'react'
import EditableEntryWrapper from './EditableEntryWrapper'
interface Props {
  isDone: boolean,
  setIsDone: Dispatch<SetStateAction<boolean>>
  folState:  boolean | null,
}

const CreateNode = ({isDone,folState,setIsDone}: Props) => {
  return (
    <div>
       {isDone &&
       (folState !== null && (
        <EditableEntryWrapper
          isFolder={folState}
          handleIsDone={() => setIsDone(false)}
        />)
      )}
    </div>
  )
}

export default CreateNode