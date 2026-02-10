import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type RootState } from "../../store/store";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import * as C from "../Common.styles";

// Assuming you'll use Firebase Functions to generate the token
import { getFunctions, httpsCallable } from "firebase/functions";

function CreateRoom() {
    const { user } = useSelector((state: RootState) => state.auth);
    const [roomName, setRoomName] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const functions = getFunctions();

    const handleCreateRoom = async () => {
        if (!roomName.trim()) return alert("Please enter a room name");
        
        setLoading(true);
        try {
            const createRoomFn = httpsCallable<{roomName: string}, {roomId: string}>(functions, 'createRoom');
            const result = await createRoomFn({ roomName });
            
            // Navigate to a new "Invite" page or the Room itself
            navigate(`/rooms/${result.data.roomId}`);
        } catch (error) {
            console.error("Error creating room:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <C.HeaderWrapper>
            <PageHeader 
                title="Your Room" 
                subtitle={`Ready to start a meeting, ${user?.email}?`} 
            />
            
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    placeholder="Enter Room Name (e.g. Daily-Standup)" 
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <Button 
                    variant="primary" 
                    onClick={handleCreateRoom}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create & Join'}
                </Button>
            </div>
        </C.HeaderWrapper>
    );
}

export default CreateRoom;