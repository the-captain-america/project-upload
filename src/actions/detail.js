import {
  detailTypes,
} from 'types';

const saveDetail = payload => ({
  type: detailTypes.SAVE_DETAIL,
  payload,
});

const saveDetailSuccess = () => ({
  type: detailTypes.SAVE_DETAIL_SUCCESS,
});

const saveDetailFailure = () => ({
  type: detailTypes.SAVE_DETAIL_FAILURE,
});

export default ({ saveDetail, saveDetailSuccess, saveDetailFailure });
