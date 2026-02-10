// components/expenses/ConfirmDeleteModal.tsx
import styled from 'styled-components';
import Button from '../Button';

const ActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

interface ConfirmDeleteProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmDeleteExpense({ title, onConfirm, onCancel, isLoading }: ConfirmDeleteProps) {
  return (
    <div>
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete <strong>"{title}"</strong>? This action cannot be undone.</p>
      <ActionGroup>
        <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
          Delete Expense
        </Button>
      </ActionGroup>
    </div>
  );
}
