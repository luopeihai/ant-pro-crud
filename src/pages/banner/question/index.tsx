


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
  questionList: StateType;
}

const TableList : React.FC<tableProps> = ({ dispatch, questionList }) => {
  const actionRef = useRef<ActionType>();
  const { loading } = questionList;

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
  }, [questionList]);

  const columns: ProColumns<row>[] = [
    
    {
      title: '-1:关闭问题 0:未采纳 1:系统采纳 2:题主采纳',
      dataIndex: 'acceptStatus',
    },
  
    {
      title: '回答数',
      dataIndex: 'answerNum',
    },
  
    {
      title: '头像',
      dataIndex: 'avatar',
    },
  
    {
      title: '是否有及时奖',
      dataIndex: 'awardInTime',
    },
  
    {
      title: '悬赏金',
      dataIndex: 'bonusNum',
    },
  
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  
    {
      title: '关注数',
      dataIndex: 'focusNum',
    },
  
    {
      title: '提问者是否被禁言 -- 只有详情才封装，列表不封装该字段',
      dataIndex: 'hasBand',
    },
  
    {
      title: '内容包含的图片集合',
      dataIndex: 'images',
    },
  
    {
      title: '纯文字内容(去除富文本标签但包含图片视频文字占位表示)',
      dataIndex: 'includeMultimediaText',
    },
  
    {
      title: '逻辑删除 1 表示删除，0 表示未删除',
      dataIndex: 'isDeleted',
    },
  
    {
      title: '是否已置顶 1.已置顶 0.未置顶',
      dataIndex: 'isTop',
    },
  
    {
      title: '当前列表数据主id 例:banner问题列表 表示 banner-问题关联关系id',
      dataIndex: 'mainId',
    },
  
    {
      title: '分组id',
      dataIndex: 'moduleGroupId',
    },
  
    {
      title: '模块id',
      dataIndex: 'moduleId',
    },
  
    {
      title: '原始富文本内容',
      dataIndex: 'originalHtml',
    },
  
    {
      title: '问题id',
      dataIndex: 'questionId',
    },
  
    {
      title: '问题排序数字',
      dataIndex: 'questionSort',
    },
  
    {
      title: '提问者id',
      dataIndex: 'questionerId',
    },
  
    {
      title: '提问者名称',
      dataIndex: 'questionerName',
    },
  
    {
      title: '该问题是否被推荐 -- 只有详情才封装，列表不封装该字段',
      dataIndex: 'recommend',
    },
  
    {
      title: '是否已审核 0未审核 1已审核',
      dataIndex: 'reviewStatus',
    },
  
    {
      title: '标题',
      dataIndex: 'title',
    },
  
    {
      title: '更新时间',
      dataIndex: 'updateTime',
    },
  
    {
      title: '内容包含的视频集合',
      dataIndex: 'videos',
    },
  
    {
      title: '纯文字内容(去除富文本标签及图片视频)',
      dataIndex: 'wordText',
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
                  type: "questionList/deleteItem",
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

export default connect(({ questionList }: { questionList: StateType }) => ({
questionList,
}))(TableList);




