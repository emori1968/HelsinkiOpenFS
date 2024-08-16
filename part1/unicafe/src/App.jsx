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
      <p>{props.eval} {props.count} </p>
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
        count = {good}
      />
      <Displaystats 
        eval = 'neutral'
        count = {neutral}
      />
      <Displaystats 
        eval = 'bad'
        count = {bad}
      />

    </div>
  )
}

export default App