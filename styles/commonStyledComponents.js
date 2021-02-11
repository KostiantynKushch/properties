import styled from 'styled-components';

export const SCSection = styled.div`
  min-height: 65vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 0;
  @media screen and (min-width: 1024px) {
    padding: 120px 0;
  }
  text-align: center;
  color: #77838f;
`;

export const SCSectionTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 0.7rem;
    text-align: center;
    background: #ffeeee;
    color: #f45757;
    padding: 5px 20px;
    border-radius: 16px;
    margin-bottom: 15px;
  }
`;

export const SCSectionTagDark = styled(SCSectionTag)`
  span {
    padding: 5px 40px;
    background: rgba(0, 0, 0, 0.15);
    color: #fff;
  }
`;
