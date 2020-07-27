


import { Reducer, Effect } from 'umi';
import { 
    
        create,
    
        deleteItem,
     
     } from './services';
import { message as antdMessage } from 'antd';

export interface StateType {
  status?: 'ok' | 'error'; //当前状态
  message?: string; //消息
  loading: boolean; //选中账号的fu币
}

export interface questionModelType {
  namespace: string;
  state: StateType;
  effects: {
    
        create:Effect;
    
        deleteItem:Effect;
     
  };
  reducers: {
    
        createStatus: Reducer<StateType>;
    
        deleteItemStatus: Reducer<StateType>;
     
    
  };
}

const questionModel: questionModelType = {
  namespace: 'questionList',
  state: {
    status: undefined,
    message: '',
    loading: false,
  },

  effects: {
    
        *create({ payload }, { call, put }) {
            try {
              const response = yield call(create, payload);
              yield put({
                type: 'createStatus',
                status: response.code === 200,
                message: response.message,
              });
            } catch (error) {
              yield put({
                type: 'createStatus',
                status: false,
                message: error.message,
              });
            }
          },
    
        *deleteItem({ payload }, { call, put }) {
            try {
              const response = yield call(deleteItem, payload);
              yield put({
                type: 'deleteItemStatus',
                status: response.code === 200,
                message: response.message,
              });
            } catch (error) {
              yield put({
                type: 'deleteItemStatus',
                status: false,
                message: error.message,
              });
            }
          },
     
  },

  reducers: {
    
        createStatus(state, { status, message }) {
            if (status) {
              antdMessage.success(message);
            } else {
              antdMessage.error(message);
            }
            return {
              ...state,
              loading: status,
            };
          },
    
        deleteItemStatus(state, { status, message }) {
            if (status) {
              antdMessage.success(message);
            } else {
              antdMessage.error(message);
            }
            return {
              ...state,
              loading: status,
            };
          },
     
  },
};

export default questionModel;
