import customAxios from '../../utils/axios.config';

export const getUser = async () =>  {
    const data = await customAxios.get('api/user');
    return data.data;
}




