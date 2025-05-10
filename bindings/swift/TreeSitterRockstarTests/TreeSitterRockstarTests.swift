import XCTest
import SwiftTreeSitter
import TreeSitterRockstar

final class TreeSitterRockstarTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rockstar())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Rockstar grammar")
    }
}
