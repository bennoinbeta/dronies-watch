import React from 'react';
import styled from 'styled-components';
import LinesBackground from '../../../../../../components/primitive/background/LinesBackground';

// Assets
import TrainingProtocolImg from '../../../../../../../assets/app/training_protocol.png';

const TrainingProtocol: React.FC = () => (
  <Container linesCount={0} opacity={0.3}>
    <InnerContainer>
      <img src={TrainingProtocolImg} loading="lazy" alt="TrainingProtocolImg" />
      <Text>
        <span style={{ fontWeight: 'bold' }}>Dronies Lab is an initiative</span>{' '}
        that was founded after some Dronies were discovered and destroied by
        humanity. Train your Dronie here to give it a better chance of survival.
      </Text>
    </InnerContainer>
  </Container>
);

export default TrainingProtocol;

const Container = styled(LinesBackground)`
  margin-bottom: 80px;

  width: 90%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.p`
  max-width: 450px;
  margin-left: 25px;

  text-align: left;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 1rem;
`;