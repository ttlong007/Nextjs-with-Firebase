import axios from 'axios';
import * as _ from 'lodash';
import { url } from './constant';

export const service = axios.create({
    baseURL: url,
    timeout: 30*1000, //API request timeout set to 30s 
    headers: {
        'Content-Type': 'application/json',
    }
});

//prevent dupplicate request
const pending = {};
const CancelToken = axios.CancelToken;
const removePending = (config, f) => {
    //make sure url is same for both req & res
    const url = config.url.replace(config.baseURL, '/');
    //stringtify RESTful request with URL params
    const flagUrl = url + '&' + config.method + '&' + JSON.stringify(config.params);
    if(flagUrl in pending) {
        if(f) {
            f(); //abort request
        } else {
            delete pending[flagUrl];
        }
    } else {
        if(f) {
            pending[flagUrl] = f; //store the cancel function
        }
    }
}

// axios interceptors
service.interceptors.request.use(config => {
    // set cancel token for either all or specific request
    // ex: config.method == 'options'
    // if(!config.hasOwnProperty('isHideLoading')) {

    // }

    if(!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`
    }

    config.cancelToken = new CancelToken((c) => {
        removePending(config, c);
    });

    return config;
}, error => {
    Promise.reject(error);
});


service.interceptors.response.use(response => {
    removePending(response.config);
    return response.data;
}, error => {
    let { response } = error;
	let code = _.get(response, 'status');
	if(code === 401) {
		/** Reset token */
		if(_.includes(window.location.pathname, '/admin'))
		{
			remove(TYPE.ADMIN);
		}
		else
		{
			remove(TYPE.GUEST);
		}

		toastr.error('Hết phiên đăng nhập.', '', {
			positionClass: "toast-bottom-center",
			closeButton: true,
			progressBar: true,
			onHidden: () => {
				window.location.reload();
			}
		});
	}

    if(!axios.isCancel(error)){
        return Promise.reject(error);
    } else {
        return Promise.resolve({});
    }
})