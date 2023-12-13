import fp from 'lodash/fp';
import axios from 'axios';
import { A1_API_URL } from '../libs/Constants';

const useDashboard = () => {
  // 챗지피티 연동
  const getGptAnswerApi = async (param) => {
    try {
      const res = await axios({
        url: A1_API_URL + `/api/getGptAnswer`,
        method: 'GET',
        params: param,
      })

      if (fp.getOr(0, 'data.header.resultCode', res) !== 0)
        throw new Error(fp.getOr('', 'data.header.resultMessage', res));
      return fp.getOr({}, 'data', res.data);
    } catch (error) {
      console.log('error', error?.message);
      alert('챗지피티 연동에 실패했습니다.');
      return {};
    }
  };

  return { 
    getGptAnswerApi,
  };
}

export default useDashboard;
