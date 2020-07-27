<%
  const namespace = `${name}List`
  const {params} = row
%>


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
  <%=namespace%>: StateType;
}

const TableList : React.FC<tableProps> = ({ dispatch, <%=namespace%> }) => {
  const actionRef = useRef<ActionType>();
  const { loading } = <%=namespace%>;

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
  }, [<%=namespace%>]);

  const columns: ProColumns<row>[] = [
    <% for(var i=0; i < params.length; i++) { %>
    {
      title: '<%=params[i].description%>',
      dataIndex: '<%=params[i].value%>',
    },
  <% } %> 
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
                  type: "<%=namespace%>/deleteItem",
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
        <Button type="primary" onClick={() =>{
        handleModalVisible(true)
        setRowId(0)
        } }>
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

export default connect(({ <%=namespace%> }: { <%=namespace%>: StateType }) => ({
<%=namespace%>,
}))(TableList);




