//File.tsx
type props = {
  name?: string
}

const File = ({name}: props) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  )
}

export default File