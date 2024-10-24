const express = require('express');
const Rule = require('../models/rule');
const router = express.Router();

class Node {
    constructor(type, left = null, right = null, value = null) {
        this.type = type; // "operator" or "operand"
        this.left = left; // left child Node
        this.right = right; // right child Node (for operators)
        this.value = value; // Optional value for operand nodes
    }
}

function create_rule(ruleString) {
    // Basic parser implementation
    const operands = ruleString.split(/(AND|OR)/).map(op => op.trim()).filter(Boolean);
    let rootNode = null;

    operands.forEach((operand, index) => {
        if (index % 2 === 0) {
            const value = operand.match(/(.*?)([<>=]+)(.*)/);
            const node = new Node("operand", null, null, { field: value[1], operator: value[2], value: value[3] });
            if (!rootNode) {
                rootNode = node;
            } else {
                rootNode = new Node("operator", rootNode, node, "AND");
            }
        }
    });

    return rootNode;
}

function combine_rules(rules) {
    let combinedAST = null;
    rules.forEach(rule => {
        const ast = create_rule(rule);
        if (!combinedAST) {
            combinedAST = ast;
        } else {
            combinedAST = new Node("operator", combinedAST, ast, "AND");
        }
    });
    return combinedAST;
}

function evaluate_rule(ast, data) {
    if (ast.type === "operand") {
        const { field, operator, value } = ast.value;
        switch (operator) {
            case '>': return data[field] > value;
            case '<': return data[field] < value;
            case '=': return data[field] == value; // loose equality for simplicity
            default: return false;
        }
    } else if (ast.type === "operator") {
        const leftEval = evaluate_rule(ast.left, data);
        const rightEval = evaluate_rule(ast.right, data);
        return ast.value === "AND" ? leftEval && rightEval : leftEval || rightEval;
    }
}

router.post('/create_rule', async (req, res) => {
    const { ruleString } = req.body;
    if (!ruleString) {
        return res.status(400).json({ message: "ruleString is required." });
    }

    const ast = create_rule(ruleString);
    const newRule = new Rule({ ruleString });
    try {
        await newRule.save();
        res.status(201).json({ rule: newRule, ast });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/combine_rules', (req, res) => {
    const { rules } = req.body;
    const combinedAST = combine_rules(rules);
    res.json({ combinedAST });
});

router.post('/evaluate_rule', (req, res) => {
    console.log('Received body:', req.body);
    const { ast, data } = req.body;

    if (!ast || !data) {
        return res.status(400).json({ message: "AST and data are required." });
    }

    try {
        const result = evaluate_rule(ast, data);
        res.json({ result: result !== undefined ? result : false }); // Ensure result is defined
    } catch (error) {
        console.error("Evaluation error:", error);
        res.status(500).json({ message: "Error evaluating the rule." });
    }
});


module.exports = router;
