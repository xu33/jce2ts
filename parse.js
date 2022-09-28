// const template = require("@babel/template").default;
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
const outputName = path.parse(fileName).name + ".spec.ts";

const content = fs.readFileSync(fileName, {
  encoding: "utf-8",
});

const output = parser.parse(content);

console.log(output);

// 创建单个interface的Body数组
const createInterfaceBody = (list) => {
  return list.map((o) => {
    // console.log(o);
    // console.log("createPropertySignatureList");
    // console.log(o.name);
    const { typeInfo } = o;
    let node;
    // if (typeInfo.isReference && typeInfo.type === "Array") {
    //   node = t.tsPropertySignature(
    //     t.identifier(o.name),
    //     t.tsTypeAnnotation(
    //       t.tsArrayType(t.tsTypeReference(t.identifier(typeInfo.childType)))
    //     )
    //   );
    // } else {
    //   node = t.tsPropertySignature(
    //     t.identifier(o.name),
    //     t.tsTypeAnnotation(t.tsStringKeyword())
    //   );
    // }

    if (typeInfo.isPrimitive) {
      node = t.tsPropertySignature(
        t.identifier(o.name),
        t.tsTypeAnnotation(t.tsStringKeyword())
      );
    } else {
      if (typeInfo.type === "Array") {
        node = t.tsPropertySignature(
          t.identifier(o.name),
          t.tsTypeAnnotation(
            t.tsArrayType(t.tsTypeReference(t.identifier(typeInfo.childType)))
          )
        );
      } else {
        node = t.tsPropertySignature(
          t.identifier(o.name),
          t.tsTypeAnnotation(
            t.tsTypeReference(t.identifier(typeInfo.childType))
          )
        );
      }
    }

    // 如果有注释，则插入注释
    if (o.comment && o.comment.value) {
      t.addComment(
        node,
        o.comment.type === "BLOCK" ? "leading" : "trailing",
        o.comment.value,
        o.comment.type === "BLOCK" ? false : true
      );
    }

    // console.log(node);

    if (o.required === "optional") {
      node.optional = true;
    }

    return node;
  });
};

const createEnumMemberList = (list) => {
  // console.log("createEnumMemberList:", list);
  return list.map((enumMember) => {
    const node = t.tsEnumMember(t.identifier(enumMember.name));
    // 如果有注释，则插入注释
    if (enumMember.comment && enumMember.comment.value) {
      t.addComment(
        node,
        enumMember.comment.type === "BLOCK" ? "leading" : "trailing",
        enumMember.comment.value,
        enumMember.comment.type === "BLOCK" ? false : true
      );
    }

    return node;
  });
};

// 创建所有interface声明数组
const createInterfaceDeclarationList = (list) => {
  return list
    .map((o) => {
      if (o.type === "interface") {
        const node = t.tsInterfaceDeclaration(
          t.identifier(o.name),
          undefined,
          undefined,
          t.tsInterfaceBody(createInterfaceBody(o.members))
        );

        // 如果有注释，则插入注释
        if (o.comment && o.comment.value) {
          t.addComment(
            node,
            o.comment.type === "BLOCK" ? "leading" : "trailing",
            o.comment.value,
            o.comment.type === "BLOCK" ? false : true
          );
        }

        return node;
      } else if (o.type === "ENUM") {
        const node = t.tsEnumDeclaration(
          t.identifier(o.name),
          createEnumMemberList(o.members)
        );

        return node;
      } else {
        return null;
      }
    })
    .filter(Boolean);
};

const topLevelDeclaration = t.tsModuleDeclaration(
  t.identifier("global"),
  t.tsModuleBlock([
    t.tsModuleDeclaration(
      t.identifier(output.name),
      t.tsModuleBlock(createInterfaceDeclarationList(output.structList))
    ),
  ])
);

topLevelDeclaration.declare = true;
topLevelDeclaration.global = true;

const exportNamedDeclaration = t.exportNamedDeclaration();

const program = t.program([topLevelDeclaration, exportNamedDeclaration]);

// const f = t.file(program, {});

// const ast = generate(f);

const ast = generate(program);
// console.log(ast.code);

fs.writeFile(outputName, ast.code, {}, (err) => {
  if (err) {
    console.log("error write file");
  } else {
    console.log("Success!");
  }
});
