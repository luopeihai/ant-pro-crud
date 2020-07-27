import { Pagination } from "@/data/global.d";
// query, row, createRow, updateRow, deleteRow
 
<%
  const {description:queryDescription = null,data:queryData = []} = query ? query : {}; 
  
 
//   const queryListParams = index.queryListParams
//   const rowParams = row.params
//   const {params : createParams,createApiString} = create
//   const {params :updateParams,updateApiString }= update
//   const {params :deleteParams,deleteApiString} = deleteObj
%>


<%
  if(queryData.length){
%> 
 //  <%= queryDescription %>
 export interface queryListParams extends Pagination {

 }
<%
  }
%>



