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
            $.expression,
        ),


        // --------------------------------------------------
        // Expressions
        expression: $ => $._type,


        // --------------------------------------------------
        // Datatypes
        _type: $ => choice($.null, $.boolean, $.number, $.string),

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
            repeat(choice($._sub_string, $.empty_string)),
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
