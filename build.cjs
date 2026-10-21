const fs = require('node:fs');
const path = require('node:path');
const output = path.join(__dirname,'dist');
// Rebuild only this generated directory: stale public files must not survive a build.
if (path.dirname(output) !== path.resolve(__dirname) || path.basename(output) !== 'dist') throw Error('Unexpected output directory');
if (fs.existsSync(output)) {
  if (fs.lstatSync(output).isSymbolicLink()) throw Error('Refusing to rebuild a linked output directory');
  fs.rmSync(output,{recursive:true});
}
fs.mkdirSync(output,{recursive:true});
for(const directory of ['assets','css','js']) fs.cpSync(path.join(__dirname,directory),path.join(output,directory),{recursive:true});
fs.copyFileSync(path.join(__dirname,'index.html'),path.join(output,'index.html'));
fs.writeFileSync(path.join(output,'404.html'),'<!doctype html><html lang="uk"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Сторінку не знайдено</title><p>Сторінку не знайдено. <a href="/">Повернутися до порталу</a></p></html>');
// Every request must pass through authentication, including static assets.
fs.writeFileSync(path.join(output,'_routes.json'),JSON.stringify({version:1,include:['/*'],exclude:[]},null,2));
console.log('Built protected Pages assets in dist. Functions remain outside the asset directory.');
