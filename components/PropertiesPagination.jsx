import styled from 'styled-components';

const PropertiesPagination = ({ pages, currentPage, handlePageSwitching }) => {
  return (
    <SCPagination>
      {pages.length > 1 &&
        pages.map((page) => (
          <button
            key={page}
            value={page}
            className={`page ${currentPage == page ? 'page--current' : ''}`}
            onClick={handlePageSwitching}
          >
            {page}
          </button>
        ))}
    </SCPagination>
  );
};

export default PropertiesPagination;

// TODO: add prop-types

const SCPagination = styled.div`
  display: inline-block;
  .page {
    outline: none;
    border: none;
    color: #77838f;
    font-size: 16px;
    background-color: #ffffff;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    transition: all 0.5s ease;
    &--current {
      background-color: #f45757;
      color: #ffffff;
    }
    &:hover {
      background-color: #f2f3f4;
      color: #77838f;
    }
  }

  .page + .page {
    margin-left: 15px;
  }
`;
