import { Pagination } from "@/data/global.d";


<%
  const queryListParams = index.queryListParams
  const rowParams = row.params
  const {params : createParams,createApiString} = create
  const {params :updateParams,updateApiString }= update
  const {params :deleteParams,deleteApiString} = deleteObj
  
%>

<%= '// ' + index.description %>
export interface queryListParams extends Pagination {
    <% for(var i=0; i < queryListParams.length; i++) { %>
          <%= queryListParams[i].value %>:<%= queryListParams[i].key + "; // " + queryListParams[i].description %>; 
    <% } %>    
}



    <%= '// ' + row.description %>
    export interface row {
        <% for(var i=0; i < rowParams.length; i++) { %>
            <%= rowParams[i].value %>:<%= rowParams[i].key + "; // " + rowParams[i].description %> ;
    <% } %> 
        }





<% if (createApiString) { %>

    <%= '// ' + create.description %>
        export interface createParams {
            <% for(var i=0; i < createParams.length; i++) { %>
                <%= createParams[i].value %>:<%= createParams[i].key + "; // " + createParams[i].description %>;  
        <% } %> 
        }
<% } %>



<% if (updateApiString) { %>
<%= '// ' + update.description %>
export interface updateParams {
    <% for(var i=0; i < updateParams.length; i++) { %>
        <%= updateParams[i].value %>:<%= updateParams[i].key + "; // " + updateParams[i].description %> 
  <% } %> 
}
<% } %>



<% if (deleteApiString) { %>
<%= '// ' + deleteObj.description %>
export interface deleteParams {
    <% for(var i=0; i < deleteParams.length; i++) { %>
        <%= deleteParams[i].value %>:<%= deleteParams[i].key + "; // " + deleteParams[i].description %>  
  <% } %> 
}
<% } %>





