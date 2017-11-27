
import withoutToken from '../packages/without-token';

export const Login = loginInfo => {
    const uri = '/registration-page';
    return withoutToken.post(uri, loginInfo).then(response => response.json());
};