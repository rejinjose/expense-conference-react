import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { httpsCallable, getFunctions } from 'firebase/functions';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';
import '@livekit/components-styles';

export default function ActiveRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { selectedCameraId, selectedMicId } = useSelector((state: RootState) => state.devices);
  const { user } = useSelector((state: RootState) => state.auth);
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const functions = getFunctions();
        const getToken = httpsCallable(functions, 'getLiveKitToken');
        const result: any = await getToken({ roomId });
        setToken(result.data.token);
        console.log(result.data.token);
      } catch (err: any) {
        console.error("Access Denied:", err);
        setError("You do not have permission to enter this room.");
        // Redirect back to room list after 3 seconds
        setTimeout(() => navigate('/rooms'), 3000);
      }
    };

    if (user) fetchToken();
  }, [roomId, user, navigate]);

  if (error) return <div style={{ color: 'red', padding: '20px' }}>{error} Redirecting...</div>;
  if (token === "") return <div>Verifying Credentials...</div>;

  return (
    <div style={{ height: '100vh' }}>
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        connect={true}
        serverUrl={import.meta.env.VITE_LIVEKIT_URL} // Your LiveKit Cloud URL
        options={{
          // Use the logic below to ensure we only pass a deviceId if it actually exists
          videoCaptureDefaults: selectedCameraId ? { deviceId: selectedCameraId } : undefined,
          audioCaptureDefaults: selectedMicId ? { deviceId: selectedMicId } : undefined,
        }}
        onDisconnected={() => {
          console.log("Left the room");
          navigate(`/rooms/${roomId}`); // Redirect to your RoomDetails page
        }}
        data-lk-theme="default"
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  );
}