/**
 * 
 * @param native window.fetch arguments 
 * @returns xhr Promise
 * This xhr layer could be made more generic
 */
export const xhr = async (...args: any) => {
  let [resource, config, beforeRequest, afterResponse] = args;
  const storeArray = config.body.query[0].split(" ");
  const store = storeArray[storeArray.length - 1];
  resource = `${resource}/${store}.csv?_t=${Date.now()}`;
  delete config.body;
  beforeRequest && beforeRequest(resource, config);
  const response = await fetch(resource, config);
  afterResponse && afterResponse();
  return response.text();
};
