
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
  questionList: StateType;
  rowId?: number; //更新 有值
}


const OpForm: React.FC<FormProps> = ({
  dispatch,
  modalVisible,
  onCancel,
  questionList,
  submitting,
  rowId = 0,
}) => {
  const [form] = Form.useForm();
  const { loading, detail } = questionList;

  //修改 请求详情
  useEffect(() => {
    //大于0 请求详情
    if (rowId) {
      dispatch({
        type: 'questionList/detail',
        payload: rowId,
      });
    }
  }, [rowId]);

  useEffect(() => {
    //修改 设置详情
    form.setFieldsValue({
         
    });

  }, [detail]);

  /**
   *
   * @param values 表单值
   * 提交表单
   */
  const onFinish = (values) => {
    

    let dispatchType = 'questionList/create';
    if (rowId) {
      values.questionId = rowId;
      dispatchType = 'questionList/update';
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
  }, [questionList]);


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
        
               <Row>
               <Col span={17}>
                 <Form.Item
                   label="bannerId"
                   name="moduleName"
                   rules={[{ required: true, message: '请填写bannerId' }]}
                 >
                   <Input placeholder="请填写bannerId" />
                 </Form.Item>
               </Col>
             </Row>
        
               <Row>
               <Col span={17}>
                 <Form.Item
                   label="questionId"
                   name="moduleName"
                   rules={[{ required: true, message: '请填写questionId' }]}
                 >
                   <Input placeholder="请填写questionId" />
                 </Form.Item>
               </Col>
             </Row>
         
       
     
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
    questionList,
    loading,
  }: {
    questionList: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    questionList,
    submitting: loading.effects['questionList/create'],
  }),
)(OpForm);
