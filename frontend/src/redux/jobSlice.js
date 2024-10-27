import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null, 
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        bookmarkedJobs: [],
    },
    reducers:{
        // actions
        setAllJobs:(state,action) => {
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setBookmarkedJobs:(state,action) => {
            state.bookmarkedJobs = action.payload;
        },
        toggleJobBookmark:(state,action) => {
            const jobId = action.payload;
            const index = state.bookmarkedJobs.indexOf(jobId);
            if (index > -1) {
                state.bookmarkedJobs.splice(index, 1);
            } else {
                state.bookmarkedJobs.push(jobId);
            }
        },
    }
});
export const {
    setAllJobs, 
    setSingleJob, 
    setAllAdminJobs,
    setSearchJobByText, 
    setAllAppliedJobs,
    setSearchedQuery,
    setBookmarkedJobs,
    toggleJobBookmark
} = jobSlice.actions;
export default jobSlice.reducer;