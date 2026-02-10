import { useState, useEffect, useCallback } from 'react';
import { createLocalTracks, Room } from 'livekit-client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setCameraId, setMicId } from '../store/deviceSlice';
import { type RootState } from '../store/store';
import Button from '../components/Button';

const CAM_KEY = 'livekit_preferred_cam';
const MIC_KEY = 'livekit_preferred_mic';

function Permission() {
  const { roomId } = useParams(); // Get roomId from URL if present
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get stored IDs from Redux to keep UI in sync
  const { selectedCameraId, selectedMicId } = useSelector((state: RootState) => state.devices);

  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [status, setStatus] = useState<'idle' | 'granted' | 'denied'>('idle');

  // Logic to load devices and sync state
  const loadDevices = useCallback(async () => {
    try {
      const videoDevices = await Room.getLocalDevices('videoinput', false);
      const audioDevices = await Room.getLocalDevices('audioinput', false);

      setDevices([...videoDevices, ...audioDevices]);

      // Use Redux values if available, otherwise localStorage, otherwise first device
      const savedCam = selectedCameraId || localStorage.getItem(CAM_KEY);
      const savedMic = selectedMicId || localStorage.getItem(MIC_KEY);

      const camToSet = videoDevices.find(d => d.deviceId === savedCam)?.deviceId || videoDevices[0]?.deviceId || '';
      const micToSet = audioDevices.find(d => d.deviceId === savedMic)?.deviceId || audioDevices[0]?.deviceId || '';

      dispatch(setCameraId(camToSet));
      dispatch(setMicId(micToSet));
      setStatus('granted');
    } catch (err) {
      console.error("Error loading devices:", err);
    }
  }, [dispatch, selectedCameraId, selectedMicId]);

  // Check permission status on Mount
  useEffect(() => {
    const checkStatus = async () => {
      // Query the browser permission API
      const camPerm = await navigator.permissions.query({ name: 'camera' as PermissionName });
      const micPerm = await navigator.permissions.query({ name: 'microphone' as PermissionName });

      if (camPerm.state === 'granted' && micPerm.state === 'granted') {
        loadDevices();
      }
    };
    checkStatus();
  }, [loadDevices]);

  const handleGrantPermission = async () => {
    try {
      setStatus('idle');

      // 1. LiveKit way: Create local tracks to trigger permission prompt
      // This is cleaner than raw navigator.mediaDevices
      const tracks = await createLocalTracks({
        video: true,
        audio: true,
      });

      // 2. Once tracks are created, stop them to release hardware
      tracks.forEach(track => track.stop());

      await loadDevices();

    } catch (err) {
      console.error("LiveKit permission error:", err);
      setStatus('denied');
    }
  };

  const handleProceedToMeeting = () => {
    if (status === 'granted') {
      navigate(`/rooms/${roomId}/join`);
    }
  };


  return (
    <div style={{ padding: '20px' }}>
      <h2>Media Permissions (LiveKit)</h2>

      {status !== 'granted' ? (
        <button onClick={handleGrantPermission} style={{ padding: '10px 20px' }}>
          Grant Permission
        </button>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h3>Hardware Ready</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>
              Camera:
              <select value={selectedCameraId || ''} onChange={(e) => dispatch(setCameraId(e.target.value))}>
                {devices.filter(d => d.kind === 'videoinput').map(d => (
                  <option key={d.deviceId} value={d.deviceId}>{d.label || 'Unknown Camera'}</option>
                ))}
              </select>
            </label>

            <label>
              Microphone:
              <select value={selectedMicId || ''} onChange={(e) => dispatch(setMicId(e.target.value))}>
                {devices.filter(d => d.kind === 'audioinput').map(d => (
                  <option key={d.deviceId} value={d.deviceId}>{d.label || 'Unknown Mic'}</option>
                ))}
              </select>
            </label>
          </div>

          {status === 'granted' && (
            <Button
              variant="primary"
              onClick={handleProceedToMeeting}
              style={{ marginTop: '20px' }}
            >
              Enter Meeting Room
            </Button>
          )};


        </div>
      )}
    </div>
  );
}

export default Permission;
