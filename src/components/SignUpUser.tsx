import { FunctionComponent, useState } from 'react'
import { styled } from 'styled-components'
import { onCheckUserName, onCreateUser } from '../api/room'

const SignUpUser: FunctionComponent = () => {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [occupiedUserName, setOccupiedUserName] = useState<string | undefined>(undefined)

  const handleOnChangeUserName = async (value: string) => {
    const checkUserNameAvailability = await onCheckUserName(value)
    setUserName(value)

    if (checkUserNameAvailability?.user_name) {
      setOccupiedUserName(value)
      return
    }
    setOccupiedUserName(undefined)
  }

  const handleOnChangePassword = (value: string) => {
    setPassword(value)
  }

  const handleOnCreateUser = async () => {
    const input = {
      user_name: userName,
      password: password
    }
    await onCreateUser(input)
    setUserName('')
    setPassword('')
  }

  return (
    <Container>
      <SubContainer style={{ marginBottom: '100px' }}>
        <div style={{ marginBottom: '70px' }}>Sign up</div>
        <Property>User name</Property>
        <Input
          type='text'
          placeholder='Enter user name'
          defaultValue={userName}
          onBlur={(e) => handleOnChangeUserName(e.target.value)}
          occupiedUserName={occupiedUserName}
        />
        {occupiedUserName !== undefined && <Message>{occupiedUserName} is occupied. Sign up with another user name please.</Message>}
        <Property>Password</Property>
        <Input
          type='password'
          placeholder='Enter password'
          defaultValue={password}
          onBlur={(e) => handleOnChangePassword(e.target.value)}
          occupiedUserName={occupiedUserName}
        />
        <Button onClick={() => handleOnCreateUser()}>Submit</Button>
      </SubContainer>
    </Container>
  )
}
export default SignUpUser

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

const Input = styled.input<{ occupiedUserName: string | undefined }>`
  margin-bottom: ${(props) => (props.occupiedUserName ? '5px' : '70px')};
`

const Message = styled.div`
  margin-bottom: 50px;
  text-align: left;
`

const Button = styled.button`
  cursor: pointer
  background-color: #1e2945;
  padding: 10px;
  border-radius: 5px;
`
