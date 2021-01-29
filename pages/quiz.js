/* eslint-disable react/prop-types */
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
// import Footer from '../src/components/Footer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';
import LoadingBar from '../src/components/Loading';
import MessageSuccess from '../src/components/Messages/MessageSuccess';
import MessageError from '../src/components/Messages/MessageError';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {' '}
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}

        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h3>
          Carregando...
        </h3>
      </Widget.Header>

      <Widget.Content>
        <LoadingBar />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <>
      <Widget>
        <Widget.Header>
          <h3>
            {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
          </h3>
        </Widget.Header>

        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
        <Widget.Content>
          <h2 style={{ marginBottom: '20px' }}>
            {question.title}
          </h2>
          <AlternativesForm onSubmit={(infosDoEnvento) => {
            infosDoEnvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3.5 * 1000);
          }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === alternativeIndex;
              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                  key={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}

                </Widget.Topic>
              );
            })}
            <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
          </AlternativesForm>
        </Widget.Content>
      </Widget>
      {isQuestionSubmited && isCorrect && (
        <MessageSuccess isCorrect={isCorrect} />
      )}
      {isQuestionSubmited && !isCorrect && (
        <MessageError isCorrect="" />
      )}
    </>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground>
      <QuizContainer>
        <QuizLogo />

        { screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          totalQuestions={totalQuestions}
          questionIndex={questionIndex}
          onSubmit={handleSubmitQuiz}
          addResult={addResult}
        />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
        {/* <Footer /> */}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/alissonsalinos/aluraquiz-horrormovies" />
    </QuizBackground>
  );
}
