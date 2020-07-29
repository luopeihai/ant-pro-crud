<%
   const modelType = `${name}ModelType`;
   const modelName = `${name}Model`;

   
%>

import { Reducer, Effect } from 'umi';
import { 
    <% for(var i=0; i < modelArray.length; i++) { %>
        <%= `${modelArray[i]},`  %>
    <% } %> 
     } from './services';
import { message as antdMessage } from 'antd';

export interface StateType {
  status?: 'ok' | 'error'; //当前状态
  message?: string; //消息
  loading: boolean; 
}

export interface <%=modelType%> {
  namespace: string;
  state: StateType;
  effects: {
    <% for(var i=0; i < modelArray.length; i++) { %>
        <%= `${modelArray[i]}:Effect`  %>;
    <% } %> 
  };
  reducers: {
    <% for(var i=0; i < modelArray.length; i++) { %>
        <%= `${modelArray[i]}Status`  %>: Reducer<StateType>;
    <% } %> 
    
  };
}

const <%=modelName%>: <%=modelType%> = {
  namespace: '<%=namespace%>',
  state: {
    status: undefined,
    message: '',
    loading: false,
  },

  effects: {
    <% for(var i=0; i < modelArray.length; i++) { %>
        *<%=modelArray[i]%>({ payload }, { call, put }) {
            try {
              const response = yield call(<%=modelArray[i]%>, payload);
              yield put({
                type: '<%=modelArray[i]%>Status',
                status: response.code === 200,
                message: response.message,
              });
            } catch (error) {
              yield put({
                type: '<%=modelArray[i]%>Status',
                status: false,
                message: error.message,
              });
            }
          },
    <% } %> 
  },

  reducers: {
    <% for(var i=0; i < modelArray.length; i++) { %>
        <%=modelArray[i]%>Status(state, { status, message }) {
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
    <% } %> 
  },
};

export default <%=modelName%>;
