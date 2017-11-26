
import withoutToken from '../packages/without-token';

export const Login = loginInfo => {
    const uri = '/registration-page';
    return withoutToken.post(uri, loginInfo, options).then(response => response.json());
};