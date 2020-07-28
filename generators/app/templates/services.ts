import request from "@/utils/request";
import {
  queryListParams,
  <% if (createApiString) { %>
      <%= 'createParams,' %>
  <%}%>  
  <% if (updateApiString) { %>
    <%= 'updateParams,' %>
<%}%> 
<%   if (deleteApiString) { %>
    <%= 'deleteParams' %>
<%}%> 
} from "./data.d";


export async function queryList(params: queryListParams): Promise<any> {
    return request( '<%=indexApiString%>', { 
      <% for(const [key,value] of Object.entries(indexData)) {%>
        <% if(key === 'method'){ %>
        <%= key%> :'<%= value%>',
        <% }else{ %>
         <%=`${key}:${value},`%>
         <% } %> 
     <%}%> 

    
    }).then((res) => ({
      data: res.data.list,
      page: res.data.pageSize,
      success: res.code === 200,
      total: res.data.total,
    }));
}



<% if (createApiString) { %>
export async function create(params: createParams): Promise<any> {
    return request('<%=createApiString%>', { 
      <% for(const [key,value] of Object.entries(createData)) {%>
         <% if(key === 'method'){ %>
         <%= key%> :'<%= value%>',
         <% }else{ %>
          <%=`${key}:${value},`%>
          <% } %> 
      <%}%>  
    });
}
<% } %>



<% if (updateApiString) { %>
export async function update(params: updateParams): Promise<any> {
    return request('<%=updateApiString%>', {

      <% for(const [key,value] of Object.entries(updateData)) {%>
        <% if(key === 'method'){ %>
        <%= key%> :'<%= value%>',
        <% }else{ %>
         <%=`${key}:${value},`%>
         <% } %> 
     <%}%> 
    });
}
<% } %>


<% if (deleteApiString) { %>
export async function deleteItem(params: deleteParams): Promise<any> {
    return request('<%=deleteApiString%>', {

      <% for(const [key,value] of Object.entries(deleteData)) {%>
        <% if(key === 'method'){ %>
        <%= key%> :'<%= value%>',
        <% }else{ %>
         <%=`${key}:${value},`%>
         <% } %> 
     <%}%> 
    });
}
<% } %>

