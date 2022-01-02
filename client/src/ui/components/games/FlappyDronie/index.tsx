import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { flappydronie, socket } from '../../../../core';
import Bird from './components/Bird';
import Background from './components/Background';
import Pipe from './components/Pipe';
import Foreground from './components/Foreground';
import { useGame } from './hooks/useGame';
import { inputHandler } from './controller';

const FlappyDronie: React.FC = () => {
  const { backgrounds, foregrounds, bird, pipeSets } = useGame();
  const [playonline, canvasDimensions] = useAgile([
    flappydronie.PLAY_ONLINE,
    flappydronie.CANVAS_DIMENSIONS,
  ]);

  React.useEffect(() => {
    if (playonline) {
      const connectSocket = async () => {
        await socket.socketService
          .connect('http://localhost:9000')
          .catch((err) => {
            console.log('Error: ', err);
          });
      };
      connectSocket();
    }
  }, [playonline]);

  return (
    <Container
      id="flappydronie"
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      onClick={inputHandler}
    >
      {backgrounds.map((bg) => (
        <Background sprite={bg} key={bg.id} />
      ))}
      {pipeSets.map((pipeSet) => (
        <>
          <Pipe sprite={pipeSet.topPipe} key={pipeSet.topPipe.id} />
          <Pipe sprite={pipeSet.bottomPipe} key={pipeSet.bottomPipe.id} />
        </>
      ))}
      <Bird sprite={bird} key={bird.id} />
      {foregrounds.map((fg) => (
        <Foreground sprite={fg} key={fg.id} />
      ))}
    </Container>
  );
};

export default FlappyDronie;

const Container = styled.div<{ width: number; height: number }>`
  position: relative;
  overflow: hidden;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: #a79a89;
`;
