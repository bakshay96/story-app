import {
	createAsyncThunk,
	createSlice,
	
} from "@reduxjs/toolkit";
import { currentUser, loginUser, logoutUser, registerUser } from "../../Services/authServices";
import { toast } from "react-toastify";


export const register = createAsyncThunk(
	"auth/register",
	async (userData, { rejectWithValue }) => {
		try {
			return await registerUser(userData);
		} catch (error) {
       console.log("slice error",error)
       //toast.error(`${error.response.data.status} ${error.response.data.message}`)
       
			return rejectWithValue(error.response.data);
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (userData, { rejectWithValue }) => {
		try {
			return await loginUser(userData);
		} catch (error) {
      
			return rejectWithValue(error.response.data);
		}
	}
);

export const existingUser= createAsyncThunk('auth/me', (token,{rejectWithValue})=>{

  try {
       return currentUser(token);
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const logout = createAsyncThunk("auth/logout", async (token, { rejectWithValue }) => {
		try {
      return await logoutUser(token);
            
			
		} catch (error) {
      console.log("logout",error)
			return rejectWithValue(error.response.data);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: localStorage.getItem("token") || null,
		loading: false,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},

	extraReducers: (builder) => {
        builder

        //registration
          .addCase(register.pending, (state) => {
            state.loading = true;
          })
          .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            state.token = action.payload.data.token;
            localStorage.setItem('token', action.payload.data.token);
            console.log("reg slice",action.payload)
            toast.success(action.payload.message || 'Registration successful !');
           
          })
          .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
           // console.log(action.payload)
            toast.error(action.payload.message || 'Registration failed!');
            toast.info("use different credentials")
          })

          //login
          .addCase(login.pending, (state) => {
            state.loading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
            console.log("res slice",action.payload)
            toast.success('Login successful!');
          })
          .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
            toast.error(`${action.payload.message} `|| 'Login failed!');
          })

          //logout
          .addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.token = null;
            toast.info('Logged out successfully done!');
          })

          // current user 
          .addCase(existingUser.pending , (state)=>{
            state.pending=true;
          })
          
          .addCase(existingUser.fulfilled,(state,action)=>{
            state.user=action.payload.user;
          })

          .addCase(existingUser.rejected , (state,action)=>{
            state.pending=false;
            state.error=action.payload.message;
          });
      },
    });
    

export const { setUser } = authSlice.actions;
