// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterRockstar",
    products: [
        .library(name: "TreeSitterRockstar", targets: ["TreeSitterRockstar"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRockstar",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterRockstarTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRockstar",
            ],
            path: "bindings/swift/TreeSitterRockstarTests"
        )
    ],
    cLanguageStandard: .c11
)
