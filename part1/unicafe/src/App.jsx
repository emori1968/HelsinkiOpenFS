import { useState } from 'react'

const Title = (props) => {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  )
}

const Displaystats = (props) => {
  return (
    <>
      <p>{props.eval} {props.res} {props.unit} </p>
    </>
  )
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

      <Displaystats 
        eval = 'good'
        res = {good}
      />
      <Displaystats 
        eval = 'neutral'
        res = {neutral}
      />
      <Displaystats 
        eval = 'bad'
        res = {bad}
      />
      <Displaystats 
        eval = 'all'
        res = {all}
      />
      <Displaystats 
        eval = 'average'
        res = {average}
      />
      <Displaystats 
        eval = 'positive'
        res = {positive}
        unit = "%"
      />

    </div>
  )
}

export default App