import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = (email) => {
   return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
   return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export const DependentQueries = ({ email }) => {
   // the LoggedIn user's email is passed as a prop
   const { data: user } = useQuery(['user', email], () =>
      fetchUserByEmail(email)
   );
   const channelId = user?.data.channelId;

   // this useQuery should only be fired when the channelId has been retrieved above.
   const { data: coursesData } = useQuery(
      ['courses', channelId],
      () => fetchCoursesByChannelId(channelId),
      {
         enabled: !!channelId,
      }
   );

   console.log(coursesData?.data.courses);

   return (
      <div>
         <h1>DependentQueries</h1>

         {coursesData?.data.courses.map((course) => {
               return <h2 key={course}>{course}</h2>;
            })}
      </div>
   );
};
