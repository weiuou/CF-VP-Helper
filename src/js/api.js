import axios from 'axios';

export const getContestList = () =>{
  return axios.get('https://codeforces.com/api/contest.list?gym=false')
  .then(response =>{
    const data = response.data;
    console.log(data.result);
    return data.result;
  })
  .catch(error =>{
    throw new Error(error)
  });
};
