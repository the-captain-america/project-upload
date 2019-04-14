import {
  uploadTypes,
} from 'types';

const uploadItemSuccess = () => ({
  type: uploadTypes.UPLOAD_ITEM_SUCCESS,
});

const uploadItemFailure = () => ({
  type: uploadTypes.UPLOAD_ITEM_FAILURE,
});

const uploadItem = payload => ({
  type: uploadTypes.UPLOAD_ITEM,
  payload,
});

export default ({ uploadItem, uploadItemSuccess, uploadItemFailure });
