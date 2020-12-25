import styled from 'styled-components';
import { SCSection } from './commonStyledComponens';

export const SCHeroSection = styled.div`
  background: #99a2aa;
  color: #fff;
`;
export const SCHeroInner = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    max-width: 555px;
    text-align: center;
  }
`;
