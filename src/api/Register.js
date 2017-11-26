
import withoutToken from '../packages/without-token';

export const Register = (registerInfo, options) => {
    const uri = '/register';
    return withoutToken.post(uri, registerInfo, options).then(response => response.json());
};