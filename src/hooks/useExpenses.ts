// hooks/useExpenses.ts
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp, doc, updateDoc, QueryDocumentSnapshot, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const useExpenses = (userId: string | undefined) => {
    const [expenses, setExpenses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const PAGE_SIZE = 1;

    useEffect(() => {
        if (!userId) return;
        const q = query(
            collection(db, "expenses"),
            where("uid", "==", userId),
            where("status", "==", "active"),
            orderBy("createdAt", "desc"),
            limit(PAGE_SIZE + 1)
        );
        // Real-time listener for the first page
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            if (docs.length > PAGE_SIZE) {
                setHasMore(true);
                docs.pop(); // Remove the extra item used for checking
            } else {
                setHasMore(false);
            }
            setExpenses(docs);
            setLastDoc(snapshot.docs[snapshot.docs.length - 2] || null);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);

    const loadMore = async () => {
        if (!lastDoc || !userId || loadingMore) return;

        setLoadingMore(true);
        const nextQ = query(
            collection(db, "expenses"),
            where("uid", "==", userId),
            where("status", "==", "active"),
            orderBy("createdAt", "desc"),
            startAfter(lastDoc),
            limit(PAGE_SIZE + 1)
        );

        const snapshot = await getDocs(nextQ);
        const newDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (newDocs.length > PAGE_SIZE) {
            setHasMore(true);
            newDocs.pop(); // Remove the extra item used for checking
        } else {
            setHasMore(false);
        }
        
        setExpenses(prev => [...prev, ...newDocs]); // Append new items
        setLastDoc(snapshot.docs[snapshot.docs.length - 2] || null);
        setLoadingMore(false);
    };

    const addExpense = async (data: any) => {
        if (!userId) throw new Error("No User ID");
        return addDoc(collection(db, "expenses"), {
            ...data,
            amount: Number(data.amount),
            uid: userId,
            status: "active",
            createdAt: serverTimestamp()
        });
    };

    const softDeleteExpense = async (expenseId: string) => {
        try {
            // Reference the specific document
            const expenseDoc = doc(db, "expenses", expenseId);
            // Soft delete: update status so onSnapshot automatically removes it from the list
            await updateDoc(expenseDoc, { status: "deleted" });
            // onSnapshot will automatically detect this and remove it from your UI
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    return { expenses, loading, loadingMore, hasMore, addExpense, loadMore, softDeleteExpense };
};
