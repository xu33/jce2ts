%{
    const t = require('@babel/types');
%}

%lex
%%

\s+ /* skip whitespace */
"//"(.*)                                    { /* DO NOTHING */ }
[/][*][^*]*[*]+([^*/][^*]*[*]+)*[/]       { /* DO NOTHING */ }
"#include" return "INCLUDE";
".jce" return "JCE"
<<EOF>> return 'EOF'
"\"" return "QUOTE";
"module" { return "MODULE";}
"struct" { return "STRUCT";}
"enum" { return "ENUM";}
"interface" { /* DO NOTHING */ }
"<" { return "OPEN"; }
">" { return "CLOSE"; }
"{" { return "LEFT"; }
"}" { return "RIGHT"; }
(require|optional) {return "REQUIRED"}
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
vector { return "VECTOR"; }
map { return "MAP"; }
[a-zA-Z_$][a-zA-Z_$0-9]* { return "IDENTIFIER";}
";" return "SEMI"
"," return "COMMA"
"::" return "DOUBLE_COLON"
"="\s*[^=;,//]+ { /* DO NOTHING */ }
\d+ { return "PROPERTY_INDEX";}
<<EOF>> return "EOF"

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
;

structlist 
: def {
    $$ = [$1];
}
| structlist def {
    // console.log('STRUCT:', $1, $2)
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
: IDENTIFIER COMMA
{
    $$ = t.tsEnumMember(t.identifier($1));
}
| IDENTIFIER
{
    $$ = t.tsEnumMember(t.identifier($1));
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
: PROPERTY_INDEX REQUIRED t IDENTIFIER SEMI 
{
    {
        const node = t.tsPropertySignature(
            t.identifier($IDENTIFIER),
            t.tsTypeAnnotation($t)
        );

        if ($REQUIRED === 'optional') {
            node.optional = true;
        }

        $$ = node;
    }
}
;

t
: TYPE
{
    // console.log('TYPE:', $1 + '_x');
    if ($1 === 'bool') {
        $$ = t.tsBooleanKeyword();
    } else {
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
    $$ = t.tsTypeReference(
        t.identifier('Record'),
        t.tsTypeParameterInstantiation([
            $3,
            $5
        ])
    );
}
| IDENTIFIER DOUBLE_COLON IDENTIFIER 
{
    // module::struct => namespace.interface
    const left = t.identifier($1);
    const right = t.identifier($3);
    $$ = t.tsTypeReference(t.tsQualifiedName(left, right));
}
;