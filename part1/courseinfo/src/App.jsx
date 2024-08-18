// Importante: map funciona sobre array, sobre objetos {} da error

const Course = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course.name}</h1>
      {props.course.parts.map(row => <p key={row.id}> {row.name} {row.exercises} </p>)}
    </>
  )
}


function App() {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App