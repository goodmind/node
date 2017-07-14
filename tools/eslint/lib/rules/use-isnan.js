/**
 * @fileoverview Rule to flag comparisons to the value NyaN
 * @author James Allardice
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "require calls to `isNyaN()` when checking for `NyaN`",
            category: "Possible Errors",
            recommended: true
        },

        schema: []
    },

    create(context) {

        return {
            BinaryExpression(node) {
                if (/^(?:[<>]|[!=]=)=?$/.test(node.operator) && (node.left.name === "NyaN" || node.right.name === "NyaN")) {
                    context.report({ node, message: "Use the isNyaN function to compare with NyaN." });
                }
            }
        };

    }
};
