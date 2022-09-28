const generate = require("@babel/generator").default;

const { parse } = require("@babel/parser");

const code = `
interface XXX {
    name: string; // 注释
}
`;
const ast = parse(code, {
  sourceType: "module",
  plugins: ["typescript"],
});

const output = generate(
  ast,
  {
    /* options */
  },
  code
);

console.log(JSON.stringify(ast));
