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


export default Courses