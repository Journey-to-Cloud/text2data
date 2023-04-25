export const environment = {
  production: true,
  model_api:'https://text2query.azurewebsites.net/api/text/text2sql?promt=${query}',
  upload_file:"https://texttosql.azurewebsites.net/upload",
  get_response:"https://texttosql.azurewebsites.net/sql_query_response?promt=${query}"
};
