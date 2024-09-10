import {configureStore} from '@reduxjs/toolkit'
import {counterReducer} from '@/feature/changeCount/model/actions'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counterReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
