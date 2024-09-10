'use client'
import {Button} from '@mui/material'
import {useAppDispatch} from '@/shared/model/store'
import {decrement, increment} from '@/feature/changeCount/model/actions'
import {memo} from 'react'

enum CounterAction {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
}

interface CounterButtonProps {
  action: `${CounterAction}`
}

const ACTION_MAP = {
  [CounterAction.INCREMENT]: increment(),
  [CounterAction.DECREMENT]: decrement(),
}

const ACTION_NAME = {
  [CounterAction.INCREMENT]: 'Increase Number',
  [CounterAction.DECREMENT]: 'Reduce Number',
}

export const CounterButton = memo(function CounterButton({
  action,
}: CounterButtonProps) {
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(ACTION_MAP[action])
  }

  return <Button onClick={handleClick}>{ACTION_NAME[action]}</Button>
})
