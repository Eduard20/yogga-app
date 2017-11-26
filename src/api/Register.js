
import withoutToken from '../packages/without-token';

export const Register = registerInfo => {
    const uri = '/register';
    return withoutToken.post(uri, registerInfo, options).then(response => response.json());
};