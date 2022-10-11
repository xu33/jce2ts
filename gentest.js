const generate = require("@babel/generator").default;
const t = require("@babel/types");

/** 生成函数签名测试 start */
// const typeParameters = t.tsTypeParameterDeclaration([
//   t.tsTypeParameter(t.tsStringKeyword(), null, "a"),
// ]);
// const typeParameters = null;
// const p = t.identifier("a");
// // p.type = "string";
// p.typeAnnotation = t.tsTypeAnnotation(t.tsStringKeyword());
// const parameters = [p];

// const ps = t.tsPropertySignature(
//   t.identifier("getStockCompetition"),
//   t.tsTypeAnnotation(
//     t.tsFunctionType(
//       typeParameters,
//       parameters,
//       t.tsTypeAnnotation(
//         t.tsTypeReference(t.identifier("HStockCompetitionReq"))
//       )
//     )
//   )
// );

// const id = t.tsInterfaceDeclaration(
//   t.identifier("SimulationTransaction"),
//   undefined,
//   undefined,
//   t.tsInterfaceBody([ps])
// );

// const ast = generate(id);

// console.log(ast.code);

/*
output:
interface SimulationTransaction {
  getStockCompetition: (a: string) => HStockCompetitionReq;
}
*/

/** 生成函数签名测试 end */

/** 生成简单赋值语句 */
const id = t.identifier("a");
id.typeAnnotation = t.tsTypeAnnotation(t.tsStringKeyword());
const init = t.stringLiteral("hehe");
const s = t.variableDeclaration("const", [t.variableDeclarator(id, init)]);

const ast = generate(s);

console.log(ast.code);

/** 生成简单赋值语句 end */
