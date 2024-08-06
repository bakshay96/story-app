// storySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createStory, deleteStory, getStories, getStoryById, updateStory } from '../../Services/storyServices';

// Async thunk to get stories
export const fetchStories = createAsyncThunk('stories/get', async (token, { rejectWithValue }) => {
  console.log("thunk token",token)
  try {
    const response = await getStories(token);
    console.log(response)
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to get a specific story
export const fetchStoryById = createAsyncThunk('stories/get/:id', async ({id,token}, { rejectWithValue }) => {
  try {
    const response = await getStoryById({id,token});
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to create a new story
export const createNewStory = createAsyncThunk('stories/createStory', async ({ storyData, token }, { rejectWithValue }) => {
  try {
    const response = await createStory(storyData, token);
    return response;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to update a story
export const updateExistingStory = createAsyncThunk('stories/update:id', async ({ id, text, token }, { rejectWithValue }) => {
  try {
    console.log(id,text,token)
    const response = await updateStory(id, text, token);
    return response;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.data);
  }
});

// Async thunk to delete a story
export const deleteExistingStory = createAsyncThunk('stories/deleteExistingStory', async ({ id, token }, { rejectWithValue }) => {
  try {
    const response = await deleteStory(id, token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Initial state
const initialState = {
  stories: [],
  story: null,
  loading: false,
  error: null,
};

// Story slice
export const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    //get story data
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        console.log("case",action.payload)
        state.stories = action.payload.data.stories;
        toast.success('Stories loaded successfully!');
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || 'Failed to load stories!');
      })

      //get story by id
      .addCase(fetchStoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.story = action.payload;
        toast.success('Story loaded successfully!');
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || 'Failed to load story!');
      })

      //create new story
      .addCase(createNewStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.push(action.payload.story);
        console.log("payload",action.payload,state.stories);
        toast.success('Story created successfully!');
      })
      .addCase(createNewStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || 'Failed to create story!');
      })

      //update story, add contribuiton in the story
      .addCase(updateExistingStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = state.stories.map((story) =>
          story._id === action.payload._id ? action.payload : story
        );
        toast.success('Story updated successfully!');
      })
      .addCase(updateExistingStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || 'Failed to update story!');
      })

      //delete story by id
      .addCase(deleteExistingStory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExistingStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = state.stories.filter((story) => story._id !== action.payload.id);
        toast.success('Story deleted successfully!');
      })
      .addCase(deleteExistingStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message || 'Failed to delete story!');
      });
  },
});


