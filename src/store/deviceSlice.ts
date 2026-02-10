import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface DeviceState {
  selectedCameraId: string | null;
  selectedMicId: string | null;
}

const initialState: DeviceState = {
  selectedCameraId: localStorage.getItem('livekit_preferred_cam'),
  selectedMicId: localStorage.getItem('livekit_preferred_mic'),
};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setCameraId: (state, action: PayloadAction<string>) => {
      state.selectedCameraId = action.payload;
      localStorage.setItem('livekit_preferred_cam', action.payload);
    },
    setMicId: (state, action: PayloadAction<string>) => {
      state.selectedMicId = action.payload;
      localStorage.setItem('livekit_preferred_mic', action.payload);
    },
  },
});

export const { setCameraId, setMicId } = deviceSlice.actions;
export default deviceSlice.reducer;
