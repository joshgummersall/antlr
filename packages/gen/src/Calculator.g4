grammar Calculator;

options {
    language=JavaScript;
}

@lexer::namespace{AntlrTest01}
@parser::namespace{AntlrTest01}

/*
 * Parser Rules
 */

addSubExpr
  : multDivExpr (( '+' | '-' ) multDivExpr)*;

multDivExpr
  : INT (( '*' | '/' ) INT)*;

/*
 * Lexer Rules
 */

INT : '0'..'9'+;
