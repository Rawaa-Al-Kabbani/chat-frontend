import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'

const SignButtonList: FunctionComponent = () => {
  const navigate = useNavigate()
  const isLoggedIn = window.localStorage.getItem('token')

  const handleOnSignUp = () => {
    navigate('sign_up')
  }

  const handleOnSignIn = () => {
    navigate('sign_in')
  }

  const handleOnLogout = () => {
    window.localStorage.removeItem('token')
    navigate('sign_in')
  }

  return (
    <Container>
      {isLoggedIn ? (
        <Buttons>
          <Button onClick={() => handleOnLogout()}>Log out</Button>
        </Buttons>
      ) : (
        <Buttons>
          <Button onClick={() => handleOnSignIn()}>Sign in</Button>
          <Button onClick={() => handleOnSignUp()} style={{ marginLeft: '6px' }}>
            Sign up
          </Button>
        </Buttons>
      )}
    </Container>
  )
}
export default SignButtonList

const Container = styled.div`
  text-align: center;
  width: 900px;
  margin: 70px auto auto;
`

const Buttons = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  margin-left: 30px;
  align-self: flex-end;
  justify-content: flex-end;
`

const Button = styled.button`
  background-color: #1e2945;
  color: white;
  padding: 10px;
  border-radius: 5px;
`
