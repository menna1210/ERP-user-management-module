import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersApi } from '../services/userService';
import type { User } from '../types/user';

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
    selectedUser: User | null; 
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    selectedUser: null, 
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await fetchUsersApi();
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            });
    }
});

export const { setSelectedUser, clearSelectedUser } = userSlice.actions; 
export default userSlice.reducer;