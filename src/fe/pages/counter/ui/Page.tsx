'use client'
import {CounterButton} from '@/fe/feature/changeCount/ui/CounterButton/CounterButton'
import {Box} from '@mui/material'
import {useAppSelector} from '@/fe/shared/model/store'
import {selectCount} from '@/fe/feature/changeCount/model/actions'

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
