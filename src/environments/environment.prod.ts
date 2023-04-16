export const environment = {
  production: true,
  model_api:'https://text2query.azurewebsites.net/api/text/text2sql?promt=${query}',
  upload_file:"https://pythonapiforchat.azurewebsites.net/upload",
  get_response:"https://pythonapiforchat.azurewebsites.net/sql_query_response?promt=${query}"
};