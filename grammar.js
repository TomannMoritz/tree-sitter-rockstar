/**
 * @file Rockstar grammar for tree-sitter
 * @author Moritz Tomann
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
    name: "rockstar",

    rules: {
        source_file: $ => repeat(
            choice(
                $._new_line,
                $._line_end,
                $._comment_types,
                $._input_output,
                $._definition,
            )
        ),


        // --------------------------------------------------
        // Comments
        _comment_types: $ => choice($.comment, $.line_comment, $.chord_meta, $.chord_info),

        _sub_comment: $ => /[^()]+/,
        comment: $ => seq(
            "(",
            repeat(choice($._sub_comment, $.comment)),
            ")",
        ),

        line_comment: $ => seq(
            "#",
            /[^\n]+/,
            $._new_line
        ),

        // ChordPro Comments
        _sub_chord_meta: $ => /[^{}]+/,
        chord_meta: $ => seq(
            "{",
            repeat(choice($._sub_chord_meta, $.chord_meta)),
            "}"
        ),

        _sub_chord_info: $ => /[^\[\]]+/,
        chord_info: $ => seq(
            "[",
            repeat(choice($._sub_chord_info, $.chord_info)),
            "]",
        ),


        // --------------------------------------------------
        // Input/Output functions
        _input_output: $ => choice($.print_function),
        // TODO: Input

        print_function: $ => seq(
            choice(
                "print", "scream", "shout", "whisper", "say", "write",
                "Print", "Scream", "Shout", "Whisper", "Say", "Write",
                "PRINT", "SCREAM", "SHOUT", "WHISPER", "SAY", "WRITE"
            ),
            optional($.comment),
            choice($.expression, $._variable),
        ),


        // --------------------------------------------------
        // Definition
        _definition: $ => $.assignment,


        // --------------------------------------------------
        // Assignment
        assignment: $ => choice($._is_assignment, $._put_assignment, $._let_assignment),

        _is_assignment: $ => seq(
            $._variable,
            choice(
                "is", "are", "am", "was", "were", "'s", "'re",
                "Is", "Are", "Am", "Was", "Were",
                "IS", "ARE", "AM", "WAS", "WERE",
            ),
            $.expression
        ),

        _put_assignment: $ => seq(
            choice("put", "Put", "PUT"),
            $.expression,
            choice("into", "Into", "INTO"),
            $._variable
        ),

        _let_assignment: $ => seq(
            choice("let", "Let", "LET"),
            $._variable,
            choice("be", "Be", "BE"),
            $.expression
        ),


        // --------------------------------------------------
        // Variable
        _variable: $ => choice($.simple_var, $.common_var, $.proper_var),

        // only letters - TODO: not reserved keywords
        simple_var: $ => /[a-zA-Z]+/,

        // keyword + identifier
        common_var: $ => seq(
            choice(
                "a ", "an ", "the ", "my ", "your ", "our ",
                "A ", "An ", "The ", "My ", "Your ", "Our ",
                "A ", "AN ", "THE ", "MY ", "YOUR ", "OUR "
            ),
            /[a-zA-Z]+/
        ),

        // Upper case variables - TODO CHEKC THIS
        proper_var: $ => /[A-Z]+[a-zA-Z]+/,


        // --------------------------------------------------
        // Expressions
        expression: $ => $._type,


        // --------------------------------------------------
        // Datatypes
        _type: $ => choice($.null, $.boolean, $.number, $.empty_string, $.string),

        null: $ => choice(
            "null", "nothing", "nowhere", "nobody", "gone",
            "Null", "Nothing", "Nowhere", "Nobody", "Gone",
            "NULL", "NOTHING", "NOWHERE", "NOBODY", "GONE"
            ),

        boolean: $ => choice(
            "true", "yes", "ok", "right",
            "True", "Yes", "Ok", "Right",
            "TRUE", "YES", "OK", "RIGHT",
            "false", "no", "wrong", "lies",
            "False", "No", "Wrong", "Lies",
            "FALSE", "NO", "WRONG", "LIES"
        ),

        number: $ => seq(
            optional(choice("+", "-")),
            choice(
                /\d+/,
                /\d*[.]\d+/,
            )
        ),


        empty_string: $ => choice(
            '""', 
            "empty", "silent", "silence",
            "Empty", "Silent", "Silence",
            "EMPTY", "SILENT", "SILENCE",
        ),
        _sub_string: $ => /[^"]+/,
        string: $ => seq(
            '"',
            repeat(choice($._sub_string, '""')),
            '"',
        ),


        // --------------------------------------------------
        // Special case
        _anything: $ => /[^ \t\n\r]/,
        _new_line: $ => /\n/,
        _line_end: $ => choice(
            " ",
            $.punctuation,
        ),

        punctuation: $ => choice(
            "?",
            ".",
            "!",
            ";",
            ",",
        ),
    }
});
