import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, or } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { type RootState } from '../../store/store';
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import * as C from "../Common.styles";

function RoomsList() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [rooms, setRooms] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    // Query: Room where user is Host OR User is in invitedUsers list
    const q = query(
      collection(db, "rooms"),
      or(
        where("hostId", "==", user.uid),
        where("invitedUsers", "array-contains", user.email)
      )
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomsData);
    });

    return unsubscribe;
  }, [user]);

  return (
    <>
      <C.HeaderWrapper>
        <PageHeader
          title="Your Room List"
          subtitle={`You can find all your meetings here, ${user?.email}`}
        />
        <Button 
            variant="primary" 
            onClick={() => navigate(`/create-room`)}
        >
          Create New Room
        </Button>
      </C.HeaderWrapper>
      <div>
        <h2>Your Meetings</h2>
        {rooms.length === 0 ? <p>No rooms found.</p> : (
          <ul>
            {rooms.map(room => (
              <li key={room.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <h3>{room.roomName}</h3>
                <p>Host: {room.hostEmail}</p>
                <Link to={`/rooms/${room.id}`}>View Details</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default RoomsList;