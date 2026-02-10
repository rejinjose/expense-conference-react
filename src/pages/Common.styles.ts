import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center; 
  justify-content: space-between;
  padding: 2rem;
  gap: 1rem;
  flex-wrap: wrap;

  & > div:first-child {
    flex: 1;
    min-width: 300px;
  }
`;

export const ContentSection = styled.section`
  padding: 0 2rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  background: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 8px;
  h3 { margin-bottom: 1rem; color: #666; }
`;