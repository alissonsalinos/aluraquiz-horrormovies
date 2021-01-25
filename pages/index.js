import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'

const BackgroundImage = styled.div`
background: ${db.theme.colors.mainBg};
flex: 1;
`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;



export default function Home() {
  return (
    <QuizBackground>
      <QuizContainer>
        <Widget>
            <Widget.Header>
              <h1>80' Horror Movies</h1>
            </Widget.Header>
            <Widget.Content>  
              <p>Dolar sit amet...</p>
            </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quizzes da galera</h1>
            <p>Dolar sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/alissonsalios" />
    </QuizBackground>
  )
}
