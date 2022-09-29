%{
    // var module = {}
    // var temp = []
    
    // module.structs = {}

    // function addStruct(IDENTIFIER, props) {
    //     module.structs[IDENTIFIER] = props
    // }
%}

%lex
%%

\s+ /* skip whitespace */
"//"(.*)                                    { return "COMMENT_LINE" }
[/][*][^*]*[*]+([^*/][^*]*[*]+)*[/]       { return "COMMENT_BLOCK" }
<<EOF>> return 'EOF'
"module" { return "MODULE";}
"struct" { return "STRUCT";}
"enum" { return "ENUM";}
"interface" { /* DO NOTHING */ }
"<" { return "OPEN"; }
">" { return "CLOSE"; }
"{" { return "LEFT"; }
"}" { return "RIGHT"; }
(require|optional) {return "REQUIRED"}
(string|short|bool|int|float|long|double|signed\s+int|unsigned\s+int) { return "TYPE";}
vector { return "VECTOR"; }
map { return "MAP"; }
";" return "SEMI"
"," return "COMMA"
"::" return "DOUBLE_COLON"
"="\s*[^=;,//]+ { /* DO NOTHING */ }
\d+ { return "PROPERTY_INDEX";}
[a-zA-Z_$][a-zA-Z_$0-9]* { return "IDENTIFIER";}
<<EOF>> return "EOF"

/lex

%start expressions

%% /* language grammar */

expressions : e EOF
{
    // typeof console !== 'undefined' ? console.log($1) : print($1);
    //       return $e;
    // console.log(JSON.stringify($e));
    // console.log($e);
    return $e;
}
;

e : MODULE IDENTIFIER LEFT structlist RIGHT SEMI
    {
        // console.log('MODULE:', $IDENTIFIER)
        module.IDENTIFIER = $IDENTIFIER;

        $$ = {
            name: $IDENTIFIER,
            structList: $4
        }
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
COMMENT_LINE ENUM IDENTIFIER LEFT enumitems RIGHT SEMI {
    $$ = {
        type: 'ENUM',
        name: $3,
        members: $enumitems,
        comment: {
            type: 'LINE',
            value: $COMMENT_LINE.replace('//', "")
        }
    }
}
|ENUM IDENTIFIER LEFT enumitems RIGHT SEMI {
    $$ = {
        type: 'ENUM',
        name: $2,
        members: $enumitems,
        comment: null
    }
};

enumitems:
enumitem
{
    $$ = [$1];
}
|enumitems enumitem
{
    $$ = $1.concat($2);
}
;

enumitem: 
IDENTIFIER COMMA COMMENT_LINE
{
    console.log("enum0", $1)
    $$ = {
        name: $1,
        comment: {
            type: 'LINE',
            value: $COMMENT_LINE.replace('//', "")
        }
    }
}
|IDENTIFIER COMMA
{
    console.log("enum1", $1)

    $$ = {
        name: $1,
        comment: null
    }
}
|IDENTIFIER COMMENT_LINE
{
    console.log("enum2", $1)
    $$ = {
        name: $1,
        comment: {
            type: 'LINE',
            value: $COMMENT_LINE.replace('//', "")
        }
    }
}
;

struct: STRUCT IDENTIFIER itemlist 
{
    $$ = {
        name:$IDENTIFIER,
        type: "interface",
        members: $itemlist,
        comment: null
    }
}
| COMMENT_BLOCK struct {
    // $$ = {
    //     name:$IDENTIFIER,
    //     members: $itemlist,
    //     comment: {
    //         type:'BLOCK',
    //         value: $COMMENT_BLOCK.replace(/^\/\*/, '').replace(/\*\/$/, "")
    //     }
    // }
    
    // console.log("$1", $1)

    $$ = Object.assign({}, $2, {
        comment: {
            type:'BLOCK',
            value: $COMMENT_BLOCK.replace(/^\/\*/, '').replace(/\*\/$/, "")
        }
    })
}
| COMMENT_LINE struct {
    // $$ = {
    //     name:$IDENTIFIER,
    //     members: $itemlist,
    //     comment: {
    //         type:'LINE',
    //         value: $COMMENT_LINE.replace('//', "")
    //     }
    // }
    // console.log("$1", $1)

    $$ = Object.assign({}, $2, {
        comment: {
            type:'LINE',
            value: $COMMENT_LINE.replace('//', "")
        }
    })
};

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
{{
    $$ = {
        required: $REQUIRED,
        name: $IDENTIFIER,
        typeInfo: $t,
        comment: null
    }
}}
| PROPERTY_INDEX REQUIRED t IDENTIFIER SEMI cl
{{
    $$ = {
        required: $REQUIRED,
        name: $IDENTIFIER,
        typeInfo: $t,
        comment: {
            type: 'LINE',
            value: $cl.replace('//', "")
        }
    }
}}
;

cl
:COMMENT_LINE
{
    $$ = $1
}
| cl COMMENT_LINE {
    $$ = $1 + $2.replace('//', "")
};

t
: TYPE
{
    $$ = {
        type: $1,
        params:[],
        isPrimitive: true
    }
}
| IDENTIFIER
{
    $$ = {
        type: $1,
        params:[],
        isPrimitive: false
    }
}
| VECTOR OPEN t CLOSE
{
    $$ = {
        type: 'Array',
        params: [$3],
        isPrimitive: false
    }
}
| MAP OPEN t COMMA t CLOSE
{
    $$ = {
        type: 'Record',
        params: [$3, $5],
        isPrimitive: false
    }
}
| IDENTIFIER DOUBLE_COLON IDENTIFIER 
{
    // module::struct => namespace.interface
    $$ = {
        type:'QualifiedName',
        params:[{
            type: $1,
            params:[],
            isPrimitive: false
        }, {
            type: $3,
            params:[],
            isPrimitive: false
        }],
        isPrimitive: false
    }
}
;