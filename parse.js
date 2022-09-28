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
const outputName = path.parse(fileName).name + ".spec.ts";

const content = fs.readFileSync(fileName, {
  encoding: "utf-8",
});

const output = parser.parse(content);

// console.log(output);

// 递归创建引用类型
// todo:实现递归创建类型
const createTypeAnnotationRecursion = (typeInfo) => {
  // console.log({ typeInfo });
  if (typeInfo.params) {
    typeInfo.params.forEach((t) => {
      createTypeAnnotationRecursion(t);
    });
  }

  if (typeInfo.isPrimitive) {
    return t.tsTypeAnnotation(t.tsStringKeyword());
  } else {
    if (typeInfo.type === "Array") {
      return t.tsTypeAnnotation(
        t.tsArrayType(t.tsTypeReference(t.identifier(typeInfo.params[0])))
      );
    } else {
      return t.tsTypeAnnotation(t.tsTypeReference(t.identifier(typeInfo.type)));
    }
  }
};

// 创建单个interface的Body数组
const createInterfaceBody = (list) => {
  return list.map((o) => {
    // console.log(o);
    // console.log("createPropertySignatureList");
    // console.log(o.name);
    const { typeInfo } = o;
    let node;

    createTypeAnnotationRecursion(typeInfo);

    if (typeInfo.isPrimitive) {
      node = t.tsPropertySignature(
        t.identifier(o.name),
        t.tsTypeAnnotation(t.tsStringKeyword())
      );
    } else {
      // if (typeInfo.type === "Array") {
      //   node = t.tsPropertySignature(
      //     t.identifier(o.name),
      //     // t.tsTypeAnnotation(
      //     //   t.tsArrayType(t.tsTypeReference(t.identifier(typeInfo.childType)))
      //     // )
      //     createTypeAnnotationRecursion(typeInfo)
      //   );
      // } else {
      //   node = t.tsPropertySignature(
      //     t.identifier(o.name),
      //     t.tsTypeAnnotation(
      //       t.tsTypeReference(t.identifier(typeInfo.childType))
      //     )
      //   );
      // }
      node = t.tsPropertySignature(
        t.identifier(o.name),
        // t.tsTypeAnnotation(
        //   t.tsArrayType(t.tsTypeReference(t.identifier(typeInfo.childType)))
        // )
        createTypeAnnotationRecursion(typeInfo)
      );
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
