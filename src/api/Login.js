
import withoutToken from 'packages/without-token';

export const Login = loginInfo => {
    const uri = '/login';
    return withoutToken.post(uri, loginInfo, options).then(response => response.json());
};