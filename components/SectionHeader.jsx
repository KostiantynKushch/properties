import styled from 'styled-components';
import {
  SCSectionTag,
  SCSectionTagDark,
} from '../styles/commonStyledComponents';

const SectionHeader = ({ tag, tagType, title, description }) => {
  return (
    <Header>
      {tagType === 'dark' ? (
        <SCSectionTagDark>
          <span>{tag}</span>
        </SCSectionTagDark>
      ) : (
        <SCSectionTag>
          <span>{tag}</span>
        </SCSectionTag>
      )}

      <h2 className="title">{title}</h2>
      <div className="short-desc">
        <p>{description}</p>
      </div>
    </Header>
  );
};

const Header = styled.div`
  margin-bottom: 30px;

  .title {
    color: #1e2022;
  }
  .short-desc {
    max-width: 457px;
    margin: 0 auto;
    margin-bottom: 40px;
  }
`;

export default SectionHeader;
