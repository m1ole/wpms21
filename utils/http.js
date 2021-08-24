const dofetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(json.message + ':' + json.error);
  } else if (!response.ok) {
    throw new Error('Fetch failed');
  } else {
    return json;
  }
};
export {dofetch};
