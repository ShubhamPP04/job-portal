import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setBookmarkedJobs } from '@/redux/jobSlice';

const useInitializeUser = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      if (user) {
        try {
          const response = await axios.get(`${JOB_API_END_POINT}/bookmarked`, { withCredentials: true });
          dispatch(setBookmarkedJobs(response.data.bookmarkedJobs.map(job => job._id)));
        } catch (error) {
          console.error('Error fetching bookmarked jobs:', error);
        }
      }
    };

    fetchBookmarkedJobs();
  }, [user, dispatch]);
};

export default useInitializeUser;