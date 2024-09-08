import {LoginForm} from '@/fe/feature/auth/login'
import {Box} from '@mui/material'

export async function LoginPage() {
  return (
    <Box sx={{width: '100%', margin: 'auto', maxWidth: '500px', py: 2}}>
      <LoginForm />
    </Box>
  )
}
