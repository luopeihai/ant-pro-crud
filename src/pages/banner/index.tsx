


import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React, { useState, useRef, useEffect } from "react";
import { Button, Divider, Modal, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { connect, AnyAction, Dispatch, Link } from "umi";
import { row } from "./data.d";
import { queryList} from "./services";
import OpForm from "./_form";

import { StateType } from "./model";

interface tableProps {
  dispatch: Dispatch<AnyAction>;
  bannerList: StateType;
}

const bannerList : React.FC<tableProps> = ({ dispatch, bannerList }) => {
  const actionRef = useRef<ActionType>();
  const { loading } = bannerList;

  const [collapsed, setCollapsed] = useState(false);
  //时间戳
  const [rangePicker, setRangePicker] = useState({});
  const [modalVisible, handleModalVisible] = useState<boolean>(false);

  //选中的游戏
  const [rowId, setRowId] = useState(0);

  /**
   * constructor
   */
  useEffect(() => {
    if (loading && actionRef.current) {
      actionRef.current.reload();
      handleModalVisible(false);
      setRowId(0)
    }
  }, [bannerList]);

  const columns: ProColumns<row>[] = [
    
    {
      title: 'banner 描述',
      dataIndex: 'bannerDesc',
    },
  
    {
      title: 'banner id',
      dataIndex: 'bannerId',
    },
  
    {
      title: 'banner 展示图片',
      dataIndex: 'bannerImage',
    },
  
    {
      title: '排序 越大越靠前',
      dataIndex: 'bannerSort',
    },
  
    {
      title: 'banner 标题',
      dataIndex: 'bannerTitle',
    },
  
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  
    {
      title: '创建者',
      dataIndex: 'creator',
    },
  
    {
      title: '修改者',
      dataIndex: 'editors',
    },
  
    {
      title: '逻辑删除 1 表示删除，0 表示未删除',
      dataIndex: 'isDeleted',
    },
  
    {
      title: 'banner 图标',
      dataIndex: 'manageIcon',
    },
  
    {
      title: '模块id',
      dataIndex: 'moduleId',
    },
  
    {
      title: 'banner 中包含的问题数',
      dataIndex: 'questionNum',
    },
  
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
   
  {
    title: "操作",
    dataIndex: "option",
    valueType: "option",
    render: (_, record) => (
      <>
        <a
          onClick={() => handleModalVisible(true)}
        >
          修改
        </a>
        <Divider type="vertical" />
        <a
          onClick={() =>
            Modal.confirm({
              okText: "确认",
              cancelText: "取消",
              title: "确定要删除？",
              onOk: () =>
                dispatch({
                  type: "bannerList/deleteItem",
                  payload: record.moduleId,
                }),
            })
          }
        >
          删除
        </a>
      </>
    ),
  },
];

return (
  <PageHeaderWrapper title={false}>
    <ProTable<row>
      headerTitle="查询表格"
      actionRef={actionRef}
      rowKey="???"
      request={(params) => queryList(params)}
      columns={columns}
      params={{
        ...rangePicker,
      }}
      onReset={() => {
        setRangePicker({});
      }}
      form={{ labelCol: { span: 4 } }}
      toolBarRender={(action, { selectedRows }) => [
        <Button type="primary" onClick={() => handleModalVisible(true)}>
          <PlusOutlined /> 添加
        </Button>,
      ]}
      search={{
        collapsed,
        onCollapse: setCollapsed,
      }}
    />
    <OpForm
      onCancel={() => handleModalVisible(false)}
      modalVisible={modalVisible}
      rowId = {rowId}
    ></OpForm>
  </PageHeaderWrapper>
);
};

export default connect(({ bannerList }: { bannerList: StateType }) => ({
bannerList,
}))(bannerList);




