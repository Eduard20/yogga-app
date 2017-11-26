
import api from '../packages/api';

export const GetRecords = () => {
    const uri = `/api/records`;
    return api.get(uri).then(response => response.json());
};

export const AddRecord = () => {
    const uri = `/api/record`;
    return api.post(uri).then(response => response.json());
};

export const DeleteRecord = Guid => {
    const uri = `/api/record/${Guid}`;
    return api.delete(uri).then(response => response.json());
};

export const EditRecord = Guid => {
    const uri = `/api/record/${Guid}`;
    return api.post(uri).then(response => response.json());
};

