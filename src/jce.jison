%{
    const t = require('@babel/types');
%}

%lex
%%

\s+ /* skip whitespace */
"//"(.*)                                    { /* DO NOTHING */ }
[/][*][^*]*[*]+([^*/][^*]*[*]+)*[/]       { /* DO NOTHING */ }
"key"\[[^\]]*\]";" { /* DO NOTHING */ }
"#include" return "INCLUDE";
".jce" return "JCE"
<<EOF>> return 'EOF'
"\"" return "QUOTE";
"module" { return "MODULE";}
"struct" { return "STRUCT";}
"enum" { return "ENUM";}
"interface" { return "INTERFACE" }
"<" { return "OPEN"; }
">" { return "CLOSE"; }
"{" { return "LEFT"; }
"}" { return "RIGHT"; }
"[" { return "KEY_OPEN"; }
"]" { return "KEY_CLOSE"; }
"(" { return "LEFT_QUOTE"; }
")" { return "RIGHT_QUOTE"; }
(require|optional) {return "REQUIRED"}
"out" return "OUT";
// (string|byte|short|bool|int|float|long|double|signed\s+int|unsigned\s+int|unsigned\s+short) { return "TYPE";}
"string" return 'TYPE'
"byte" return "TYPE"
"short" return "TYPE"
"bool" return "TYPE"
"int" return "TYPE"
"float" return "TYPE"
"long" return "TYPE"
"double" return "TYPE"
"signed"\s+"int" return "TYPE"
"unsigned"\s+"int" return "TYPE"
"unsigned"\s+"short" return "TYPE"
"unsigned\s+byte" return "TYPE"
vector { return "VECTOR"; }
map { return "MAP"; }
[a-zA-Z_$][a-zA-Z_$0-9]* { return "IDENTIFIER";}
";" return "SEMI"
"," return "COMMA"
"::" return "DOUBLE_COLON"
// "="\s*[^=;,//]+ { /* DO NOTHING */ }
// "-"?\d+ { return "ENUM_VALUE"; }
"=" { return "EQUAL"; }
"-" { return "UMINUS"; }
[0-9]+("."[0-9]+)?\b { return "NUMBER"; }
0[xX][0-9a-fA-F]+ { return "HEX"; }
<<EOF>> { return "EOF"; }

/lex

%start jce

%% /* language grammar */

jce
: deplist expressions EOF 
{
    return {
        deps: $deplist,
        module: $expressions
    }
};

deplist
: /* empty */
{
    $$ = [];
}
| deplist dep
{
    $$ = $deplist.concat($dep)
};


dep
: INCLUDE QUOTE IDENTIFIER JCE QUOTE
{
    console.log($IDENTIFIER);
    $$ = [$IDENTIFIER + $JCE];
};

expressions 
: MODULE IDENTIFIER LEFT structlist RIGHT SEMI
    {
        // console.log('MODULE:', $IDENTIFIER)
        // module.IDENTIFIER = $IDENTIFIER;

        // $$ = {
        //     name: $IDENTIFIER,
        //     structList: $4
        // }
        
        $$ = t.tsModuleDeclaration(
            t.identifier($IDENTIFIER),
            t.tsModuleBlock($4)
        );
    }
| MODULE IDENTIFIER LEFT structlist interface RIGHT SEMI
{
    $4.push($interface);
    $$ = t.tsModuleDeclaration(
        t.identifier($IDENTIFIER),
        t.tsModuleBlock($4)
    );
}
;

structlist 
: def {
    $$ = [$1];
}
| structlist def {
    $$ = $1.concat($2)
}
;

def
:struct
{
    $$ = $1;
}
|enum
{
    $$ = $1;
}
;

enum: 
ENUM IDENTIFIER LEFT enumitems RIGHT SEMI {
{
    $$ = t.tsEnumDeclaration(
        t.identifier($IDENTIFIER),
        $enumitems
    );
}
};

enumitems:
enumitem
{
    $$ = [$1];
}
| enumitems enumitem
{
    $$ = $1.concat($2);
}
;

enumitem
: enumitemDef
{
    $$ = $enumitemDef;
}
| enumitemDef COMMA
{
    $$ = $enumitemDef;
};

enumitemDef
: IDENTIFIER 
{
    $$ = t.tsEnumMember(t.identifier($1));
}
| IDENTIFIER EQUAL NUMBER
{
    {
    const value = Number($3);
    $$ = t.tsEnumMember(t.identifier($1), t.numericLiteral(value));
    }
}
| IDENTIFIER EQUAL HEX
{
    {
    $$ = t.tsEnumMember(t.identifier($1), t.stringLiteral($3));
    }
}
| IDENTIFIER EQUAL UMINUS NUMBER
{
    {
    const value = -Number($4);
    $$ = t.tsEnumMember(t.identifier($1), t.numericLiteral(value));
    }
}
;

