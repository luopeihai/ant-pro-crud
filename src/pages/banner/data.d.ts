import { Pagination } from "@/data/global.d";
// query, row, createRow, updateRow, deleteRow

//  请求 banner list
export interface QueryType extends Pagination {
  bannerTitle?: number; // banner描述
}

//  每行 banner
export interface RowType {
  bannerTitle: number; // banner标题

  bannerDesc: string; // banner描述

  bannerSort: number; // 排序

  createTime: dateTime; // 创建时间

  updateTime: dateTime; // 更新时间
}

//  每行 banner
export interface CreateType {
  bannerTitle: string; // banner标题

  moduleId: string; // 游戏名称

  bannerImage: string; // banner图片
}

//  更新 banner
export interface UpdateType {
  bannerId: number; // bannerId

  bannerTitle: string; // banner标题

  moduleId: string; // 游戏名称

  bannerImage: string; // banner图片
}

//  删除 banner
export interface DeleteType {
  bannerId?: number; // bannerId
}
