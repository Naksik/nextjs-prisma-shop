'use client'
import {CounterButton} from '@/feature/changeCount'
import {Box} from '@mui/material'
import {useAppSelector} from '@/shared/model/store'
import {selectCount} from '@/feature/changeCount/model/actions'

export function CounterPage() {
  const count = useAppSelector(selectCount)

  return (
    <Box>
      <h1>Counter: {count}</h1>
      <CounterButton action="decrement" />
      <CounterButton action="increment" />
    </Box>
  )
}
