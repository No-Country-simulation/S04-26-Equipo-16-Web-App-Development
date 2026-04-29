"use client"

import {useExampleStore as useBear} from '../store/exampleStore'


function BearCounter() {
  const bears = useBear((state) => state.bears)
  return <h1>{bears} bears around here...</h1>
}

function Controls() {
  const increasePopulation = useBear((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}

export {
  BearCounter,
  Controls
}