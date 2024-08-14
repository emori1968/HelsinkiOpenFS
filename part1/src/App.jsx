const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return(
    <div>
       <p>
         {props.parts} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part parts= {'Fundamentals of React'} exercises= {10} />
      <Part parts= {'Using props to pass data'} exercises= {7} />
      <Part parts= {'State of a component'} exercises= {14} />
    </div>
  )
}


const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p> Number of exercises {props.total} </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course}/>
      <Content />
      <Total total= { exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App