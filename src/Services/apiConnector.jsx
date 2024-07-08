import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  headers: {
    'Content-Type': 'application/json',
  }
});

export const apiConnector = (method, url, bodyData, headers, params) => {

  console.log('API Request Details:');
  console.log('Method:', method);
  console.log('URL:', url);
  console.log('Body Data:', bodyData);
  console.log('Headers:', headers);
  console.log('Params:', params);
  
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData.data : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};