import { useState } from 'react'

const Title = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
        <td>{props.unit}</td>
      </tr>
     
    </>
  )
}

const Statistics = (props) => {

  if (props.all==0) {
    return (
      <>
         <p>No feedback given</p>
      </>
    )
   
  } else {
    return (
      <>
        <table>
          <StatisticLine text= "good" value= {props.good} />
          <StatisticLine text= "neutral" value= {props.neutral} />
          <StatisticLine text= "bad" value= {props.bad} />
          <StatisticLine text= "all" value= {props.all} />
          <StatisticLine text= "average" value= {props.average} />
          <StatisticLine text= "positive" value= {props.positive} unit="%" />
        </table>
      </>
    )
  }
}



const Button = (props) => {
  console.log({props})
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}



const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // variables
  const title1 = "give feedback"
  const title2 = "statistics"
  var all = good + neutral + bad
  var average = (good - bad)/ all
  var positive = good / all


  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Title title = {title1} />

      <Button
        onClick= {increaseGood}
        text = 'good'
      />
      <Button
        onClick= {increaseNeutral}
        text = 'neutral'
      />
      <Button
        onClick= {increaseBad}
        text = 'bad'
      />

      <Title title = {title2} />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average.toFixed(1)} positive={positive.toFixed(1)} />

    </div>
  )
}

export default App