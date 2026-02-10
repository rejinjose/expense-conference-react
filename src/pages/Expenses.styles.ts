// Expenses.styles.ts
import styled from 'styled-components';

export const ExpenseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const ExpenseCard = styled.div`
  border: 1px solid #eee;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .amount { font-weight: bold; color: #0070f3; font-size: 1.2rem; }
`;
