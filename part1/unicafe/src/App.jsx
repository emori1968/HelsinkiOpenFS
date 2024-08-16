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
      <p>{props.text} {props.value} {props.unit} </p>
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
        <StatisticLine text= "good" value= {props.good} />
        <StatisticLine text= "neutral" value= {props.neutral} />
        <StatisticLine text= "bad" value= {props.bad} />
        <StatisticLine text= "all" value= {props.all} />
        <StatisticLine text= "average" value= {props.average} />
        <StatisticLine text= "positive" value= {props.positive} unit="%" />
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

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />

    </div>
  )
}

export default App