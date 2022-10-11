/**
 * author:nanshi
 * jce格式协议转ts格式类型声明
 * 根据数据手工构建AST生成代码
 */
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const parser = require("./jce").parser;
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const OUTPUT_DIR = "dist";

if (args.length <= 0) {
  console.log("Invaild arguments.");
  return;
}

const fileName = args[0];
const bookKeeping = [];

function parseRecursion(fileName) {
  bookKeeping.push(fileName);

  const { name, dir } = path.parse(fileName);
  const outputName = name + ".spec.ts";
  const content = fs.readFileSync(fileName, {
    encoding: "utf-8",
  });

  const output = parser.parse(content);

  // console.log(output);

  const deps = output.deps;
  if (deps?.length) {
    for (let i = 0; i < deps.length; i++) {
      const depFileName = path.join(dir, deps[i]);
      if (!bookKeeping.includes(depFileName)) {
        parseRecursion(depFileName);
      }
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

  const dst = path.join(OUTPUT_DIR, outputName);
  fs.writeFile(dst, ast.code, {}, (err) => {
    if (err) {
      console.log("error write file");
    } else {
      console.log(`Generate ${dst} success!`);
    }
  });
}

parseRecursion(fileName);
