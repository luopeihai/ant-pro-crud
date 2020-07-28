import { Pagination } from "@/data/global.d";
// query, row, createRow, updateRow, deleteRow
<%
  const {description:queryDescription = null,data:queryData = []} = query ? query : {}; 
  const {description:rowDescription = null,data:rowData = []} = row ? row : {}; 
%>

<%
  if(queryData.length){
%> 

 //  <%= queryDescription %>
 export interface queryData extends Pagination {
  <% for(var i=0; i < queryData.length; i++) { %>
    <%- queryData[i].name + (queryData[i].required ? "" : "?") + ":" + queryData[i].valueType + `// ${queryData[i].description}`  %>
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
 export interface rowData extends Pagination {
  <% for(var i=0; i < rowData.length; i++) { %>
    <%- rowData[i].name  + ":" + rowData[i].valueType + `// ${rowData[i].title}`  %>
  <%
  }
  %>
 }
<%
  }
%>







