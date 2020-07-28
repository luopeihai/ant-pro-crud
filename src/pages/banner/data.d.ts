import { Pagination } from "@/data/global.d";
// query, row, createRow, updateRow, deleteRow

//  请求 banner list
export interface queryData extends Pagination {
  bannerTitle?: number; // banner描述
}

//  每行 banner
export interface rowData extends Pagination {
  bannerTitle: number; // banner标题

  bannerDesc: number; // banner描述

  bannerSort: number; // 排序

  createTime: dateTime; // 创建时间

  updateTime: dateTime; // 更新时间
}
