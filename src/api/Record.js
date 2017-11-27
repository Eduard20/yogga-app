
import api from '../packages/api';

export const GetRecords = () => {
    const uri = `/records`;
    return api.get(uri).then(response => response.json());
};

export const AddRecord = options => {
    const uri = `/record`;
    return api.post(uri, options).then(response => response.json());
};

export const DeleteRecord = Guid => {
    const uri = `/record/${Guid}`;
    return api.delete(uri).then(response => response.json());
};

export const EditRecord = Guid => {
    const uri = `/record/${Guid}`;
    return api.post(uri).then(response => response.json());
};

