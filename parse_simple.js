/**
 * author:nanshi
 * jce格式协议转ts格式类型声明
 * 首先解析jce生成自定义的数据结构
 * 根据数据手工构建AST抽象语法树，并生成代码
 * 支持注释保留，对enum等特性做ts对等的转换
 */
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const parser = require("./jce").parser;
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.length <= 0) {
  console.log("Invaild arguments.");
  return;
}

const fileName = args[0];

function parseRecursion(fileName) {
  const { name, dir } = path.parse(fileName);
  const outputName = name + ".spec.ts";
  const content = fs.readFileSync(fileName, {
    encoding: "utf-8",
  });

  const output = parser.parse(content);

  console.log(output);

  const deps = output.deps;
  if (deps?.length) {
    for (let i = 0; i < deps.length; i++) {
      parseRecursion(path.join(dir, deps[i]));
    }
  }

  const topLevelDeclaration = t.tsModuleDeclaration(
    t.identifier("global"),
    t.tsModuleBlock([output.module])
  );

  topLevelDeclaration.declare = true;
  topLevelDeclaration.global = true;

  const exportNamedDeclaration = t.exportNamedDeclaration();
  const program = t.program([topLevelDeclaration, exportNamedDeclaration]);
  const ast = generate(program);
  // console.log(ast.code);

  fs.writeFile(outputName, ast.code, {}, (err) => {
    if (err) {
      console.log("error write file");
    } else {
      console.log("Success!");
    }
  });
}

parseRecursion(fileName);
