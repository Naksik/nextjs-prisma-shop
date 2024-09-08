'use client'
import {Box, Button, Stack, TextField, Typography} from '@mui/material'
import {FormEvent, useState} from 'react'
import {signIn} from 'next-auth/react'
import {useRouter} from 'next/navigation'

interface LoginFormProps {}

export function LoginForm({}: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {push} = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const signInResult = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (signInResult?.ok) {
      push('/')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack>
        <Typography variant="h5" component="h1">
          Log In
        </Typography>

        <Typography variant="caption" component="span">
          To start shopping
        </Typography>
      </Stack>

      <TextField
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
    </Box>
  )
}
