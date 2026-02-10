import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { type RootState } from '../../store/store';
import Button from '../../components/Button';

function RoomDetails() {
    const { roomId } = useParams();
    const { user } = useSelector((state: RootState) => state.auth);
    const [room, setRoom] = useState<any>(null);
    const navigate = useNavigate();
    const [newEmail, setNewEmail] = useState("");

    useEffect(() => {
        if (!roomId) return;
        return onSnapshot(
            doc(db, "rooms", roomId),
            { includeMetadataChanges: true }, 
            (snap) => {
            const source = snap.metadata.hasPendingWrites ? "Local Cache" : "Server";
            console.log(`Data came from: ${source}`);
            setRoom(snap.data());
        });
    }, [roomId]);

    const handleInvite = async () => {
        if (!newEmail.trim() || !roomId) return;

        try {
            const roomRef = doc(db, "rooms", roomId);
            // This will fail on the server side if current user is not the host
            await updateDoc(roomRef, {
                invitedUsers: arrayUnion(newEmail.trim())
            });
            setNewEmail("");
            console.log('User added from FE');
            alert("User invited successfully!");
        } catch (error) {
            console.error("Security Error: You do not have permission to invite users.", error);
            alert("Permission denied. Only the host can invite users.");
        }
    };

    if (!room) return <p>Loading room details...</p>;

    // Check if current user is the host
    const isHost = user?.uid === room.hostId;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{room.roomName}</h1>
            <p><strong>Created:</strong> {room.createdAt?.toDate().toLocaleString()}</p>
            <p><strong>Host:</strong> {room.hostEmail}</p>

            {/* ONLY SHOW INVITE UI TO THE HOST */}
            {isHost && (
                <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ddd' }}>
                    <h3>Invite New Participant</h3>
                    <input
                        type="email"
                        placeholder="guest@example.com"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <Button onClick={handleInvite} variant="primary">Add to Room</Button>
                </div>
            )}

            <h3>Invited Users:</h3>
            <ul>
                {room.invitedUsers.map((email: string) => (
                    <li key={email}>{email}</li>
                ))}
            </ul>

            <Button
                onClick={() => navigate(`/rooms/${roomId}/permission`)}
                variant="primary">Join Meeting
            </Button>
        </div>
    );
}

export default RoomDetails;