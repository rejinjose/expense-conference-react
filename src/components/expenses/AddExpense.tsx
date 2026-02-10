import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Form = styled.form`
  display: flex; flex-direction: column; gap: 1rem;
  input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }

  && button {
    opacity: 0.5 !important;
  }
  && button: hover {
    opacity: 1 !important;
  }
`;

export default function AddExpenseForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({ title: '', subtitle: '', amount: '', date: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Add New Expense</h3>
      <input type="text" placeholder="Title" required onChange={(e) => setFormData({...formData, title: e.target.value})} />
      <input type="text" placeholder="Subtitle (Optional)" onChange={(e) => setFormData({...formData, subtitle: e.target.value})} />
      <input type="number" placeholder="Amount" required onChange={(e) => setFormData({...formData, amount: e.target.value})} />
      <input type="date" required onChange={(e) => setFormData({...formData, date: e.target.value})} />
      <Button type="submit" variant="danger" size="md">Save Expense</Button>
    </Form>
  );
}
