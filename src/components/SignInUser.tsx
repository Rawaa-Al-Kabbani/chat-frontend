import { FunctionComponent, useState } from 'react'
import { styled } from 'styled-components'
import { loginUser } from '../api/room'

const SignInUser: FunctionComponent = () => {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [incorrectLoginData, setIncorrectLoginData] = useState<string | undefined>(undefined)

  const handleOnChangeUserName = (value: string) => {
    setUserName(value)
  }

  const handleOnChangePassword = (value: string) => {
    setPassword(value)
  }

  const handleOnLoginUser = async () => {
    const input = {
      user_name: userName,
      password: password
    }
    const checkLogin = await loginUser(input.user_name, input.password)
    if (checkLogin) {
      setIncorrectLoginData(checkLogin)
      setUserName('')
      setPassword('')
    }
  }

  return (
    <Container>
      <SubContainer style={{ marginBottom: '100px' }}>
        <div style={{ marginBottom: '70px' }}>Sign in</div>
        <Property>User name</Property>
        <Input type='text' placeholder='Enter user name' defaultValue={userName} onChange={(e) => handleOnChangeUserName(e.target.value)} />

        <Property>Password</Property>
        <Input
          type='password'
          placeholder='Enter password'
          defaultValue={password}
          onChange={(e) => handleOnChangePassword(e.target.value)}
        />
        {incorrectLoginData ? <Message>{incorrectLoginData}</Message> : <Button onClick={() => handleOnLoginUser()}>Log in</Button>}
      </SubContainer>
    </Container>
  )
}
export default SignInUser

const Container = styled.div`
  text-align: center;
  width: 360px;
  margin: 100px auto auto;
  display: flex;
  align-items: center;
`

const SubContainer = styled.div`
  background-color: #1e2945;
  color: white;
  padding: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Property = styled.div`
  align-self: flex-start;
`

const Input = styled.input`
  margin-bottom: 70px;
`

const Button = styled.button`
  cursor: pointer
  background-color: #1e2945;
  padding: 10px;
  border-radius: 5px;
`

const Message = styled.div`
  text-align: left;
`