struct
: STRUCT IDENTIFIER itemlist 
{
    $$ = t.tsInterfaceDeclaration(
        t.identifier($IDENTIFIER),
        undefined,
        undefined,
        t.tsInterfaceBody($itemlist)
    );
}
;

itemlist : LEFT items RIGHT SEMI {
    $$ = $items
};

items 
: item {
    $$ = [$1];
}
| items item {
    // console.log('ERROR', $items, $item);

    $$ = $items.concat($item)
}
;

item 
: NUMBER REQUIRED t propertyName SEMI 
{
    {
        const node = t.tsPropertySignature(
            t.identifier($propertyName),
            t.tsTypeAnnotation($t)
        );

        if ($REQUIRED === 'optional') {
            node.optional = true;
        }

        $$ = node;
    }
}
;

propertyName
: IDENTIFIER {
    $$ = $IDENTIFIER
}
| IDENTIFIER EQUAL UMINUS NUMBER{
    $$ = $IDENTIFIER
}
| IDENTIFIER EQUAL NUMBER {
    $$ = $IDENTIFIER
}
| IDENTIFIER EQUAL IDENTIFIER {
    $$ = $1
}
;

t
: TYPE
{
    // console.log('TYPE:', $1 + '_x');
    if ($1 === 'bool') {
        $$ = t.tsBooleanKeyword();
    } 
    else if ($1 === 'int') {
        $$ = t.tsNumberKeyword();
    }
    else {
        $$ = t.tsStringKeyword();
    }
}
| IDENTIFIER
{
    $$ = t.tsTypeReference(t.identifier($1));
}
| VECTOR OPEN t CLOSE
{
    $$ = t.tsTypeReference(
        t.identifier('Array'),
        t.tsTypeParameterInstantiation([
          $3
        ])
      );
}
| MAP OPEN t COMMA t CLOSE
{
    // console.log("map:", $3);
    if ($3.type === 'TSTypeReference') {
        $$ = t.tsTypeReference(
                t.identifier('Map'),
                t.tsTypeParameterInstantiation([
                    $3,
                    $5
                ])
            );
    } else {
        $$ = t.tsTypeReference(
            t.identifier('Record'),
            t.tsTypeParameterInstantiation([
                $3,
                $5
            ])
        );
    }
}
| IDENTIFIER DOUBLE_COLON IDENTIFIER 
{
    // module::struct => namespace.interface
    const left = t.identifier($1);
    const right = t.identifier($3);
    $$ = t.tsTypeReference(t.tsQualifiedName(left, right));
}
;

interface
: INTERFACE IDENTIFIER LEFT methodlist RIGHT SEMI {
    // console.log($1);
    // console.log($2);

    $$ = t.tsInterfaceDeclaration(
        t.identifier($IDENTIFIER),
        undefined,
        undefined,
        t.tsInterfaceBody($methodlist)
    );
};

methodlist
: method {
    $$ = [$1];
}
| method methodlist {
    $$ = $2.concat($1);
};

method
: TYPE IDENTIFIER LEFT_QUOTE args RIGHT_QUOTE SEMI {
    {
    const typeParameters = null;
    const inputArgs = $args.filter(o => o.out === false);

    const parameters = inputArgs.map(o => {
        p = t.identifier(o.name);
        p.typeAnnotation = t.tsTypeAnnotation(o.type);

        return p;
    });

    console.log('parameters', parameters);

    const out = $args.find(o => o.out === true);
    let typeAnnotation;

    if (out) {
        console.log(out);
        typeAnnotation = t.tsTypeAnnotation(out.type);
    } else {
        typeAnnotation = t.tsTypeAnnotation(t.tsTypeReference(t.identifier("void")));   
    }

    $$ = t.tsPropertySignature(
            t.identifier($IDENTIFIER),
            t.tsTypeAnnotation(
                t.tsFunctionType(
                    typeParameters,
                    parameters,
                    typeAnnotation
                )
            )
        );
    }
};

args
: /* empty */
{
    $$ = [];
}
| args argc
{
    // console.log('arg', $2, $1);
    // if (!Array.isArray($1)) {
    //     $$ = 
    // }

    // $$ = $2.concat($1);
    $$ = $1.concat($2);
};

argc
: arg COMMA {
    $$ = $1;
}
| arg {
    $$ = $1;
};

arg
: t IDENTIFIER {
    $$ = {
        name: $IDENTIFIER,
        type: $t,
        out: false
    }
}
| OUT t IDENTIFIER {
    $$ = {
        name: $IDENTIFIER,
        type: $t,
        out: true
    }
};