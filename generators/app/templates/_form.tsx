<%
  const namespace = `${name}List`;
  const {params:createParams} = create;
  const {params:updateParams} = update;
  
%>
import React, { useEffect, useState, useRef } from 'react';
import { Form, Modal, Row, Col, Button, Input, message as antdMessage } from 'antd';
import { connect, AnyAction, Dispatch } from 'umi';
import ImageUpload from '@/components/ImageUpload';
import { StateType } from './model';

interface FormProps {
  dispatch: Dispatch<AnyAction>;
  modalVisible: boolean;
  onCancel: () => void;
  submitting?: boolean;
  <%=namespace%>: StateType;
  rowId?: number; //更新 有值
}


const OpForm: React.FC<FormProps> = ({
  dispatch,
  modalVisible,
  onCancel,
  <%=namespace%>,
  submitting,
  rowId = 0,
}) => {
  const [form] = Form.useForm();
  const { loading, detail } = <%=namespace%>;

  //修改 请求详情
  useEffect(() => {
    //大于0 请求详情
    if (rowId) {
      dispatch({
        type: '<%=namespace%>/detail',
        payload: rowId,
      });
    }
  }, [rowId]);

  useEffect(() => {
    //修改 设置详情
    form.setFieldsValue({
        <% for(var i=0; i < updateParams.length; i++) { %>
              '<%=updateParams[i].value%>': "",
          <% } %> 
    });

  }, [detail]);

  /**
   *
   * @param values 表单值
   * 提交表单
   */
  const onFinish = (values) => {
    

    let dispatchType = '<%=namespace%>/create';
    if (rowId) {
      values.<%=name%>Id = rowId;
      dispatchType = '<%=namespace%>/update';
    }

    dispatch({
      type: dispatchType,
      payload: {
        ...values,
      },
    });
  };

  useEffect(() => {
    if (loading) {
      //重新加载
      form.resetFields();
      rowId = 0;
    }
  }, [<%=namespace%>]);


  const onClose = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      destroyOnClose
      title={rowId ? '修改' : '添加'}
      visible={modalVisible}
      onCancel={onClose}
      footer={null}
    >
      <Form style={{ marginTop: 8 }} form={form} name="form" onFinish={onFinish}>
        <% for(var i=0; i < createParams.length; i++) { %>
               <Row>
               <Col span={17}>
                 <Form.Item
                   label="<%=createParams[i].description%>"
                   name="moduleName"
                   rules={[{ required: true, message: '请填写<%=createParams[i].description%>' }]}
                 >
                   <Input placeholder="请填写<%=createParams[i].description%>" />
                 </Form.Item>
               </Col>
             </Row>
        <% } %> 
       
     
        <div className="submit-box ">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {rowId ? '确认修改' : '添加'}
            </Button>
            <Button onClick={onClose}>取消</Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default connect(
  ({
    <%=namespace%>,
    loading,
  }: {
    <%=namespace%>: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    <%=namespace%>,
    submitting: loading.effects['<%=namespace%>/create'],
  }),
)(OpForm);
