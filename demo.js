// import * as types from "@babel/types";
// import generator from "@babel/generator";

// const log = (node: types.Node) => {
// console.log(generator(node).code);
// };

// log(types.stringLiteral("Hello World")); // output: Hello World
const t = require("@babel/types");
const generator = require("@babel/generator").default;

const ast = t.program([
  t.tsModuleDeclaration(
    t.identifier("global"),
    t.tsModuleBlock([
      t.tsInterfaceDeclaration(
        t.identifier("XXX"),
        undefined,
        undefined,
        t.tsInterfaceBody([
          t.tsPropertySignature(
            t.identifier("count"),
            t.tsTypeAnnotation(t.tsStringKeyword())
          ),
        ])
      ),
      t.tsInterfaceDeclaration(
        t.identifier("REQ"),
        undefined,
        undefined,
        t.tsInterfaceBody([
          t.tsPropertySignature(
            t.identifier("name"),
            t.tsTypeAnnotation(t.tsStringKeyword())
          ),
          t.tsPropertySignature(
            t.identifier("age"),
            t.tsTypeAnnotation(t.tsNumberKeyword())
          ),
          t.tsPropertySignature(
            t.identifier("age"),
            t.tsTypeAnnotation(t.tsTypeReference(t.identifier("XXX")))
          ),
        ])
      ),
    ])
  ),
]);

console.log(generator(ast).code);
