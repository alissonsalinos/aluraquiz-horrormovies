import React from 'react';
import { useRouter } from 'next/router';

import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Footer from '../src/components/Footer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <QuizBackground>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Horror Movies Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            { /* eslint-disable-next-line func-names */ }
            <form onSubmit={function (e) {
              e.preventDefault();
              router.push(`/quiz?name=${name}`);
              // eslint-disable-next-line no-console
              console.log('passando o nome');
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h2>Quizzes da galera</h2>
            <p>Dolar sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/alissonsalinos/aluraquiz-horrormovies" />
    </QuizBackground>
  );
}
