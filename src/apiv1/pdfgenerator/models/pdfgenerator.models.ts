import got from 'got';
class Synchroteam {
  session: any;

  constructor(session: any) {
    this.session = session;
  }
  generateTVA = async (method, endpoint, encode = 'BLOB') => {
    const headers = {
      method: method,
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      accept: 'text/json',
      authorization: 'Basic ZXRpZW5uZToxMTcwMjlhNy1hZTliLTQ5ZTUtYjc3Yy1mMTAyYjA0ZWZhY2M=',
    };
    try {
      let jobList = await got(endpoint, {
        headers: headers,
        http2: true,
      });
      if (encode == 'JSON') {
        const { body } = jobList;
        return { data: body ?? {} };
      } else {
        return jobList;
      }
    } catch (e) {
      return { data: e };
    }
  };
}
export default Synchroteam;
