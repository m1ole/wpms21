const dofetch = async (url, options) => {
  const response = fetch(url, options);
  const json = response.json();
  if (json.error) {
    throw new Error(json.message + ':' + json.error);
  } else if (!response.ok) {
    throw new Error('Fetch failed');
  } else {
    return json;
  }
};
export {dofetch};
