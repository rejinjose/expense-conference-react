import { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { useExpenses } from "../hooks/useExpenses";
import * as S from "./Expenses.styles"; // Import all styles as 'S'
import * as C from "./Common.styles";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/expenses/AddExpense";
import ConfirmDeleteExpense from "../components/expenses/ConfirmDeleteExpense";

function Expenses() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState<{id: string, title: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { expenses, loading, addExpense, loadingMore, hasMore, loadMore, softDeleteExpense } = useExpenses(user?.uid);

    const handleAddExpense = async (data: any) => {
      try {
        await addExpense(data);
        setIsModalOpen(false);
      } catch (e) {
        alert("Failed to save expense");
      }
    };

    const handleConfirmDelete = async () => {
      if (!expenseToDelete) return;
      
      setIsDeleting(true);
      try {
        await softDeleteExpense(expenseToDelete.id);
        setExpenseToDelete(null); // Close modal
      } catch (e) {
        alert("Failed to delete");
      } finally {
        setIsDeleting(false);
      }
    };

  return (
    <>
      <C.HeaderWrapper>
        <PageHeader title="Your Expenses" subtitle={`View your expenses, ${user?.email}.`} />
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>Create Expense</Button>     
      </C.HeaderWrapper>

      <C.ContentSection>
        {loading ? (
          <p>Loading...</p>
        ) : expenses.length === 0 ? (
          <C.EmptyState>
            <h3>No expenses found</h3>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>Add your first expense</Button>
          </C.EmptyState>
        ) : (
          <S.ExpenseGrid>
            {expenses.map((item) => (
              <S.ExpenseCard key={item.id}>
                <div>
                  <h4>{item.title}</h4>
                  <small>{item.date}</small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="amount">${item.amount}</div>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => setExpenseToDelete({ id: item.id, title: item.title })}
                  >
                    Delete
                  </Button>
                </div>
              </S.ExpenseCard>
            ))}
          </S.ExpenseGrid>
        )}

        {hasMore && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Button 
              variant="outline" 
              onClick={loadMore} 
              isLoading={loadingMore}
            >
              Load More
            </Button>
          </div>
        )}
      </C.ContentSection>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddExpenseForm onSubmit={handleAddExpense} />
      </Modal>

      <Modal isOpen={!!expenseToDelete} onClose={() => !isDeleting && setExpenseToDelete(null)}>
        {expenseToDelete && (
          <ConfirmDeleteExpense 
            title={expenseToDelete.title}
            onConfirm={handleConfirmDelete}
            onCancel={() => setExpenseToDelete(null)}
            isLoading={isDeleting}
          />
        )}
      </Modal>
    </>
  );
}

export default Expenses;
