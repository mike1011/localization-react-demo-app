import API from '../../lib/api';
import errorHelper from '../../utils/errorHelperUtil';

let UserService = {
  create: function(form_data) {
    return API.post('/users', form_data)
    .then(response => {
      console.log(response);
      if (response.status == 200) {
          return response;
      }
      else {
          return []
      }
    })
  .catch(errorHelper.handleAjaxError);
  }
}

export default UserService;