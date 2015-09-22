#!/usr/bin/env node

var fs=require('fs');

var path=require('path');

//console.log("hello world");

//console.log(process.argv);

//console.log(__dirname);

var templatePath=path.resolve(__dirname,"..","template")

//console.log("template Path is :",templatePath);

//console.log(process.cwd());

var componentName="";

if (process.argv[2]===undefined){
	console.log("Please assign component arg");
}

if (process.argv[2]=="component"&&process.argv[3]=="create"&&process.argv[4]!==undefined){
	NewComponent(process.argv[4]);
}

// if (process.argv[2]=="component"){
// 	if (process.argv[3]=="create"){
// 		console.log("The Component name is :")
// 		//process.stdin.pipe(require('split')()).on('data', NewComponent)
// 	}
// }

function ReplaceTemplate(file,replacement){
	fs.readFile(file,'utf8',function(err,data){
		if(err){
			return console.log(err);
		}
		var res=data.replace(/{{component}}/g,replacement);
		fs.writeFile(file,res,'utf8',function(err){
			if(err) return console.log(err);
		});
	});
}

function NewComponent (line) {
  componentName=line;
  console.log("Initing the component :"+componentName)
  
  fs.createReadStream(path.join(templatePath,"component","component.js")).pipe(fs.createWriteStream(path.join(componentName+".js")));
  fs.createReadStream(path.join(templatePath,"component","component.html")).pipe(fs.createWriteStream(path.join(componentName+".html")));
  fs.createReadStream(path.join(templatePath,"component","component.vue")).pipe(fs.createWriteStream(path.join(componentName+".vue")));
  fs.createReadStream(path.join(templatePath,"component","component_test.vue")).pipe(fs.createWriteStream(path.join(componentName+"_test.vue")));
  fs.createReadStream(path.join(templatePath,"component","webpack.config.js")).pipe(fs.createWriteStream(path.join("webpack.config.js")));
  ReplaceTemplate(componentName+".js",componentName);
  ReplaceTemplate(componentName+".html",componentName);
  ReplaceTemplate(componentName+".vue",componentName);
  ReplaceTemplate(componentName+"_test.vue",componentName);
  ReplaceTemplate("webpack.config.js",componentName);
}