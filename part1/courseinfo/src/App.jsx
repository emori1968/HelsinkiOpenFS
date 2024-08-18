// Importante: map funciona sobre array, sobre objetos {} da error

const Content = (props) => <h1>{props.name}</h1>
const Parts = (props) =>  {
  return (
    <>
      {props.parts.map(row => <p key={row.id}> {row.name} {row.exercises} </p>)}
    </>
  )
  }
const Totals = (props) => {
  let array = props.parts.map(row => row.exercises)
  let total = 0
  for(let i=0; i< array.length; i++) {
    total += array[i]
  } 
  console.log(array, total)

  return (
    <>
      <h4>total of {total} excersises</h4>

    </>
  )
}
     
const Course = (props) => {
  console.log(props)
  return (
    <>
      <Content name = {props.course.name} />
      <Parts parts =  {props.course.parts} />
      <Totals parts = {props.course.parts} />
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      },
      
    ]
  }

  return <Course course={course} />
}

export default App