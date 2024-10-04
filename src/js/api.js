import axios from 'axios';

export const getContestList = () =>{
  return axios.get('https://mirror.codeforces.com/api/contest.list?gym=false')
  .then(response =>{
    const data = response.data;
    return data.result;
  })
  .catch(error =>{
    throw new Error(error)
  });
};
export const getHandleInfo = (name) => {
  return axios.get('https://mirror.codeforces.com/api/user.info?handles='+name+'&checkHistoricHandles=false')
  .then(response =>{
    const data = response.data;
    return data.result;
  })
  .catch(error =>{
    throw new Error(error)
  });
};
export const getTitlePhoto = (url) => {
  const config = {
    method: 'get',
    url: url,
    headers:{
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
      'Accept': '*/*', 
      'Host': 'userpic.codeforces.org', 
      'Connection': 'keep-alive'
    },
    responseType: 'blob'
  };
  return new Promise((resolve, reject) => {
    axios(config)
    .then(response => {
      const reader = new FileReader();
      reader.onloadend = function () {
	const base64String = reader.result;
	resolve(base64String);
      };
      reader.readAsDataURL(response.data);
    })
    .catch(error=>{
      console.error('获取图像失败',error);
      reject(error);
    });
  });
};
