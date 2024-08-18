// Importante: map funciona sobre array, sobre objetos {} da error

const Content = (props) => <h2>{props.name}</h2>

const Parts = (props) =>  {
  return (
    <>
      {props.parts.map(row => <p> {row.name} {row.exercises} </p>)}
    </>
  )
  }

const Totals = (props) => {
  let array = props.parts.map(row => row.exercises)
  const total = array.reduce((a,b) => a+b,0)
  console.log(array, total)

  return (
    <>
      <h4>total of {total} excersises</h4>
    </>
  )
}

// One course rendering
const Course = (props) => {
  console.log(props)
  return (
    <>
      <Content name = {props.name} />
      <Parts parts =  {props.parts} />
      <Totals parts = {props.parts} />
    </>
  )
}

//All course list rendering
const Courses = (props) => {
  return (
    <>
    {props.courses.map(item => <Course name = {item.name} parts= {item.parts}/>)}
    </>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses = {courses} />
    </div>
  )
}

export default App