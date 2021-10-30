const data = await import(process.argv[2]).then((module) => module.default);
console.log(JSON.stringify(data));
