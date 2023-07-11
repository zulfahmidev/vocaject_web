module.exports = {
  async get(uri) {
    let projects = await (await fetch('http://34.101.227.89/'+uri)).text();
    return await JSON.parse(projects);
  }
}