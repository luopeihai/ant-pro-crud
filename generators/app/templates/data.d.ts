import { Pagination } from "@/data/global.d";
// query, row, createRow, updateRow, deleteRow
<%
  const {description:queryDescription = null,data:queryData = []} = query ? query : {}; 
  const {description:rowDescription = null,data:rowData = []} = row ? row : {}; 
  const {description:createDescription = null,data:createData = []} = createRow ? createRow : {}; 
  const {description:updateDescription = null,data:updateData = []} = updateRow ? updateRow : {}; 
  const {description:deleteDescription = null,data:deleteData = []} = deleteRow ? deleteRow : {}; 
%>

<%
  if(queryData.length){
%> 

 //  <%= queryDescription %>
 export interface QueryType extends Pagination {
  <% for(var i=0; i < queryData.length; i++) { %>
    <%- queryData[i].name + (queryData[i].required ? "" : "?") + ":" + queryData[i].tsType + `; // ${queryData[i].description}`  %>
  <%
  }
  %>
 }
<%
  }
%>



<%
  if(rowData.length){
%> 

 //  <%= rowDescription %>
 export interface RowType  {
  <% for(var i=0; i < rowData.length; i++) { %>
    <%- rowData[i].name  + (rowData[i].required ? "" : "?") +  ":" + rowData[i].valueType + `; // ${rowData[i].title}`  %>
  <%
  }
  %>
 }
<%
  }
%>




<%
  if(createData.length){
%> 

 //  <%= rowDescription %>
 export interface CreateType  {
  <% for(var i=0; i < createData.length; i++) { %>
    <%- createData[i].name  + (createData[i].required ? "" : "?") +  ":" + createData[i].tsType + `; // ${createData[i].title}`  %>
  <%
  }
  %>
 }
<%
  }
%>




<%
  if(updateData.length){
%> 

 //  <%= updateDescription %>
 export interface UpdateType  {
  <% for(var i=0; i < updateData.length; i++) { %>
    <%- updateData[i].name  + (updateData[i].required ? "" : "?") +  ":" + updateData[i].tsType + `; // ${updateData[i].title}`  %>
  <%
  }
  %>
 }
<%
  }
%>



<%
  if(deleteData.length){
%> 

 //  <%= deleteDescription %>
 export interface DeleteType  {
  <% for(var i=0; i < deleteData.length; i++) { %>
    <%- deleteData[i].name  + (deleteData[i].required ? "" : "?") +  ":" + deleteData[i].tsType + `; // ${deleteData[i].title}`  %>
  <%
  }
  %>
 }
<%
  }
%>







